import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('ForgotPassword');

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


class ForgotPasswordComp extends Component {
  constructor(props) {
    super(props);
    this.sendCode = this.sendCode.bind(this);
    this.changeState = this.changeState.bind(this);
    this.inputs = {};
    this.state = { error: '' }
  }

  changeState(state, data) {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  sendCode() {
    const username = this.props.authData || this.inputs.username;
    logger.info('resend code to ' + username);
    Auth.forgotPassword(username)
      .then(data => this.sendSuccess(username, data))
      .catch(err => this.handleError(err));
  }

  sendSuccess(username, data) {
    logger.info('sent code for ' + username, data);
    this.changeState('forgotPasswordReset', username);
  }

  handleError(err) {
    logger.info('forgot password send code error', err);
    this.setState({ error: err.message || err });
  }


  render() {
    return (
      <EmptyLayout>
      <EmptyLayout.Section center>
      {/* START Header */}
      <HeaderAuth title="Forgot Password" />
        <Form className="mb-3">
            <FormGroup>
              <Label for="emailAdress">UserName/Email Adress</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter username/email..."
                className="bg-white"
                // defaultValue={authData || '' }
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
                 <ThemeConsumer>
              {({ color }) => (
                <Button color={color} onClick={this.sendCode} block tag={Link} to="/">
                  Send Password Reset Code
                </Button>
              )}
            </ThemeConsumer>
          </Form>
          {/* END Form */}
          {/* START Bottom Links */}
          <div className="d-flex mb-5">
            {/* <Link  onClick={() => this.changeState('signIn')} className="text-decoration-none"> */}
            <Link to="/auth/signin" className="text-decoration-none">
              Back to Sign In
            </Link>
            {/* <Link onClick={() => this.changeState('signUp')} className="ml-auto text-decoration-none"> */}
            <Link to="/auth/signup" className="ml-auto text-decoration-none">
              Register
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

export default ForgotPasswordComp;
