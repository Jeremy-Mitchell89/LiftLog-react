import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewMovement } from "../store/actions/movements";
import { Link } from "react-router-dom";

class MovementForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: " ",
      weights: [""],
      reps: [""]
    };
    this.handleChangeWeight = this.handleChangeWeight.bind(this);
    this.handleChangeReps = this.handleChangeReps.bind(this);
    this.handleNewMovement = this.handleNewMovement.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.postNewMovement(
      this.state.title,
      this.state.weights,
      this.state.reps
    );
    this.setState({
      title: "",
      weights: [],
      reps: []
    });
    // this.props.history.push(
    //   `/users/${this.props.currentUser.user.id}/logs/${this.props.foundLog._id}`
    // );
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChangeWeight(e) {
    const index = Number(e.target.name.split("-")[1]);
    const weight = this.state.weights.map(
      (weight, i) => (i === index ? e.target.value : weight)
    );
    this.setState({ weights: weight });
  }
  handleChangeReps(e) {
    const index = Number(e.target.name.split("-")[1]);
    const reps = this.state.reps.map(
      (reps, i) => (i === index ? e.target.value : reps)
    );
    this.setState({ reps });
  }
  handleNewMovement(e) {
    const { weights, reps } = this.state;
    this.setState({
      weights: [...weights, "test "],
      reps: [...reps, "test "]
    });
  }
  render() {
    let weight = this.state.weights.map((weight, i) => (
      <div
        className="fade-in"
        key={`set ${i}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Set {i + 1} Weight</label>
        <input
          className="movementFormInput"
          placeholder="Weight in lbs"
          type="number"
          id="weight"
          name={`weight-${i}`}
          onChange={this.handleChangeWeight}
          value={weight}
        />
      </div>
    ));
    let reps = this.state.reps.map((reps, i) => (
      <div
        className="fade-in"
        key={`set ${i}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Set {i + 1} Reps</label>
        <input
          className="movementFormInput"
          placeholder="Reps completed"
          type="number"
          id="reps"
          name={`reps-${i}`}
          onChange={this.handleChangeReps}
          value={reps}
        />
      </div>
    ));
    return (
      <div>
        <form
          className="fade-in"
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={this.handleSubmit}
        >
          <label>Name of Movement</label>
          <input
            className="movementFormInput"
            type="text"
            id="title"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {weight}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {reps}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-end"
              }}
            >
              <button
                onClick={this.handleNewMovement}
                className="btn btn-success"
                type="button"
              >
                +
              </button>
            </div>
          </div>
          <button className="movementform-submit" type="submit">
            Submit
          </button>
          <Link
            to={`/users/${this.props.currentUser.user.id}/logs/${
              this.props.foundLog._id
            }`}
          >
            Back to Log
          </Link>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    errors: state.errors,
    foundLog: state.foundLog,
    currentUser: state.currentUser
  };
}
export default connect(
  mapStateToProps,
  { postNewMovement }
)(MovementForm);
