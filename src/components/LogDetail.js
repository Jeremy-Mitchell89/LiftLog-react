import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOneLog } from "../store/actions/logs";
import { removeMovement } from "../store/actions/movements";
import { Link } from "react-router-dom";
import Movement from "./movement.js";
import MovementForm from "./MovementForm";

class LogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { showform: false };
  }
  componentDidMount() {
    this.props.fetchOneLog(
      this.props.currentUser.user.id,
      // this.props.match.params.id,
      this.props.match.params.logid
    );
  }
  componentDidUpdate(prevProps) {
    this.props.foundLog !== prevProps.foundLog
      ? this.props.fetchOneLog(
          this.props.currentUser.user.id,
          // this.props.match.params.id,
          this.props.match.params.logid
        )
      : null;
  }
  render() {
    const { movements } = this.props;
    let moves = movements
      ? movements.map((move, i) => (
          <div className="movement" key={i}>
            <h2>{move.title}</h2>
            <Movement
              key={move._id}
              title={move.title}
              weight={move.weight}
              reps={move.reps}
            />
          </div>
        ))
      : null;
    return (
      <div>
        <a
          className="MovementFormShow"
          onClick={() => this.setState({ showForm: !this.state.showForm })}
        >
          {this.state.showForm ? "Hide Movement Form" : "Add Movement"}
        </a>
        {this.state.showForm ? <MovementForm /> : null}

        <label>Date of Workout</label>
        <p>{this.props.foundLog.date}</p>
        <label>Title of Workout</label>
        <p>{this.props.foundLog.title}</p>
        <label>Notes</label>
        <p>{this.props.foundLog.notes}</p>
        <div className="movementContainer">{moves}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    foundLog: state.foundLog,
    errors: state.errors,
    currentUser: state.currentUser,
    movements: state.foundLog.movements
  };
}

export default connect(
  mapStateToProps,
  { fetchOneLog, removeMovement }
)(LogDetail);
