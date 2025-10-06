import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestForm from "../components/RequestForm";
import RequestList from "../components/RequestList";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function StudentDashboard() {
  const [requests, setRequests] = useState([]);

  const load = async () => {
    try {
      const res = await axios.get(`${API}/requests/me`);
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
      <h2 className="text-2xl mb-4">Student Dashboard</h2>
      <RequestForm onCreated={(r) => setRequests((s) => [r, ...s])} />
      <h3 className="mt-6">My Requests</h3>
      <RequestList requests={requests} refresh={load} />
    </div>
  );
}
