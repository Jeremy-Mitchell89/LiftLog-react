import React, { Component } from "react";
import Moment from "react-moment";
import DefaultProfileImg from "../images/default-profile-image.png";
import { connect } from "react-redux";

class LogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "minified",
      expanded: false
    };
  }
  render() {
    let moves = this.props.moves.map((move, i) => (
      <ul key={i}>
        <li>{move.title}</li>
      </ul>
    ));

    return (
      <div className={this.state.class}>
        <li className="log-item">
          <img
            src={this.props.profileImageUrl || DefaultProfileImg}
            alt={this.props.username}
            height="100"
            width="100"
            className="timeline-image"
          />
          <div className="log-area">
            <p>{this.props.username}</p>
            <span className="text-muted">
              <Moment className="text-muted" format="Do MMM YYYY">
                {this.props.date}
              </Moment>
            </span>
            <p>{this.props.title}</p>
            {this.props.notes.length >= 100 ? (
              <p>{this.props.notes.substring(0, 99) + "..."}</p>
            ) : (
              <p>{this.props.notes}</p>
            )}
          </div>
          <div>{moves}</div>
          {this.props.isCorrectUser && (
            <div>
              <a className="btn btn-danger" onClick={this.props.removeLog}>
                Delete
              </a>
            </div>
          )}
        </li>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    logs: state.logs,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps)(LogItem);
