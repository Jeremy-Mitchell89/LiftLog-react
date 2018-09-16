import React, { Component } from "react";

class Movement extends Component {
  render() {
    let test = this.props.weight.map((weight, i) => (
      <p key={i}>
        {weight} x {this.props.reps[i]}
      </p>
    ));
    return <div>{test}</div>;
  }
}

export default Movement;
