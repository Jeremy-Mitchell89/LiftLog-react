import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewMovement } from "../store/actions/movements";
import NameOfMovement from "./SearchBox";
import movementList from "../images/MovementList";
import routines from "../../src/images/routines";
import movements from "../../src/images/routines";

class MovementForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: " ",
      weights: [""],
      reps: [""],
      routine: "pervertor",
      week: ""
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
      weights: [""],
      reps: [""]
    });
    setTimeout(
      function() {
        this.props.updateLog(
          this.props.currentUser.user.id,
          this.props.foundLog._id
        );
      }.bind(this),
      300
    );
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
  selectorChange(e) {
    this.setState({ routine: e.target.value });
  }
  handleNewMovement(e) {
    const { weights, reps } = this.state;
    this.setState({
      weights: [...weights, weights[weights.length - 1]],
      reps: [...reps, reps[reps.length - 1]]
    });
    console.log(JSON.parse(localStorage.userInfo));
    console.log(
      Object.keys(routines).map(routine => (
        <option value={routine}>{routine}</option>
      ))
    );
  }
  render() {
    let options = Object.keys(routines).map(routine => (
      <option value={routine}>{routine}</option>
    ));
    let weekOptions = Object.keys(routines[this.state.routine]).map(week => (
      <option value={week}>{week}</option>
    ));
    let weight = this.state.weights.map((weight, i) => (
      <div
        className="fade-in-set"
        key={`set ${i}`}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <label className="movementform-label">Set {i + 1}</label>
        <input
          className="movementFormInput"
          placeholder="Weight in lbs"
          type="number"
          id="weight"
          name={`weight-${i}`}
          onChange={this.handleChangeWeight}
          value={weight}
        />
        <input
          className="movementFormInput"
          placeholder="Reps completed"
          type="number"
          id="reps"
          name={`reps-${i}`}
          onChange={this.handleChangeReps}
          value={this.state.reps[i]}
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Name of Movement</label>
            <NameOfMovement
              items={movementList}
              onChange={selectedItem => this.setState({ title: selectedItem })}
            />
          </div>
          <div>
            <select>
              <option value="benchPress">Bench Press</option>
              <option value="deadLift">Deadlift</option>
              <option value="frontSquat">Front Squat</option>
              <option value="overheadPress">Overhead Press</option>
            </select>
            <select
              value={this.state.routine}
              onChange={this.selectorChange.bind(this)}
              id="routineSelector"
            >
              {options}
            </select>
            <select>{weekOptions}</select>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              {weight}
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
