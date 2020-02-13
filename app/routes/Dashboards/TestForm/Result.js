import React from "react";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import updateAction from "../../../store";

export const Result = props => {
  const { state } = useStateMachine(updateAction);

  return (
    <>
      <h2>Result:</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};

export default withRouter(Result);