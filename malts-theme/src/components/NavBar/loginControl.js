import React from 'react';
import { Link } from 'gatsby';
import LoggedInIcon from './loggedInIcon';
import LoggedOutIcon from './loggedOutIcon';
import { useAuth0 } from '../../utils/auth0-wrapper';

const LoginControl = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return (
      <Link
        className="isAuthenticated"
        activeClassName="active"
        partiallyActive
        to="/user/account"
      >
        <LoggedInIcon />
      </Link>
    );
  }

  return (
    <div onClick={() => loginWithRedirect()} >
      <LoggedOutIcon />
    </div>
  );
};

export default LoginControl;
