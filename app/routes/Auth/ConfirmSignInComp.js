// import React, { Component } from 'react'

// class ConfirmSignInComp extends Component {
//     render() {
//         return (
//             <div>
//                 ConfirmSignIn
//             </div>
//         )
//     }
// }

// export default ConfirmSignInComp;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth, Logger, JS } from 'aws-amplify';

const logger = new Logger('ConfirmSignIN');

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


class ConfirmSignInComp extends Component {

    constructor(props) {
        super(props);
        this.confirmSignIn = this.confirmSignIn.bind(this);
        this.checkContact = this.checkContact.bind(this);
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
    
      confirmSignIn() {
        const user = this.props.authData;
        const { code } = this.inputs;
        logger.info('confirm sign in with ' + code);
        const mfaType = user.challengeName === 'SOFTWARE_TOKEN_MFA'
          ? 'SOFTWARE_TOKEN_MFA'
          : null;
        Auth.confirmSignIn(user, code, mfaType)
          .then(() => this.confirmSuccess(user))
          .catch(err => this.confirmError(err));
      }
    
      confirmSuccess(user) {
        logger.info('confirm sign in success', user);
        this.setState({ error: '' });
    
        this.checkContact(user);
      }
    
      confirmError(err) {
        logger.info('confirm sign in error', err);
        this.setState({ error: err.message || err });
      }
    
      checkContact(user) {
        Auth.verifiedContact(user)
          .then(data => {
            logger.info('verified contacts', data);
            if (!JS.isEmpty(data.verified)) {
              this.changeState('signedIn', user);
            } else {
              user = Object.assign(user, data);
              this.changeState('verifyContact', user);
            }
          })
          .catch(err => {
            logger.info('check verified contact error', err);
          });
      }

  render() {
    // const { authState } = this.props;
    // if (authState !== 'confirmSignIn') { return null; }

    // const { error } = this.state;

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
                type="text"
                name="code"
                placeholder="Code..."
                className="bg-white"
                onChange={event => this.inputs.code = event.target.value}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="code">Code</Label>
              <Input
                type="text"
               
                placeholder="Code..."
                className="bg-white"
                onChange={event => this.inputs.code = event.target.value}
              />
            </FormGroup> */}
            <ThemeConsumer>
              {({ color }) => (
                 <div>
                      <Button color={color} onClick={this.confirmSignIn} block tag={Link} to="/">
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

export default ConfirmSignInComp;
