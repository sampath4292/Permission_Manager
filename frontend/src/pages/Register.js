import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name,
        email,
        password,
        department,
        role: "student",
      });
      navigate("/student");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Register</h2>
      <div className="mb-2">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>
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
      <div className="mb-2">
        <label>Department</label>
        <input
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full"
        />
      </div>
      <button className="bg-green-600 text-white px-4 py-2">Register</button>
    </form>
  );
}
