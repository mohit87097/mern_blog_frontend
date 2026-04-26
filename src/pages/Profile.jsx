import React, { useContext, useEffect, useState } from "react";
import context from "../context/AuthContext";
import axios from "axios";
import MyBlogs from "../components/MyBlog";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const auth = useContext(context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://mern-stack-first.onrender.com/api/user/my",
          { withCredentials: true },
        );

        auth.setUser(res.data.user);
        auth.setIsAuthenticated(true);
      } catch (err) {
        console.log("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12 text-center">
          <div className="card p-3 mb-4">
            <h4>
              <BiSolidUserCircle /> {auth.user?.name}
            </h4>
            <p className="text-muted">
              <MdEmail /> {auth.user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* USER BLOGS */}
      <MyBlogs />
    </div>
  );
};

export default Profile;
