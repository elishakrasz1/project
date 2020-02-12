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
          .then(() => logger.info('sign out success'))
          .catch(err => logger.info('sign out error', err));
      }

    return (
        <NavItem { ...props }>
        <NavLink tag={ Link }>
        {/* <NavLink tag={ Link } to="/pages/login"> */}
            <i className="fa fa-power-off" onClick={signOut}></i>
        </NavLink>
    </NavItem>
    )
    
}
    
NavbarUser.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export { NavbarUser };
