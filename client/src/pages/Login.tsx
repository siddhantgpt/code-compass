import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-1/2 hidden md:block">
          <img
            src="/intro.png"
            alt="Intro"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Welcome back to Code Compass{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h2>
          <p className="text-center text-gray-600">
            Continue your learning journey
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg w-full font-semibold"
            >
              Log In
            </button>
          </form>
          {error && <p className="text-center text-red-500">{error}</p>}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
