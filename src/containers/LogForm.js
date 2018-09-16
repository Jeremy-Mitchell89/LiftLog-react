import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewLog } from "../store/actions/logs";
import moment from "moment";

class LogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "test",
      notes: "test",
      date: moment().format("YYYY-MM-DD")
    };
  }
  handleNewLog = event => {
    event.preventDefault();
    this.props.postNewLog(this.state.title, this.state.notes, this.state.date);
    this.setState({
      title: "",
      notes: "",
      date: ""
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <form onSubmit={this.handleNewLog}>
        {this.props.errors.message && (
          <div className="alet alert-danger">{this.props.errors.message}</div>
        )}
        <label>Title Of Log</label>
        <input
          type="text"
          className="form-control"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <label>Notes</label>
        <input
          type="text"
          className="form-control"
          value={this.state.notes}
          onChange={e => this.setState({ notes: e.target.value })}
        />
        <label>Date of Workout</label>
        <input
          type="date"
          className="form-control"
          value={this.state.date}
          onChange={e => this.setState({ date: e.target.value })}
        />
        <button type="submit" className="btn btn-succes pull-right">
          Add my Log
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  { postNewLog }
)(LogForm);
