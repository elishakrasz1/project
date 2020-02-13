import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


import AppClient from './components/App/AppClient';

import store from './store'

render(
    <Provider store={store}>
         <AppClient />
    </Provider>,
    document.querySelector('#root')
);