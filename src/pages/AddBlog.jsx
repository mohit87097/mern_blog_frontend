import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import context from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const auth = useContext(context);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState(""); // ✅ fixed naming

  useEffect(() => {
    if (!auth.id) return;

    const fetchBlog = async () => {
      const api = await axios.get(
        `https://mern-stack-first.onrender.com/api/blog/blog/${auth.id}`,
        { withCredentials: true },
      );

      setTitle(api.data.blog.title);
      setDescription(api.data.blog.description);
      setImageurl(api.data.blog.imageurl); // ✅ fixed
    };

    fetchBlog();
  }, [auth.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!auth.id) {
        const api = await axios.post(
          `https://mern-stack-first.onrender.com/api/blog/new`,
          { title, description, imageurl },
          { withCredentials: true },
        );

        toast.success(api.data.message);
      } else {
        const api = await axios.put(
          `https://mern-stack-first.onrender.com/api/blog/${auth.id}`,
          { title, description, imageurl },
          { withCredentials: true },
        );

        toast.success(api.data.message);
        auth.setId("");
      }

      auth.setIsAuthenticated(true);
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      auth.setIsAuthenticated(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="card shadow-sm p-4">
              <h4 className="text-center mb-3">
                {auth.id ? "Edit Blog" : "Add Blog"}
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    rows="3"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    value={imageurl} // ✅ fixed
                    onChange={(e) => setImageurl(e.target.value)} // ✅ fixed
                    type="text"
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-2">
                  {auth.id ? "Update Blog" : "Add Blog"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
