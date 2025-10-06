import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateRole = async (id, role) => {
    try {
      await axios.put(`${API}/users/${id}/role`, { role });
      load();
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Admin</h2>
      <div className="space-y-2">
        {users.map((u) => (
          <div
            key={u._id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <div>
              <div className="font-bold">
                {u.name} ({u.email})
              </div>
              <div>
                Role: {u.role} Dept: {u.department}
              </div>
            </div>
            <div>
              <select
                defaultValue={u.role}
                onChange={(e) => updateRole(u._id, e.target.value)}
              >
                <option value="student">student</option>
                <option value="advisor">advisor</option>
                <option value="faculty">faculty</option>
                <option value="hod">hod</option>
                <option value="warden">warden</option>
                <option value="security">security</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
