import React from "react";
import defaultProfileImg from "../images/default-profile-image.png";

const UserAside = ({ profileImageUrl, username }) => (
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img
          src={profileImageUrl || defaultProfileImg}
          alt={username}
          className="img-thumbnail"
        />
      </div>
    </div>
  </aside>
);

export default UserAside;
