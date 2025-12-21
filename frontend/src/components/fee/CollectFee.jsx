import React, { useEffect, useState } from "react";
import "./fee.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { TailSpin } from "react-loading-icons";

const CollectFee = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [batchId, setBatchId] = useState("");
  const [batchList, setBatchList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getBatches();
  }, []);

  const getBatches = async () => {
    try {
      const res = await axios.get("http://localhost:4000/batch/batch-details", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBatchList(res.data.batches);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:4000/fee/collect-fee",
        {
          paidBy: fullName,
          phone,
          batchId,
          amount,
          remarks,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      toast.success("Fee collected successfully!");

      setFullName("");
      setPhone("");
      setBatchId("");
      setAmount("");
      setRemarks("");

      setLoading(false);
      navigate("/dashboard/payment-history");
    } catch (error) {
      toast.error("Something went wrong...");
      setLoading(false);
    }
  };

  return (
    <div className="fee-container">
      <h2 className="fee-heading">Collect Fee</h2>

      <form className="fee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Paid By <span className="red-star">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Full Name..."
          />
        </div>

        <div className="form-group">
          <label>
            Phone No.<span className="red-star">*</span>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            maxLength={10}
            pattern="\d{10}"
            required
            placeholder="Enter 10-digit phone"
          />
        </div>

        <div className="form-group">
          <label>
            Amount (₹) <span className="red-star">*</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label>
            Select Batch <span className="red-star">*</span>
          </label>
          <select
            className="batch-select"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            required
          >
            <option value="">-- Select Batch --</option>
            {batchList.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.batchName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Optional remarks"
          ></textarea>
        </div>

        <button type="submit" className="student-btn">
          {loading && <TailSpin className="loading" />} Submit
        </button>
      </form>
    </div>
  );
};

export default CollectFee;
