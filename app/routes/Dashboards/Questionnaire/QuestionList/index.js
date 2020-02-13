import React, { useState } from "react";
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
  UncontrolledDropdown,
  ButtonGroup
} from "../../../../components";

const QuestionList = props => {
  const { qu, name, listOptions } = props;
  const { final } = props;
  const [value, setValue] = React.useState("");
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);

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
    console.log('ivalue', newValue)

  }

  // const onCheckboxBtnClick = selected => {
  //   const index = cSelected.indexOf(selected);
  //   if (index < 0) {
  //     cSelected.push(selected);
  //   } else {
  //     cSelected.splice(index, 1);
  //   }
  //   setCSelected([...cSelected]);
  //   console.log('selected', index)
  //   console.log('i', index)
  // };
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
        <ButtonGroup
          style={{
            marginLeft: "5px"
          }}
        >
          {listOptions.map((value, index) => (
            <Button
              outline
              key={index}
              color="primary"
              name={name}
              value={value}
              // onClick={onCheckboxBtnClick}
              onClick={onValueChange}
              // onClick={() => setRSelected(i)}
              // active={rSelected === i}
              style={{ marginRight: "8px" }}
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
        {/* <Form>
          <FormGroup>
            <Label style={{
                marginLeft: '18px'
            }}>Please Enter...List</Label>
            <Col sm={3}>
              <Input
                type="number"
                name={name}
                placeholder="USD"
                onChange={onValueChange}
                value={value}
              />
            </Col>
          </FormGroup>
        </Form> */}
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

export default QuestionList;
