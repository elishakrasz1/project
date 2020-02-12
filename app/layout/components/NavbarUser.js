import React from 'react';
import { Link } from 'react-router-dom';
import { Auth, Logger } from 'aws-amplify';

import PropTypes from 'prop-types';


import {
    NavItem,
    NavLink
} from './../../components';

const logger = new Logger('SignOut');


const NavbarUser = (props) => {

   function signOut() {
        Auth.signOut()
            // console.log('method')
          .then(() => logger.info('sign out success'))
          .catch(err => logger.info('sign out error', err));
      }

    return (
        <NavItem { ...props }>
        <NavLink tag={ Link } to="/pages/login" onClick={signOut}>
            <i className="fa fa-power-off"></i>
        </NavLink>
    </NavItem>
    )
    
}
    
NavbarUser.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export { NavbarUser };
