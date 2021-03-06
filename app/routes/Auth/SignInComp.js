import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth, Logger, JS } from 'aws-amplify';

const logger = new Logger('SignIn');

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

class SignInComp extends Component {

    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
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
    
      signIn() {
        const { username, password } = this.inputs;
        logger.info('sign in with ' + username);
        Auth.signIn(username, password)
          .then(user => this.signInSuccess(user))
          .catch(err => this.signInError(err));
      }
    
      signInSuccess(user) {
        logger.info('sign in success', user);
        this.setState({ error: '' });
    
        // There are other sign in challenges we don't cover here.
        // SMS_MFA, SOFTWARE_TOKEN_MFA, NEW_PASSWORD_REQUIRED, MFA_SETUP ...
        if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
          this.changeState('confirmSignIn', user);
        } else {
          this.checkContact(user);
        }
      }
    
      signInError(err) {
        logger.info('sign in error', err);
        /*
          err can be in different structure:
            1) plain text message;
            2) object { code: ..., message: ..., name: ... }
        */
        this.setState({ error: err.message || err });
      }
    
      checkContact(user) {
        Auth.verifiedContact(user)
          .then(data => {
            if (!JS.isEmpty(data.verified)) {
              this.changeState('signedIn', user);
            } else {
              user = Object.assign(user, data);
              this.changeState('verifyContact', user);
            }
          });
      }
    componentDidMount() {
      // console.log(Auth._getUserData)
    }
    render() {
        const { authState, authData } = this.props;
        // if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) { return null; }
    
        const { error } = this.state;
    
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
                    // id="emailAdress"
                    placeholder="Enter username/email..."
                    className="bg-white"
                    defaultValue={authData || '' }
                    onChange={event => this.inputs.username = event.target.value}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    // id="password"
                    placeholder="Password..."
                    className="bg-white"
                    onChange={event => this.inputs.password = event.target.value}
                  />
                </FormGroup>
                <ThemeConsumer>
                  {({ color }) => (
                    <Button color={color} onClick={this.signIn} block tag={Link} to="/dashboards/projects">
                      Sign In
                    </Button>
                  )}
                </ThemeConsumer>
              </Form>
              {/* END Form */}
              {/* START Bottom Links */}
              <div className="d-flex mb-5">
                <Link to="/auth/forgot-password" className="text-decoration-none">
                  Forgot Password
                </Link>
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
        )
    }
}

export default SignInComp;


