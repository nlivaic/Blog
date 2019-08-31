import React from "react";

const Login = ({ loginEmail, loginPassword, onLogIn }) => {
  return (
    <div>
      Email:{" "}
      <input
        type="email"
        ref={node => {
          loginEmail = node;
        }}
      />
      <br />
      Password:{" "}
      <input
        type="password"
        ref={node => {
          loginPassword = node;
        }}
      />
      <br />
      <input
        type="button"
        value="Log In"
        onClick={() => {
          onLogIn(new LoginCredentials(loginEmail.value, loginPassword.value));
        }}
      />
    </div>
  );
};

class LoginCredentials {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

export default Login;
