import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOneLog } from "../store/actions/logs";
import { removeMovement } from "../store/actions/movements";
import { Link } from "react-router-dom";
import Movement from "./movement.js";

class LogDetail extends Component {
  componentDidMount() {
    this.props.fetchOneLog(
      this.props.currentUser.user.id,
      // this.props.match.params.id,
      this.props.match.params.logid
    );
  }
  render() {
    const { currentUser, foundLog, movements } = this.props;
    let moves = movements
      ? movements.map((move, i) => (
          <div key={i}>
            <h2>{move.title}</h2>
            <Movement
              key={move._id}
              title={move.title}
              weight={move.weight}
              reps={move.reps}
            />
          </div>
        ))
      : "";
    //   ?  this.props.foundLog.movements.map(movement => (
    //     <div className="logDetail-container">
    //       <p>{movement.title}</p>
    //       <label>Sets</label>
    //       {movement.weight.map((weight, i) => (
    //         <p>
    //           {weight} x {movement.reps[i]}
    //         </p>
    //       ))}
    //       <button
    //         onClick={this.props.removeMovement.bind(
    //           this,
    //           currentUser.user.id,
    //           foundLog._id,
    //           movement._id
    //         )}
    //       >
    //         Delete Movement
    //       </button>
    //     </div>
    //   ))
    // : "";
    return (
      <div>
        <label>Date of Workout</label>
        <p>{this.props.foundLog.date}</p>
        <label>Title of Workout</label>
        <p>{this.props.foundLog.title}</p>
        <label>Notes</label>
        <p>{this.props.foundLog.notes}</p>

        {moves}
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
