import React from "react";

const RegisterNewUser = ({ registration, onRegister }) => {
  let registerEmail, registerName, registerPassword;
  return (
    <div>
      Email:
      <input
        type="text"
        ref={node => {
          registerEmail = node;
        }}
      />
      <br />
      Name:
      <input
        type="text"
        ref={node => {
          registerName = node;
        }}
      />
      <br />
      Password:
      <input
        type="password"
        ref={node => {
          registerPassword = node;
        }}
      />
      <br />
      <button
        type="submit"
        onClick={() => {
          onRegister(
            new RegisterCredentials(
              registerEmail.value,
              registerName.value,
              registerPassword.value
            )
          );
        }}
      >
        Register
      </button>
    </div>
  );
};

class RegisterCredentials {
  constructor(email, name, password) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
}

export default RegisterNewUser;
