import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("token");
  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  const profilePicPath = user ? user?.profilePic : null;
  const profilePic = profilePicPath
    ? `http://localhost:4000/assets/profilePics/${profilePicPath}`
    : "https://via.placeholder.com/150";

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="d-flex justify-content-center align-items-center rounded bg-white">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src={profilePic}
            />
            <span className="font-weight-bold">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-black-50">{user?.email}</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">FirstName</label>
                <input
                  type="text"
                  className="form-control"
                  value={user?.firstName}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="labels">LastName</label>
                <input
                  type="text"
                  className="form-control"
                  value={user?.lastName}
                  readOnly
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={user?.email}
                  readOnly
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  value={user?.gender}
                  readOnly
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Hobbies</label>
                <input
                  type="text"
                  className="form-control"
                  value={user?.hobbies}
                  readOnly
                />
              </div>
            </div>
            {/* <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button">
                Edit Profile
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
