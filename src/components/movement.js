import React, { Component } from "react";

class Movement extends Component {
  render() {
    let move = this.props.weight.map((weight, i) => (
      <div key={i}>
        <p>
          {weight} x {this.props.reps[i]}
        </p>
      </div>
    ));
    return (
      <div>
        {move}
        {this.props.isCorrectUser && (
          <button
            className="movement-delete"
            onClick={() =>
              this.props.removeMovement(
                this.props.currentUser,
                this.props.logid,
                this.props.moveid
              )
            }
          >
            Delete
          </button>
        )}
      </div>
    );
  }
}

export default Movement;
