import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth, Logger } from 'aws-amplify';

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

const logger = new Logger('ConfirmSignUp');

class ConfirmSignUpComp extends Component {
    constructor(props) {
        super(props);
        this.confirmSignUp = this.confirmSignUp.bind(this);
        this.resendCode = this.resendCode.bind(this);
        this.changeState = this.changeState.bind(this);
        this.inputs = {};
        this.state = { message: '', error: '' }
      }
    
      changeState(state, data) {
        const { onStateChange } = this.props;
        if (onStateChange) {
          onStateChange(state, data);
        }
      }
    
      confirmSignUp() {
        const username = this.props.authData || this.inputs.username;
        const { code } = this.inputs;
        logger.info('confirm sign up with ' + code);
        Auth.confirmSignUp(username, code)
          .then(() => this.confirmSuccess(username))
          .catch(err => this.handleError(err));
      }
    
      resendCode() {
        const username = this.props.authData || this.inputs.username;
        logger.info('resend code to ' + username);
        Auth.resendSignUp(username)
          .then(() => this.setState({ message: 'Code sent' }))
          .catch(err => this.handleError(err));
      }
    
      confirmSuccess(username) {
        logger.info('confirm sign up success with ' + username);
        this.setState({ message: '', error: '' });
        this.changeState('signIn', username);
      }
    
      handleError(err) {
        logger.info('confirm sign up error', err);
        this.setState({ message: '', error: err.message || err });
      }

  render() {
    // const { authState, authData } = this.props;
    // if (authState !== 'confirmSignUp') { return null; }

    // const { message, error } = this.state;

    return (
      <EmptyLayout>
        <EmptyLayout.Section center>
          {/* START Header */}
          <HeaderAuth title="Sign In to Application" />
          {/* END Header */}
          {/* START Form */}
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
              <Label for="code">Code</Label>
              <Input
                type="text"
                placeholder="Code..."
                className="bg-white"
                onChange={event => this.inputs.code = event.target.value}
              />
            </FormGroup>
            <ThemeConsumer>
              {({ color }) => (
                 <div>
                      <Button color={color} onClick={this.confirmSignUp} block tag={Link} to="/">
                  Confirm
                </Button>
                <Button color={color} onClick={this.resendCode} block tag={Link} to="/">
                  Send Password Reset Code
                </Button>
                 </div>
              )}
            </ThemeConsumer>
          </Form>
          {/* END Form */}
          {/* START Bottom Links */}
          <div className="d-flex mb-5">
            <Link  onClick={() => this.changeState('signIn')} className="text-decoration-none">
            {/* <Link to="/pages/forgotpassword" className="text-decoration-none"> */}
              Back to Sign In
            </Link>
            <Link onClick={() => this.changeState('signUp')} className="ml-auto text-decoration-none">
            {/* <Link to="/pages/register" className="ml-auto text-decoration-none"> */}
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

export default ConfirmSignUpComp;
