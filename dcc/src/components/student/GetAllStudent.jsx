import axios from "axios";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

const GetAllStudent = () => {
  const [allStudentList, setAllStudents] = useState([]);

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
        console.log(res.data);
        
        setAllStudents(res.data.studentList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <div>
    { allStudentList.length > 0 &&
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
          {allStudentList.map((student, index) => (
            <tr key={student._id}>
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
  }
  </div> 
  );
};

export default GetAllStudent;
