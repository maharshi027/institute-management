import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const StudentDetail = () => {
    const params = useParams();
    const [student, setStudent] = useState({});
    const [feePayment, setFeePayment] = useState ([]);
    const navigate = useNavigate();
    useEffect(()=>{
        getStudentDetails();
    },[])


      const getStudentDetails = async () => {
    // API call to get student details using params.id
    await axios
      .get(`http://localhost:4000/student/student-details/${params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
       
        setFeePayment(res.data.feePayment);
        setStudent(res.data.studentDetails);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  const deleteStudent = async () => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:4000/delete-student/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Student deleted successfully!");
      navigate("/dashboard/all-student");
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
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Date of Birth:</strong> {student.dob || "Not Provided"}</p>
          <p><strong>Address:</strong> {student.address || "Not Provided"}</p>
          <p><strong>Batch ID:</strong> {student.batchId}</p>
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

          <button className="del-btn" onClick={deleteStudent}>
            <RiDeleteBin5Fill /> Delete
          </button>
        </div>

      </div>


      {feePayment ? (
        <div className="fee-table-section">
          <h2>Fee Details</h2>
          <table className="fee-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Paid Amount</th>
                <th>Remaining</th>
                <th>Paid Date</th>
              </tr>
            </thead>

            <tbody>
              {feePayment.map((fee, index) => (
                <tr key={fee._id}>
                  <td>{index + 1}</td>
                  <td>₹ {fee.paidAmount}</td>
                  <td>₹ {fee.remainingAmount}</td>
                  <td>{new Date(fee.paidDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-fee">No fee records found.</p>
      )}

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  )
}

export default StudentDetail
