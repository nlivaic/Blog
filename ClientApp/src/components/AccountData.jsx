import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAccountLogin } from "../reducers";
import LoginData from "./LoginData";

class AccountData extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <LoginData />
        {!isLoggedIn && <Link to="/Register">Register</Link>}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    isLoggedIn: getAccountLogin(state).isLoggedIn
  };
};

export default connect(mapStateToProps)(AccountData);
