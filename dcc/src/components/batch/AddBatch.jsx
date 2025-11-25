import { useRef, useState } from "react";
import axios from "axios";
import "./batch.css";
import { Circles } from "react-loading-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBatch = () => {
  const [batchName, setBatchName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [startingDate, setStartingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fileRef = useRef (null);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("batchName", batchName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("startingDate", startingDate);
    formData.append("endDate", endDate);
    formData.append("thumbnail", thumbnail);

    try {
      await axios.post("http://localhost:4000/batch/add-batches", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      toast.success("Congrats ! New Batch added successfully...");
      navigate('/dashboard/batches')
      // reset after batch adding

      // setBatchName("");
      // setDescription("");
      // setPrice("");
      // setStartingDate("");
      // setEndDate("");
      // setThumbnail(null);
      // setThumbnailUrl("");

      // if (fileRef.current) fileRef.current.value = "";



    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong...");
    }
  };

  const fileHandler = (e) => {
    setThumbnail(e.target.files[0]);
    setThumbnailUrl(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="batch-form">
        <h1>Add New Batch</h1>
        <input
          required
          value={batchName}
          onChange={(e) => {
            setBatchName(e.target.value);
          }}
          type="text"
          placeholder="Batch Name..."
        />
        <input
          required
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="number"
          placeholder="Price"
        />
        <input
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          type="text"
          placeholder="Description"
        />
        <input
          type="text"
          placeholder="DD-MM-YYYY"
          onChange={(e) => {
            let v = e.target.value.replace(/[^\d]/g, "");
            if (v.length > 2) v = v.slice(0, 2) + "-" + v.slice(2);
            if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 9);
            setStartingDate(v);
          }}
          value={startingDate}
        />

        <input
          type="text"
          placeholder="DD-MM-YYYY"
          onChange={(e) => {
            let v = e.target.value.replace(/[^\d]/g, "");
            if (v.length > 2) v = v.slice(0, 2) + "-" + v.slice(2);
            if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 9);
            setEndDate(v);
          }}
          value={endDate}
        />

        <input ref={fileRef} required onChange={fileHandler} type="file" />
        {thumbnailUrl && (
          <img className="thumbnail" src={thumbnailUrl} alt="thumbnail" />
        )}

        <button className="btn" type="submit">
          {loading && <Circles className="loading" />} submit
        </button>
      </form>
    </div>
  );
};

export default AddBatch;
