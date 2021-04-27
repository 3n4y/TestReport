import React from 'react';
import { Link } from 'gatsby';

import '../styles/_sidebar.scss';

const Toggle = (props) => (
  <Link id="toggle" onClick={props.click}>&#8801; </Link>
);

export default Toggle;
