import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth, Logger, JS } from 'aws-amplify';

const logger = new Logger('ForgotPasswordReset');

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


class ForgotPasswordResetComp extends Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
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

  submit() {
    const username = this.props.authData;
    if (!username) {
      this.setState({ error: 'missing username' });
      return;
    }

    const { code, password } = this.inputs;
    logger.info('reset password for ' + username);
    Auth.forgotPasswordSubmit(username, code, password)
      .then(data => this.submitSuccess(username, data))
      .catch(err => this.handleError(err));
  }

  submitSuccess(username, data) {
    logger.info('forgot password reset success for ' + username, data);
    this.changeState('signIn', username);
  }

  handleError(err) {
    logger.info('forgot password reset error', err);
    this.setState({ error: err.message || err });
  }
  render() {
    // const { authState } = this.props;
    // if (authState !== 'forgotPasswordReset') { return null; }

    // const { error } = this.state;

    return (
      <EmptyLayout>
        <EmptyLayout.Section center>
          {/* START Header */}
          <HeaderAuth title="Password Reset" />
          {/* END Header */}
          {/* START Form */}
          <Form className="mb-3">
            <FormGroup>
              <Label for="emailAdress">Code</Label>
              <Input
                type="text"
                placeholder="Code..."
                className="bg-white"
                onChange={event => this.inputs.code = event.target.value}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password..."
                className="bg-white"
                onChange={event => this.inputs.password = event.target.value}
              />
            </FormGroup>
            <ThemeConsumer>
              {({ color }) => (
                <Button color={color} onClick={this.submit} block tag={Link} to="/">
                  Reset Password
                </Button>
              )}
            </ThemeConsumer>
          </Form>
          {/* END Form */}
          {/* START Bottom Links */}
          <div className="d-flex mb-5">
            <Link  onClick={() => this.changeState('forgotPassword')} className="text-decoration-none">
            {/* <Link to="/pages/forgotpassword" className="text-decoration-none"> */}
              Forgot Password
            </Link>
            <Link onClick={() => this.changeState('signIn')} className="ml-auto text-decoration-none">
            {/* <Link to="/pages/register" className="ml-auto text-decoration-none"> */}
              Back to Log In
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

export default ForgotPasswordResetComp;
