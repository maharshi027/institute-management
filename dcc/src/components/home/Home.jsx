import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [totalBatches, setTotalBatches] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [latestStudent, setLatestStudent] = useState([]);
  const [latestTransaction, setLatestTransaction] = useState([]);
  useEffect(() => {
    getHomeDetails();
  }, []);
  const getHomeDetails = async () => {
    axios
      .get(`http://localhost:4000/home`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setTotalBatches(res.data.totalBatch);
        setTotalStudents(res.data.totalStudent);
        setTotalFee(res.data.totalFee);
        setLatestStudent(res.data.latestStudent);
        setLatestTransaction(res.data.latestTransaction);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <div className="home-wrapper">
      <div className="home-box-wrapper">
        <div className="box box1">
          <h2>00{totalBatches}</h2>
          <p>Total Batches</p>
        </div>
        <div className="box box2">
          <h2>00{totalStudents}</h2>
          <p>Total Students</p>
        </div>
        <div className="box box3">
          <h2>₹ {totalFee}</h2>
          <p>Total Transaction</p>
        </div>
      </div>
      <div className="home-latest-wrapper">
        <div className="table-container latest-students">
          <h3>Latest Students</h3>
          {latestStudent && latestStudent.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {latestStudent.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                        src={student.avatarUrl}
                        alt="avatar"
                        className="all-photo"
                      />
                    </td>
                    <td>{student.studentName}</td>
                    <td>{student.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students found</p>
          )}
        </div>

        <div className="table-container latest-transactions">
          <h3>Latest Transactions</h3>
          {latestTransaction && latestTransaction.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {latestTransaction.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction.paidBy}</td>
                    <td>₹ {transaction.amount}</td>
                    <td>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
