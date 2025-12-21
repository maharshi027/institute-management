import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./batch.css";
import { Circles } from "react-loading-icons";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddBatch() {
  const [batchName, setBatchName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const batch = location.state.batchData;
      setBatchName(batch.batchName);
      setDescription(batch.description);
      setPrice(batch.price);
      setStartingDate(batch.startingDate);
      setEndDate(batch.endDate);
      setThumbnailUrl(batch.thumbnailUrl);
    } else {
      setBatchName("");
      setDescription("");
      setPrice("");
      setStartingDate("");
      setEndDate("");
      setThumbnailUrl("");
      setThumbnail(null);
    }
  }, [location]);

  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handleThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
    setThumbnailUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("batchName", batchName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("startingDate", startingDate);
    formData.append("endDate", endDate);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    if (location.state) {
      try {
        await axios.put(
          `${import.meta.env.VITE_REACT_BACKEND_URL}/batch/${location.state.batchData._id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Batch updated successfully!");
        setLoading(false);
        navigate(`/dashboard/batch-details/${location.state.batchData._id}`);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong...");
      }
    } else {
      try {
        await axios.post("${import.meta.env.VITE_REACT_BACKEND_URL}/batch/add-batches", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("New Batch added successfully!");
        setLoading(false);
        navigate("/dashboard/batches");
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong...");
      }
    }
  };
  return (
    <div className="add-batch-container">
      <form onSubmit={submitHandler} className="batch-form">
        <h1>{location.state ? "Edit Batch" : "Add New Batch"}</h1>

        <label>Batch Name</label>
        <input
          type="text"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          required
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Starting Date (DD-MM-YYYY)</label>
        <input
          type="text"
          placeholder="DD-MM-YYYY"
          value={startingDate}
          onChange={(e) => {
            let v = e.target.value.replace(/[^\d]/g, "");
            if (v.length > 2) v = v.slice(0, 2) + "-" + v.slice(2);
            if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 9);
            setStartingDate(v);
          }}
          required
        />

        <label>End Date (DD-MM-YYYY)</label>
        <input
          type="text"
          placeholder="DD-MM-YYYY"
          value={endDate}
          onChange={(e) => {
            let v = e.target.value.replace(/[^\d]/g, "");
            if (v.length > 2) v = v.slice(0, 2) + "-" + v.slice(2);
            if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 9);
            setEndDate(v);
          }}
          required
        />

        <label>Upload Thumbnail</label>
        <input
          type="file"
          ref={fileRef}
          onChange={handleThumbnail}
          required={!location.state}
        />

        <button type="submit" className="batch-btn">
          {loading && <Circles className="loading" />}
          Submit
        </button>
      </form>
      {thumbnailUrl && (
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-preview" />
      )}
    </div>
  );
}
