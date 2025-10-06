import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestList from "../components/RequestList";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function ApproverDashboard() {
  const [requests, setRequests] = useState([]);

  const load = async () => {
    try {
      const res = await axios.get(`${API}/requests/pending`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Approvals</h2>
      <RequestList requests={requests} refresh={load} />
    </div>
  );
}
