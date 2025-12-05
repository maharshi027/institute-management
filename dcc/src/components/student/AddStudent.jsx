import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./student.css";
import { Circles } from "react-loading-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [batchId, setBatchId] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  

  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);
  

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarUrl(URL.createObjectURL(e.target.files[0]));
  };
   const navigate = useNavigate();

  // ========================= Get batches for the option list of batches =================================

  const [batchList, setBatchList] = useState([]);
  useEffect(() => {
    getBatches();
  }, []);

  const getBatches = async (e) => {
    await axios
      .get("http://localhost:4000/batch/batch-details", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBatchList(res.data.batches);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("studentName", studentName);
    formData.append("phone", phone);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("batchId", batchId);
    formData.append("avatar", avatar);
    formData.append("userId", localStorage.getItem("userId"));

    try {
      await axios.post("http://localhost:4000/student/add-student", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Student added successfully!");
      setLoading(false);
      setAddress("");
      setDob("");
      setPhone("");
      setStudentName("");
      setAvatar(null);
      setAvatarUrl("");
      fileRef.current.value = null;

    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="student-container">
      
      <form onSubmit={submitHandler} className="student-form">
        <h1>Add New Student</h1>

        <label>Student Name</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label>Date of Birth (DD-MM-YYYY)</label>
        <input
          type="text"
          value={dob}
          placeholder="DD-MM-YYYY"
          onChange={(e) => {
            let v = e.target.value.replace(/[^\d]/g, "");
            if (v.length > 2) v = v.slice(0, 2) + "-" + v.slice(2);
            if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 9);
            setDob(v);
          }}
          required
        />

        <label>Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>

        <label>Upload Avatar</label>
        <input type="file" ref={fileRef} onChange={handleAvatar} required />

        <label>Select Batch</label>
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

        <button type="submit" className="student-btn">
          {loading && <Circles className="loading" />}
          Submit
        </button>
      </form>

      {avatarUrl && (
        <img src={avatarUrl} alt="avatar" className="preview-img" />
      )}
    </div>
  );
}
