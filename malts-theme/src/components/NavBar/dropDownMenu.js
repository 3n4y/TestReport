import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from './navbar-component.module.scss';

export default function HoverControlledDropdown(props) {
  const [isOpen, updateIsOpen] = useState(false);

  return (
    <Dropdown
      {...props}
      onMouseOver={() => updateIsOpen(true)}
      onFocus={() => updateIsOpen(true)}
      onMouseLeave={() => updateIsOpen(false)}
      onBlur={() => updateIsOpen(false)}
      toggle={() => updateIsOpen(!isOpen)}
      show={isOpen}
      className={`${styles.hoverControlledDropdown}`}
    />
  );
}
