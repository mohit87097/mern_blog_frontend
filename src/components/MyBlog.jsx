import React, { useContext, useEffect, useState } from "react";
import UserDetail from "../components/UserDetail";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import context from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [blog, setBlog] = useState([]);
  const auth = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          "https://mern-stack-first.onrender.com/api/blog/myblog",
          { withCredentials: true },
        );
        setBlog(res.data.blogs);
      } catch {
        toast.error("Error loading blogs");
      }
    };

    fetchBlog();
  }, []);

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `https://mern-stack-first.onrender.com/api/blog/${id}`,
        { withCredentials: true },
      );

      setBlog(blog.filter((b) => b._id !== id));
      toast.success(res.data.message);
    } catch {
      toast.error("Delete failed");
    }
  };

  const editBlog = (id) => {
    auth.setId(id);
    navigate("/addblog");
  };

  return (
    <>
      <ToastContainer />

      <div className="container my-4">
        <h3 className="mb-4">My Blogs</h3>

        {blog.length === 0 && <p>No blogs available</p>}

        {blog.map((data) => (
          <div key={data._id} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={data.imageurl || "https://via.placeholder.com/150"}
                  className="img-fluid rounded-start"
                  alt="blog"
                />
              </div>

              <div className="col-md-8">
                <div className="card-body">
                  <h5>{data.title}</h5>

                  <p className="text-muted">{data.description}</p>

                  <small>{new Date(data.createdAt).toLocaleDateString()}</small>

                  <div className="mt-2">
                    <UserDetail id={data.user} />
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => editBlog(data._id)}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBlog(data._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBlogs;
