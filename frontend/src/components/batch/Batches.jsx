import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Batches = () => {
  const [batchList, setBatchList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBatches();
  }, []);

  const getBatches = async (e) => {
    await axios
      .get(`${import.meta.env.VITE_REACT_BACKEND_URL}/batch/batch-details`, {
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

  return (
    <div className="get-batch-container">
      {batchList && batchList.length > 0 ? (
        batchList.map((batch) => (
          <div
            onClick={() => {
              navigate(`/dashboard/batch-details/${batch._id}`);
            }}
            className="batch-box"
            key={batch._id}
          >
            <img
              className="batch-thumbnail"
              src={batch.thumbnailUrl}
              alt="thumbnail"
            />
            <h2 className="batch-title">{batch.batchName}</h2>
            <p className="batch-price">&#8377; {batch.price}</p>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
          No batches found
        </p>
      )}
    </div>
  );
};

export default Batches;
