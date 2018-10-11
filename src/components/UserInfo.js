import React, { Component } from "react";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   email: "",
    //   username: "",
    //   password: "",
    //   profileImageUrl: ""
    // };
  }
  render() {
    return (
      <div>
        <h1>{this.props.currentUser.user.username}</h1>
        <label>Front Squat 1RM</label>
        <h1>{this.props.currentUser.user.frontSquat}</h1>
        <label>Bench Press 1RM</label>
        <h1>{this.props.currentUser.user.benchPress}</h1>
        <label>DeadLift 1RM</label>
        <h1>{this.props.currentUser.user.deadLift}</h1>
        <label>Overhead Press 1RM</label>
        <h1>{this.props.currentUser.user.overheadPress}</h1>
      </div>
    );
  }
}

export default UserInfo;
