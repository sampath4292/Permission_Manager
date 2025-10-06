import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="font-bold">Permission Manager</div>
        <div className="space-x-4">
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
          {user && user.role === "student" && (
            <Link to="/student">Student</Link>
          )}
          {user &&
            ["advisor", "faculty", "hod", "warden", "security"].includes(
              user.role
            ) && <Link to="/approver">Approvals</Link>}
          {user && user.role === "admin" && <Link to="/admin">Admin</Link>}
          {user && (
            <button onClick={logout} className="ml-2 underline">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
