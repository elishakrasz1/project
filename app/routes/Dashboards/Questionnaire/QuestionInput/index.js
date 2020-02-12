import React from "react";
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

const QuestionInput = props => {
  const { qu } = props;
  const { final } = props;
  const [value, setValue] = React.useState("");

  function nextPreprocess() {
    props.saveState(props.index, { id: props.id, value });
    props.nextFn();
  }

  function previousPreprocess() {
    props.saveState(props.index, { id: props.id, value });
    props.prevFn();
  }

  function onValueChange(newValue) {
    if (value === newValue) {
      setValue(newValue);
      return;
    }
    setValue(newValue);
  }

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
        <Form>
          <FormGroup>
            <Label style={{
                marginLeft: '18px'
            }}>Please Enter...</Label>
            <Col sm={3}>
              <Input
                type="number"
                name=""
                placeholder="Value"
                onChange={onValueChange}
                value={value}
              />
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
            Next
            <i className="fa fa-angle-right ml-2"></i>
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

export default QuestionInput;
