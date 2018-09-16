import React from "react";
import LogList from "../containers/logList";
import UserAside from "./UserAside";

const LogTimeLine = props => {
  return (
    <div className="row">
      <UserAside
        profileImageUrl={props.profileImageUrl}
        username={props.username}
      />
      <LogList />
    </div>
  );
};

export default LogTimeLine;
