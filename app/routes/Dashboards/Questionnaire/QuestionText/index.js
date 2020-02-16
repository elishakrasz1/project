import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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

const QuestionText = props => {
  const { qu, name } = props;
  const { final } = props;
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  const [value, setValue] = React.useState("");

  const [form, setState] = useState({
    id: '',
    cProjectId: '',
    projectName: '',
    signatureDate: '',
    serviceCommencement: '',
    contractDurationMonth: '',
    contractValueUsd: '',
    projectedMargin: '',
    componentOfBespoke: '',
    oftenProvideServices: '',
    isTransitionPlan: '',
    transitionPlanDate: '',
    isTransitionCharges: '',
    transitionCharges: '',
    isTransformationPlan: '',
    transformationPlanStart: '',
    transformationPlanEend: '',
    serviceLevelsWithCredit: '',
    isEarnBack: '',
    isCustomerSatisfactionReport: '',
    customerSatisfactionForm: '',
    governanceType: '',
    governanceOften: '',
    keyPersonnel: '',
    supplierPersonnel: '',
    customerPersonnel: '',
    plannedNegotiationMonth: '',
    negotiationsMonth: '',
    soleSourced: '',
    proposedPeriodWeeks: '',
    actualPeriodWeeks: '',
    isDueDiligenceCompleted: '',
    agreementParty: '',
    typeOfService: '',
    currency: '',
    serviceLevelWithoutCredit: '',
    serviceLevelCapPercentage: '',
    serviceCredeitCapType: '',
  })


  function nextPreprocess() {
    props.saveState(props.index, { id: props.id });
    // props.saveState(props.index, { id: props.id, value });
    props.nextFn();
  }

  function previousPreprocess() {
    props.saveState(props.index, { id: props.id });
    // props.saveState(props.index, { id: props.id, value });
    props.prevFn();
  }

  function onValueChange(newValue) {
    if (value === newValue) {
      setValue(newValue);
      return;
    }
    setValue(newValue);
  }

  // function updateField(e) {
  //   setState({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   })
  //   console.log('object', ...form)
  // }
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label style={{
                marginLeft: '18px'
            }}>Please Enter..</Label>
            <Col sm={3}>
              {/* <Input
                type="text"
                name={name}
                placeholder="Text"
                value={value}
                onChange={(event) => onValueChange(event.target.value)}
              /> */}
              <Controller as={<Input />} type="text" name={name} control={control} defaultValue="" />
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

export default QuestionText;
