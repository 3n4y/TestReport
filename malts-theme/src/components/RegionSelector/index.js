import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FlagIconFactory from 'react-flag-icon-css';
import { Form, Dropdown } from 'react-bootstrap';

import styles from './region-selector.module.scss';

const FlagIcon = FlagIconFactory(React, { useCssModules: false });

export const RegionalSelector = (props) => {
  const { i18n } = useTranslation();

  const countries = [
    { code: 'gb', locale: 'en-gb', name: 'Great Britain' },
    { code: 'de', locale: 'de-de', name: 'Deutschland' },
    { code: 'au', locale: 'en-au', name: 'Australia' },
    { code: 'us', locale: 'en-us', name: 'United States' },
    { code: 'un', locale: 'en-row', name: 'Rest of World' },
  ];

  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  const selectedCountry = countries.find(
    (selectedCountry) => selectedCountry.locale === i18n.language,
  );

  const handleCountryChange = (e) => {
    const country = countries.find((ctry) => e === ctry.code);
    // redirect
    i18n.changeLanguage(country.locale);
    window.location.replace(`/${country.locale}/?agp=true`);
  };

  return (
    <Form id="regionSelector" className={`${styles.regionSelectorDropdown} ${styles.regionSelectorForm}`}>
      <Dropdown
        onSelect={handleCountryChange}
        show={show}
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
        onClick={hideDropdown, showDropdown}
      >
        <Dropdown.Toggle className={`${styles.regionSelector} text-right`}>
          <FlagIcon className="d-none" code={selectedCountry?.code} />
          <span className={` ${styles.regionText} `}>{selectedCountry?.name}</span>
          <span className={` ${styles.regionTextArrow} `} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {countries.map(({ code, name }) => (
            <Dropdown.Item key={code} eventKey={code}>
              <FlagIcon className="d-none" code={code} />
              <span className={`${styles.regionText} `}>{name}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );
};

export default RegionalSelector;
