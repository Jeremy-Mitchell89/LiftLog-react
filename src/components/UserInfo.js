import React, { Component } from "react";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    };
  }
  render() {
    return (
      <div>
        <h1>{this.props.currentUser.user.username}</h1>
      </div>
    );
  }
}

export default UserInfo;
