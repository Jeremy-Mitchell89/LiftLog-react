import React, { Component } from "react";

class Movement extends Component {
  render() {
    let test = this.props.weight.map((weight, i) => (
      <div>
        <p key={i}>
          {weight} x {this.props.reps[i]}
        </p>
        <button
          onClick={() =>
            this.props.removeMovement(
              this.props.currentUser,
              this.props.logid,
              this.props.moveid
            )
          }
        />
      </div>
    ));
    return <div>{test}</div>;
  }
}

export default Movement;
