import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const UserDetail = ({ id }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://mern-stack-first.onrender.com/api/user/${id}`,
          { withCredentials: true },
        );
        setUser(res.data.user);
      } catch {
        setError("User not found");
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (error) return <small className="text-danger">{error}</small>;
  if (!user) return <small className="text-muted">Loading...</small>;

  return (
    <div className="mt-2">
      <div className="d-flex align-items-center mb-1">
        <BiSolidUserCircle style={{ marginRight: "6px" }} />
        <small>{user.name}</small>
      </div>

      <div className="d-flex align-items-center">
        <MdEmail style={{ marginRight: "6px" }} />
        <small className="text-muted">{user.email}</small>
      </div>
    </div>
  );
};

export default UserDetail;
