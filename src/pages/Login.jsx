import React, { useContext, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import context from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://mern-stack-first.onrender.com/api/user/login",
        { email, password },
        { withCredentials: true },
      );

      toast.success(res.data.message);
      auth.setIsAuthenticated(true);

      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid email or password");
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
            <h4 className="text-center mb-3">Login</h4>

            <form onSubmit={handleSubmit}>
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
                {loading ? "Please wait..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
