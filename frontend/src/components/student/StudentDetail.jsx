import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const StudentDetail = () => {
  const params = useParams();
  const [student, setStudent] = useState({});
  const [feePayment, setFeePayment] = useState([]);
  const [batch, setBatch] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getStudentDetails();
  }, []);

  const getStudentDetails = async () => {
    await axios
      .get(`http://localhost:4000/student/student-details/${params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBatch(res.data.batchDetails);
        setFeePayment(res.data.feeDetails);
        setStudent(res.data.studentDetails);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const deleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure want to delete this student?")) return;

    try {
      await axios.delete(`http://localhost:4000/student/${studentId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      toast.success("Student deleted successfully!");
      navigate(`/dashboard/batch-details/${batch._id}`);
    } catch (err) {
      toast.error("Error deleting student!");
      console.log(err);
    }
  };

  if (!student) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="student-main">
      <div className="student-card">
        <img src={student.avatarUrl} alt="student" className="student-img" />

        <div className="student-info">
          <h1>{student.studentName}</h1>
          <p>
            <strong>Phone:</strong> {student.phone}
          </p>
          <p>
            <strong>Date of Birth:</strong> {student.dob || "Not Provided"}
          </p>
          <p>
            <strong>Address:</strong> {student.address || "Not Provided"}
          </p>

          <h4>
            <strong>Batch Name:</strong> {batch?.batchName || "Not Provided"}
          </h4>
        </div>

        <div className="btn-container">
          <button
            className="edit-btn"
            onClick={() =>
              navigate(`/dashboard/update-student/${student._id}`, {
                state: { studentData: student },
              })
            }
          >
            <FaEdit /> Edit
          </button>

          <button
            className="del-btn"
            onClick={() => {
              deleteStudent(student._id);
            }}
          >
            <RiDeleteBin5Fill /> Delete
          </button>
        </div>
      </div>

      {feePayment.length > 0 ? (
        <div className="fee-table-section">
          <h2>Fee Details</h2>
          <table className="fee-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Paid By</th>
                <th>Paid Amount</th>
                <th>Payment Date</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {feePayment.map((fee, index) => (
                <tr key={fee._id}>
                  <td>{index + 1}</td>
                  <td>{fee.paidBy}</td>
                  <td>₹ {fee.amount}</td>
                  <td>{new Date(fee.createdAt).toLocaleDateString()}</td>
                  <td>{fee.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-fee">No fee records found.</p>
      )}
    </div>
  );
};

export default StudentDetail;
