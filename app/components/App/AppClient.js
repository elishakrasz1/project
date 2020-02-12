import React from 'react';
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);



import AppLayout from './../../layout/default';
import { RoutedContent } from './../../routes';

const basePath = process.env.BASE_PATH || '/';

const AppClient = () => {
    return (
        <Router basename={ basePath }>
            <AppLayout>
                <RoutedContent />
            </AppLayout>
        </Router>
    );
}

export default hot(module)(AppClient);