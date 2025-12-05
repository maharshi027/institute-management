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

  return (
    <div className="get-batch-container">
      {batchList.map((batch) => (
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
      ))}
    </div>
  );
};

export default Batches;
