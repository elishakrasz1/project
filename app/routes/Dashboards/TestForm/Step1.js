import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../../store";

const Step1 = props => {
  const { register, handleSubmit } = useForm();
  const { action } = useStateMachine(updateAction);
  const onSubmit = data => {
    action(data);
    // props.history.push("./step2");
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1</h2>
      <label>
        First Name:
        <input name="firstName" ref={register} />
      </label>
      <label>
        Last Name:
        <input name="lastName" ref={register} />
      </label>
      <input type="submit" />
    </form>
  );
};

export default withRouter(Step1);