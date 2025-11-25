import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Batches = () => {
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
        console.log(res.data.batches);
        setBatchList(res.data.batches);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="batch-container">
      {
        batchList.map((batch) => (
           <div className="batch-box" key={batch._id}>
            <img className="batch-thumbnail" src={batch.thumbnailUrl} alt="thumbnail" />
            <h2 className="batch-title">{batch.batchName}</h2>
            <p className="batch-price">&#8377; {batch.price}</p>
           </div>
        ))
      }
    </div>
  );
};

export default Batches;
