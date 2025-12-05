import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BatchDetails = () => {
  const params = useParams();
  const [batchDetails, setBatchDetails] = useState(null);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getBatchDetails();
  }, []);

  const getBatchDetails = async () => {
    // API call to get batch details using params.id
    await axios
      .get(`http://localhost:4000/batch/batch-details/${params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBatchDetails(res.data.batch);

        setStudentList(res.data.studentList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <div className="batch-details-main">
      {batchDetails && (
        <div className="batch-details-wrapper">
          <img src={batchDetails.thumbnailUrl} alt="Batch thumbnail" />
          <div className="batch-details-content">
            <h1>{batchDetails.batchName}</h1>
            <p>Price: &#8377; {batchDetails.price}</p>
            <p>
              Starting Date:{" "}
              {new Date(batchDetails.startingDate).toLocaleDateString()}
            </p>
            <p>
              End Date: {new Date(batchDetails.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
{studentList.length > 0 && (
  <div className="student-table-section">
    <table className="student-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Photo</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Date-of-Birth</th>
        </tr>
      </thead>

      <tbody>
        {studentList.map((student, index) => (
          <tr key={student._id}>
            <td>{index + 1}</td>
            <td>
              <img src={student.avatarUrl} alt="avatar" className="st-photo" />
            </td>
            <td>{student.studentName}</td>
            <td>{student.phone}</td>
            <td>{student.dob || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
};

export default BatchDetails;
