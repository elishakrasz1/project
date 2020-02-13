import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";

import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../../apollo";
import store, { AmplifyBridge } from "../../store";
import AppLayout from "./../../layout/default";
import { RoutedContent } from "./../../routes";

const basePath = process.env.BASE_PATH || "/";

Amplify.Logger.LOG_LEVEL = "INFO"; // We write INFO level logs throughout app
Amplify.configure(awsconfig);
new AmplifyBridge(store);

const AppClient = () => {
  return (
      <ApolloProvider client={client}>
        <Router basename={basePath}>
          <AppLayout>
            <RoutedContent />
          </AppLayout>
        </Router>
      </ApolloProvider>
  );
};

export default hot(module)(AppClient);
