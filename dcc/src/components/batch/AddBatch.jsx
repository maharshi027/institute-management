import { useState } from "react";
import axios from "axios"; 
import "./batch.css";
import { Circles } from "react-loading-icons";
import { toast } from "react-toastify";

const AddBatch = () => {
  const [batchName, setBatchName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [startingDate, setStartingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
           headers :{
              Authorization: 'Bearer '+ localStorage.getItem('token'),
              "Content-Type": "multipart/form-data"
           }
      });
      setLoading(false);
      toast.success("Congrats ! New Batch added successfully...");
      
      // reset after batch adding 

      setBatchName("")
      setDescription("")
      setPrice(0)
      setStartingDate("")
      setEndDate("")
      setThumbnail(null)

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
          onChange={(e) => {
            setBatchName(e.target.value);
          }}
          type="text"
          placeholder="Batch Name..."
        />
        <input
          required
          onChange={(e) => {
            setPrice(Number(e.target.value));
          }}
          type="number"
          placeholder="Price"
        />
        <input
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          type="description"
          placeholder="Description"
        />
        <input
          required
          onChange={(e) => {
            setStartingDate(e.target.value);
          }}
          type="text"
          placeholder="Starting Date (DD-MM-YYYY)"
        />
        <input
          required
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          type="text"
          placeholder="End Date (DD-MM-YYYY)"
        />
        <input required onChange={fileHandler} type="file" />
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
