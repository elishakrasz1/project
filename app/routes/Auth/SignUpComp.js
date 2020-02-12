// import React, { Component } from 'react'

// class SignUpComp extends Component {
//     render() {
//         return (
//             <div>
//                 SignUpComp
//             </div>
//         )
//     }
// }

// export default SignUpComp;

import React, { Component } from "react";
import { Auth, Logger } from "aws-amplify";
import { Link } from "react-router-dom";

const logger = new Logger("SignUp");

import {
  Form,
  FormGroup,
  FormText,
  Input,
  CustomInput,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer
} from "../../components";

import { HeaderAuth } from "../components/Pages/HeaderAuth";
import { FooterAuth } from "../components/Pages/FooterAuth";

class SignUpComp extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.changeState = this.changeState.bind(this);
    this.inputs = {};
    this.state = { error: "" };
  }

  changeState(state, data) {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  signUp() {
    const { username, password, email, phone_number } = this.inputs;
    logger.info("sign up with " + username);
    Auth.signUp(username, password, email, phone_number)
      .then(() => this.signUpSuccess(username))
      .catch(err => this.signUpError(err));
  }

  signUpSuccess(username) {
    logger.info("sign up success with " + username);
    this.setState({ error: "" });

    this.changeState("confirmSignUp", username);
  }

  signUpError(err) {
    logger.info("sign up error", err);
    let message = err.message || err;
    if (message.startsWith("Invalid phone number")) {
      // reference: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
      message =
        "Phone numbers must follow these formatting rules: A phone number must start with a plus (+) sign, followed immediately by the country code. A phone number can only contain the + sign and digits. You must remove any other characters from a phone number, such as parentheses, spaces, or dashes (-) before submitting the value to the service. For example, a United States-based phone number must follow this format: +14325551212.";
    }
    this.setState({ error: message });
  }
  render() {

    // const { authState } = this.props;
    // if (authState !== 'signUp') { return null; }

    // const { error } = this.state;

    return (
      <EmptyLayout>
        <EmptyLayout.Section center width={480}>
          {/* START Header */}
          <HeaderAuth title="Create Account" />
          {/* END Header */}
          {/* START Form */}
          <Form className="mb-3">
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="text"
                id="username"
                placeholder="Enter a Username..."
                className="bg-white"
                onChange={event => this.inputs.username = event.target.value}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password..."
                className="bg-white"
                onChange={event => this.inputs.password = event.target.value}
              />
            </FormGroup>
            <FormGroup>
              <Label for="emailAdress">Email Adress</Label>
              <Input
                type="email"
                name="email"
                id="emailAdress"
                placeholder="Enter email..."
                className="bg-white"
                onChange={event => this.inputs.email = event.target.value}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone Number</Label>
              <Input
                type="text"
                name="text"
                id="phone_number"
                placeholder="Phone Number"
                className="bg-white"
                onChange={event => this.inputs.phone_number = event.target.value}
              />
            </FormGroup>
            <ThemeConsumer>
              {({ color }) => (
                <Button color={color} block onClick={this.signUp} tag={Link} to="/pages/confirmation">
                  Create Account
                </Button>
              )}
            </ThemeConsumer>
          </Form>
          {/* END Form */}
          {/* START Bottom Links */}
          <div className="d-flex mb-5">
            <Link onClick={() => this.changeState('forgotPassword')} className="text-decoration-none">
                
            {/* <Link to="/pages/forgot-password" className="text-decoration-none"> */}
              Forgot Password
            </Link>
            <Link  onClick={() => this.changeState('signIn')} className="ml-auto text-decoration-none">
            {/* <Link to="/pages/login" className="ml-auto text-decoration-none"> */}
              Back to Login
            </Link>
          </div>
          {/* END Bottom Links */}
          {/* START Footer */}
          <FooterAuth />
          {/* END Footer */}
        </EmptyLayout.Section>
      </EmptyLayout>
    );
  }
}

export default SignUpComp;
