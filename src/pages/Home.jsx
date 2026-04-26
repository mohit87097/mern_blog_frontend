import React, { useEffect, useState } from "react";
import UserDetail from "../components/UserDetail";
import axios from "axios";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          "https://mern-stack-first.onrender.com/api/blog/allblogs",
          { withCredentials: true },
        );

        setBlog(res.data.blogs);
      } catch (err) {
        console.log("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container my-4">
      <div className="row">
        {blog.length === 0 && (
          <h5 className="text-center">No blogs available</h5>
        )}

        {blog.map((data) => (
          <div key={data._id} className="col-lg-6 col-md-12 mb-4">
            <div className="card h-100">
              <img
                src={data.imageurl || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt="blog"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>

                <p className="card-text text-muted">
                  {data.description.substring(0, 100)}...
                </p>

                <small className="text-secondary">
                  {new Date(data.createdAt).toLocaleDateString()}
                </small>

                <div className="mt-2">
                  <UserDetail id={data.user} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
