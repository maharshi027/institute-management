import axios from "axios";
import { useEffect, useState } from "react";
import { BsCursor } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GetAllStudent = () => {
  const [studentList, setStudentList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    await axios
      .get(`http://localhost:4000/student/all-students/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setStudentList(res.data.studentList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "28px", margin:"5px" }}>All Students</h1>
      {studentList && studentList.length > 0 ? (
        <div className="all-students-container">
          <table className="all-students-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Date-of-Birth</th>
              </tr>
            </thead>

            <tbody>
              {studentList.map((student, index) => (
                <tr
                  className="student-row"
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
                      className="all-photo"
                    />
                  </td>
                  <td>{student.studentName}</td>
                  <td>{student.phone}</td>
                  <td>{student.dob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No students found
        </p>
      )}
    </div>
  );
};

export default GetAllStudent;
