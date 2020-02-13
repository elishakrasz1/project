import React, { Component } from "react";
import { Logger } from "aws-amplify";
import store from "../store";
import SignInComp from "../routes/Auth/SignInComp";

const logger = new Logger("Main");

class Main extends Component {
  constructor(props) {
    super(props);

    this.storeListener = this.storeListener.bind(this);

    this.state = { user: null };
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.storeListener);
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  storeListener() {
    logger.info("redux notification");
    this.setState({ user: store.getState().user });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <SignInComp />;
    }

    return <div>Hello</div>;
  }
}

export default Main;
