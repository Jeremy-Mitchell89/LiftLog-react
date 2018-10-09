import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLogs, removeLog } from "../store/actions/logs";
import LogItem from "../components/LogItem";
import { Link } from "react-router-dom";

class LogList extends Component {
  componentDidMount() {
    this.props.fetchLogs();
  }
  render() {
    const { logs, removeLog, currentUser } = this.props;
    let logList = logs.map((l, i) => (
      <div key={i}>
        <LogItem
          key={l._id}
          date={l.date}
          title={l.title}
          notes={l.notes}
          username={l.user.username}
          profileImageUrl={l.user.profileImageUrl}
          removeLog={removeLog.bind(this, l.user._id, l._id)}
          isCorrectUser={currentUser === l.user._id}
          moves={l.movements}
        />
        {currentUser === l.user._id ? (
          <Link to={`/users/${this.props.currentUser}/logs/${l._id}`}>
            View/Edit Log
          </Link>
        ) : (
          <Link to={`/users/${this.props.currentUser}/logs/${l._id}`}>
            View Log
          </Link>
        )}
      </div>
    ));
    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <div className="list-group" id="logs">
            {logList}
          </div>
        </div>
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

export default connect(
  mapStateToProps,
  { fetchLogs, removeLog }
)(LogList);
