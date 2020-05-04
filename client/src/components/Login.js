import React, { useState } from "react";
import axios from "axios";

import styled from "styled-components";

const Body = styled.body`
background-color: black;
`;
const Div = styled.header`
  margin: auto;
  width: 66%;
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: #01FFFF;
  padding: 0.25em 1em;
`;
const Label = styled.div`
  text-align: center;
  height: 10%;
`;
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: #01FFFF;
  margin: auto;
  padding: 0.25em 1em;
`;


const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    username: "Lambda School",
    password: "i<3Lambd4"
  });

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/api/login", user)
      .then(res => {
        console.log("Successfully logged in:", res.data.payload);

        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(error => {
        console.log("Could not log in:", error);
      });
  };

  return (
    <Body>
      <Div>Welcome to the Bubble App!</Div>
      <div className="loginForm">
        <form name="login">
        <Div className="loginInputContainer">
        <Label htmlFor="username">Username</Label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </Div>
        <Div className="loginInputContainer">
          <Label htmlFor="password">Password</Label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Div>
        <Button onClick={handleSubmit}>Log in</Button>
      </form>
    </div>
    </Body>
  );
};

export default Login;
