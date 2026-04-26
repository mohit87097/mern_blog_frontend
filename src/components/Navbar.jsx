import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import context from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { BiLogIn, BiLogOut, BiSolidUserCircle } from "react-icons/bi";

const Navbar = () => {
  const auth = useContext(context);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const res = await axios.get(
        "https://mern-stack-first.onrender.com/api/user/logout",
        { withCredentials: true },
      );

      toast.success(res.data.message);
      auth.setIsAuthenticated(false);

      setTimeout(() => navigate("/"), 1000);
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <ToastContainer />

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand fw-bold" to="/">
          MERN Blog
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="ms-auto d-flex align-items-center gap-2">
            {/* NOT LOGGED IN */}
            {!auth.isAuthenticated && (
              <>
                <Link to="/login" className="btn btn-sm btn-outline-primary">
                  Login
                </Link>

                <Link to="/register" className="btn btn-sm btn-outline-primary">
                  Register
                </Link>
              </>
            )}

            {/* LOGGED IN */}
            {auth.isAuthenticated && (
              <>
                <Link to="/addblog" className="btn btn-sm btn-primary">
                  Add Blog
                </Link>

                <Link to="/profile" className="btn btn-sm btn-outline-primary">
                  <BiSolidUserCircle size={18} />
                </Link>

                <button
                  onClick={logOut}
                  className="btn btn-sm btn-outline-danger"
                >
                  <BiLogOut size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
