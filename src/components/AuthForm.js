import React, { Component } from "react";

export class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: "",
      frontSquat: 0,
      benchPress: 0,
      deadLift: 0,
      overheadPress: 0
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(() => {
        return;
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const {
      heading,
      buttonText,
      signUp,
      errors,
      history,
      removeError
    } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row.justift-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">Email:</label>
              <input
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                type="text"
              />
              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                value={password}
                type="password"
              />
              {signUp && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                    type="text"
                  />
                  <label htmlFor="image-url">Image URL:</label>
                  <input
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    onChange={this.handleChange}
                    value={profileImageUrl}
                    type="text"
                  />
                  <label htmlFor="front-squat">Front Squat 1RM:</label>
                  <input
                    className="form-control"
                    id="front-squat"
                    name="frontSquat"
                    onChange={this.handleChange}
                    value={this.state.frontSquat}
                    type="number"
                  />
                  <label htmlFor="bench-press">Bench Press 1RM:</label>
                  <input
                    className="form-control"
                    id="bench-press"
                    name="benchPress"
                    onChange={this.handleChange}
                    value={this.state.benchPress}
                    type="number"
                  />
                  <label htmlFor="deadlift">DeadLift 1RM:</label>
                  <input
                    className="form-control"
                    id="deadlift"
                    name="deadLift"
                    onChange={this.handleChange}
                    value={this.state.deadLift}
                    type="number"
                  />
                  <label htmlFor="overhead-press">Overhead Press 1RM:</label>
                  <input
                    className="form-control"
                    id="overhead-press"
                    name="overheadPress"
                    onChange={this.handleChange}
                    value={this.state.overheadPress}
                    type="number"
                  />
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;
