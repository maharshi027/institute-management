import React, { useEffect, useState } from "react";
import "./fee.css";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentHistory = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    getPaymentList();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, fromDate, toDate, paymentList]);

  const getPaymentList = async () => {
    try {
      const res = await axios.get(`https://institute-management-backend-oxl8.onrender.com/fee/paymentHistory/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setPaymentList((res.data?.paymentHistory || []).reverse());
      setFilteredList(res.data?.paymentHistory || []);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  const applyFilters = () => {
    let data = [...paymentList];

    // Search filter
    if (search.trim() !== "") {
      data = data.filter((p) =>
        p.studentName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Date filter
    if (fromDate) {
      data = data.filter((p) => new Date(p.date) >= new Date(fromDate));
    }
    if (toDate) {
      data = data.filter((p) => new Date(p.date) <= new Date(toDate));
    }

    setFilteredList(data);
    setPage(1); // reset page after filter
  };

  const resetFilters = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setFilteredList(paymentList);
  };

  const indexLast = page * rowsPerPage;
  const indexFirst = indexLast - rowsPerPage;
  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  return (
    <div className="payment-container">
      <h2 className="title">Payment History</h2>

      {/* ================= Filters Section ================ */}
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />

        <input
          type="date"
          className="filter-input"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="filter-input"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button className="reset-btn" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* ================= Table Section ================= */}
      <div className="table-wrapper">
        <table className="payment-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Note</th>
            </tr>
          </thead>

          <tbody>
            {paymentList.length > 0 ? (
              paymentList.map((p, index) => (
                <tr key={p._id || index}>
                  <td>{indexFirst + index + 1}</td>
                  <td>{p.paidBy}</td>
                  <td>₹ {p.amount}</td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td>{p.remarks || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No payment records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Pagination ================= */}
      <div className="pagination">
        <button
          className="page-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="page-info">
          Page {page} of {totalPages}
        </span>

        <button
          className="page-btn"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
