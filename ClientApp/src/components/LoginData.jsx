import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAccountLogin,
  getAccountIsLoggingIn,
  getAccountIsLoggingOut
} from "../reducers";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducers/Account";
import Login from "./Login";

class LoginData extends Component {
  render() {
    const {
      accountLogin,
      isLoggingIn,
      login,
      isLoggingOut,
      logout
    } = this.props;
    if (isLoggingIn) return <div>Logging in...</div>;
    if (isLoggingOut) return <div>Logging out...</div>;
    if (accountLogin.isLoggedIn) {
      return (
        <div>
          Hi {accountLogin.name}.<button onClick={() => logout()} />
        </div>
      );
    }
    return <Login onLogIn={login} />;
  }
}

const mapStateToProps = state => {
  return {
    accountLogin: getAccountLogin(state),
    isLoggingIn: getAccountIsLoggingIn(state),
    isLoggingOut: getAccountIsLoggingOut(state)
  };
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(LoginData);
