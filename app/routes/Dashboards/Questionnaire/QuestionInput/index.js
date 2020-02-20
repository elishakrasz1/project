import React, { useState } from "react";
import gql from 'graphql-tag'
import { useForm, Controller } from "react-hook-form";
import { useMutation } from '@apollo/react-hooks'
import { connect } from 'react-redux'
// import updateAction from './actions'
import _ from "lodash";

import {
  Container,
  Wizard,
  Card,
  Nav,
  NavItem,
  NavLink,
  CardFooter,
  CardBody,
  Button,
  Row,
  Col,
  Table,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "../../../../components";
import { func } from "prop-types";

const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: ProjectUpdateMutationInput!) {
  updateProject(id: "UHJvamVjdE91dHB1dFR5cGU6MQ==", input: $input) {
  # updateProject(id: 1, input: $input) {
    ok
    output {
      id
      dbId
      projectName
    }
  }
}
`

export const QuestionInput = props => {
  const { qu, name } = props;
  const { final } = props;
  const { control, handleSubmit } = useForm();
  const [updateProject, { data } ] = useMutation(UPDATE_PROJECT);
  // const onSubmit = inputData => console.log(inputData);
  // const onSubmit = (data) => props.updateAction(data)

  const onSubmit = (inputData) => {
    updateProject({ variables: { input: {cProjectId: value} }} )
  }

  const [value, setValue] = React.useState([]);
  

  function nextPreprocess() {
    props.saveState(props.index, { id: props.id, value });
    props.nextFn();
  }

  function previousPreprocess() {
    props.saveState(props.index, { id: props.id, value });
    props.prevFn();
  }

  // onChangeHandler = e => {
  //   const { name, value } = e.target;
  //   this[name] = value
  // }

  const submit = ({ name } ) => {
    // e.preventDefault()
    updateProject({
      variables: { input: {cProjectId: value} }
    })
  }
  
  function onValueChange(newValue) {
    if (value === newValue) {
      setValue(newValue);
      return;
    }
    setValue(newValue);
    console.log('new', newValue)
  }

  let input;
  return (
    <div>
      <CardBody
        style={{
          height: "20vh",
          marginLeft: "100px"
        }}
      >
        <h1>{qu}</h1>
      </CardBody>
      <CardBody
        style={{
          height: "20vh",
          marginLeft: "100px"
        }}
      >
        <Form onSubmit={handleSubmit(submit)}>
        {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
          <FormGroup>
            <Label style={{
                marginLeft: '18px'
            }}>Please Enter...</Label>
            <Col sm={3}>
            {/* <Controller as={<Input />} type="number" name={name} control={control} defaultValue="" /> */}

              <Input
                type="text"
                name={name}
                value={value}
                placeholder="Value"
                onChange={(e) => onValueChange(e.target.value)}
                // onChange={({ target}) => setNameValue(target.value)}
              />
              <input type="submit" />
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
      <CardFooter className="p-4 bt-0">
        <div className="d-flex">
          <Button onClick={previousPreprocess} color="primary" className="mr-3">
            <i className="fa fa-angle-left mr-2"></i>
            Previous
          </Button>
          <Button
            onClick={nextPreprocess}
            color="primary"
            className="ml-auto px-4"
          >
            {final ? "Finish" : "Next"}
            <i className="fa fa-angle-right ml-2"></i>
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

export default QuestionInput;

// connect(({ }) => ({  }), updateAction)(QuestionInput)
