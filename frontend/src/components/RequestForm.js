import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function RequestForm({ onCreated }) {
  const [type, setType] = useState("gatepass");
  const [details, setDetails] = useState("");
  const { user } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/requests`, { type, details });
      setDetails("");
      onCreated && onCreated(res.data);
      alert("Request submitted");
    } catch (err) {
      console.error(err);
      alert("Failed to submit");
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={submit} className="p-4 border rounded">
      <div className="mb-2">
        <label className="block">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full"
        >
          <option value="gatepass">Gate Pass</option>
          <option value="attendance">Attendance</option>
          <option value="event">Event</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block">Details</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full"
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2">Submit</button>
    </form>
  );
}
