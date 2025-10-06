import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      // redirect based on role
      const role = res.user.role;
      if (role === "student") navigate("/student");
      else if (
        ["advisor", "faculty", "hod", "warden", "security"].includes(role)
      )
        navigate("/approver");
      else if (role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Login</h2>
      <div className="mb-2">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-2">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
  );
}
