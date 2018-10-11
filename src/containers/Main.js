import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import LogDetail from "../components/LogDetail";
import MovementForm from "../components/MovementForm";
import UserInfo from "../components/UserInfo";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import LogForm from "../containers/LogForm";

const Main = props => {
  const { authUser, errors, removeError, currentUser, foundLog } = props;
  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/users/:userid"
          render={props => {
            return <UserInfo currentUser={currentUser} {...props} />;
          }}
        />
        <Route
          exact
          path="/"
          render={props => <Homepage currentUser={currentUser} {...props} />}
        />
        <Route
          exact
          path="/signin"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText="Log in"
                heading="Welcome Back."
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/signup"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText="Sign me up"
                heading="Join the Log."
                {...props}
              />
            );
          }}
        />

        <Route path="/users/:id/logs/new" component={withAuth(LogForm)} />
        <Route
          path="/users/:id/logs/:foundLogId/movements/new"
          render={props => {
            return (
              <MovementForm currentUser={currentUser} foundLog={foundLog} />
            );
          }}
        />
        <Route
          path="/users/:id/logs/:logid"
          render={props => {
            return <LogDetail {...props} />;
          }}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUser: state.currentUser,
    foundLog: state.foundLog
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { authUser, removeError }
  )(Main)
);
