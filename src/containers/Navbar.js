import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../images/Dumbbell.png";
import { logout } from "../store/actions/auth";

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Home" />
            </Link>
          </div>
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link
                  to={`/users/${
                    this.props.currentUser.user.id
                      ? this.props.currentUser.user.id
                      : this.props.currentUser.user._id
                  }`}
                >
                  User
                </Link>
              </li>
              <li>
                <Link to={`/users/${this.props.currentUser.user.id}/logs/new`}>
                  Create New Log
                </Link>
              </li>
              <li>
                <a id="logout" onClick={this.logout}>
                  Log Out
                </a>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link id="navlink" to="/signup">
                  Sign up
                </Link>
              </li>
              <li>
                <Link id="navlink" to="/signin">
                  Log in
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

function MapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(
  MapStateToProps,
  { logout }
)(Navbar);
