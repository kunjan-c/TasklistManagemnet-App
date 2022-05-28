import React from "react";
import { useState } from "react";
import BasicCard from "../Component/UI/Card/BasicCard";
import BasicButtons from "../Component/UI/Button/BasicButtons";
import BasicTextFields from "../Component/UI/InputTextField/BasicTextField";
import { useNavigate } from "react-router-dom";
import { authActtions } from "../store";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
export default function LogIn(props) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const submitHandler = () => {
    if (enteredEmail === "abc@abc.com" && enteredPassword === "abc123*") {
      dispatch(authActtions.login());
      navigate("/viewTasks");
    } else {
      alert("invalid credentialss");
    }
  };
  return (
    <Fragment>
      <BasicCard>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <BasicTextFields
          label="Email"
          size="normal"
          onChange={emailChangeHandler}
        ></BasicTextFields>
        <BasicTextFields
          label="Password"
          size="normal"
          onChange={passwordChangeHandler}
        ></BasicTextFields>
        <BasicButtons buttonName="Login" onClick={submitHandler}></BasicButtons>
      </BasicCard>
    </Fragment>
  );
}
