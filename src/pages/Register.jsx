import React, { useContext, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import context from "../context/AuthContext";

const Register = () => {
  const auth = useContext(context);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://mern-stack-first.onrender.com/api/user/register",
        { name, email, password },
        { withCredentials: true },
      );

      toast.success(res.data.message);
      auth.setIsAuthenticated(true);

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
      auth.setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-12">
            <h4 className="text-center mb-3">Register</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
