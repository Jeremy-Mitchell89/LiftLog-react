import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserStats, updateUser } from "../store/actions/auth";
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontSquat: this.props.currentUser.user.frontSquat || 0,
      deadLift: this.props.currentUser.user.deadLift || 0,
      benchPress: this.props.currentUser.user.benchPress || 0,
      overheadPress: this.props.currentUser.user.overheadPress || 0
    };
  }
  componentWillMount() {
    let test = JSON.parse(localStorage.getItem("userInfo"));
  }

  componentDidMount() {
    this.props
      .getUserStats(
        this.props.currentUser.user.id
          ? this.props.currentUser.user.id
          : this.props.currentUser.user._id
      )
      .then(() => {
        const test = JSON.parse(localStorage.getItem("userInfo"));
        console.log(test);

        this.setState({
          frontSquat: test.frontSquat,
          deadLift: test.deadLift,
          benchPress: test.benchPress,
          overheadPress: test.overheadPress
        });
      });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.updateUser(
      this.props.currentUser.user.id
        ? this.props.currentUser.user.id
        : this.props.currentUser.user._id,
      {
        frontSquat: this.state.frontSquat,
        deadLift: this.state.deadLift,
        benchPress: this.state.benchPress,
        overheadPress: this.state.overheadPress
      }
    );
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        frontSquat: this.state.frontSquat,
        deadLift: this.state.deadLift,
        benchPress: this.state.benchPress,
        overheadPress: this.state.overheadPress
      })
    );
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.props.currentUser.user.username}</h1>
          <label>Front Squat 1RM</label>
          <input
            className="form-control"
            name="frontSquat"
            value={this.state.frontSquat}
            onChange={this.handleChange}
            type="text"
          />
          <label>Bench Press 1RM</label>
          <input
            className="form-control"
            name="benchPress"
            value={this.state.benchPress}
            onChange={this.handleChange}
          />
          <label>DeadLift 1RM</label>
          <input
            className="form-control"
            name="deadLift"
            value={this.state.deadLift}
            onChange={this.handleChange}
          />
          <label>Overhead Press 1RM</label>
          <input
            className="form-control"
            name="overheadPress"
            value={this.state.overheadPress}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

//export default UserInfo;

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}
export default connect(
  mapStateToProps,
  { getUserStats, updateUser }
)(UserInfo);
