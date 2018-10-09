import React from "react";
import { Link } from "react-router-dom";
import LogTimeLine from "./LogTimeline";

const Homepage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1>What's Happening?</h1>
        <h4>New to Log?</h4>
        <Link to="/signup" className="btn btn-primary">
          Sign up Here!
        </Link>
      </div>
    );
  }
  return (
    <div>
      <LogTimeLine
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
      />
    </div>
  );
};

export default Homepage;
