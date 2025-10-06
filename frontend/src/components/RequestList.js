import React from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function RequestList({ requests, refresh }) {
  const { user } = useAuth();

  const act = async (id, action) => {
    try {
      await axios.post(`${API}/requests/${id}/${action}`, {
        comment: `${action} by ${user.name}`,
      });
      alert(`${action}d`);
      refresh && refresh();
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  if (!requests || requests.length === 0) return <div>No requests</div>;

  return (
    <div className="space-y-4">
      {requests.map((r) => (
        <div key={r._id} className="p-3 border rounded">
          <div className="font-bold">
            {r.type} - {r.status}
          </div>
          <div>Student: {r.studentId?.name || r.studentId}</div>
          <div>Details: {r.details}</div>
          <div>Current Approver: {r.currentApprover}</div>
          <div className="mt-2">
            {user &&
              (user.role === r.currentApprover || user.role === "admin") &&
              r.status === "pending" && (
                <>
                  <button
                    onClick={() => act(r._id, "approve")}
                    className="mr-2 bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => act(r._id, "reject")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}
