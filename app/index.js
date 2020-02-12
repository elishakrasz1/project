import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';

import AppClient from './components/App/AppClient';

render(
    <AppClient />,
    document.querySelector('#root')
);