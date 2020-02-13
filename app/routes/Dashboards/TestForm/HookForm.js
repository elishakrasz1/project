import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { StateMachineProvider, createStore } from "little-state-machine";

import updateAction from '../../../store'

createStore({
    data: {}
  })
export default function HookForm(props) {
  const { register, handleSubmit, setValue } = useForm()
  // Submit your data into Redux store
  const onSubmit = (data) => props.updateAction(data)
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="firstName" defaultValue={props.firstName} ref={register} />
      <Input name="lastName" defaultValue={props.lastName} ref={register} />
      <input type="submit" />
    </form>
  );
}

// Connect your component with redux
connect(({ firstName, lastName }) => ({ firstName, lastName }), updateAction)(HookForm)