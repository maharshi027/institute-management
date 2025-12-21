import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const BatchDetails = () => {
  const params = useParams();
  const [batchDetails, setBatchDetails] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBatchDetails();
  }, []);

  const deleteBatch = async (batchId) => {
    if (!window.confirm("Are you sure want to delete this batch?")) return;

    try {
      await axios.delete(`https://institute-management-backend-oxl8.onrender.com/batch/${batchId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Batch deleted successfully!");
      navigate("/dashboard/batches");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete batch!");
    }
  };

  const getBatchDetails = async () => {
    // API call to get batch details using params.id
    await axios
      .get(`https://institute-management-backend-oxl8.onrender.com/batch/batch-details/${params.id}`, {
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
          <div className="btn-container">
            <button
              onClick={() => {
                navigate(`/dashboard/update-batch/${batchDetails._id}`, {
                  state: { batchData: batchDetails },
                });
              }}
              className="edit-btn"
            >
              <FaEdit />
              Edit
            </button>
            <button
              onClick={() => {
                deleteBatch(batchDetails._id);
              }}
              className="del-btn"
            >
              <RiDeleteBin5Fill />
              Delete
            </button>
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
                <tr
                  onClick={() => {
                    navigate(`/dashboard/student-details/${student._id}`);
                  }}
                  key={student._id}
                >
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={student.avatarUrl}
                      alt="avatar"
                      className="st-photo"
                    />
                  </td>
                  <td>{student.studentName}</td>
                  <td>{student.phone}</td>
                  <td>{student.dob || "DD/MM/YYYY"}</td>
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
