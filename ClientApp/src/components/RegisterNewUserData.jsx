import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccountRegistration, getAccountIsRegistering } from "../reducers";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducers/Account";
import RegisterNewUser from "./RegisterNewUser";

class RegisterNewUserData extends Component {
  render() {
    const { isRegistering, registration, register } = this.props;
    if (isRegistering) return <p>Registering...</p>;
    return (
      <div>
        <RegisterNewUser registration={registration} onRegister={register} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isRegistering: getAccountIsRegistering(state),
    registration: getAccountRegistration(state)
  };
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(RegisterNewUserData);
