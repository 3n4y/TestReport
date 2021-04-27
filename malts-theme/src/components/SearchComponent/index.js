import React, { useState } from 'react';

import { navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import {
  Container, Row, InputGroup, FormControl,
} from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from './search-component.module.scss';

const SearchComponent = (props) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const searchByName = () => {
    navigate(`${t('products')}/?q=${query}`);
  };

  return (
    <Container fluid className={`text-center px-0 ${styles.searchdrop}`}>
      <Row id="searchdrop" className={props.visible ? styles.searchContainer : styles.searchContainerHidden}>
        <InputGroup className={styles.searchInput}>
          <FormControl
            placeholder={t('What are you looking for?')}
            aria-label="Search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                searchByName();
              }
            }}
          />
          <InputGroup.Append>
            <InputGroup.Text
              className={styles.searchButton}
              onClick={() => searchByName()}
            >
              <AiOutlineSearch />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </Container>
  );
};

export default SearchComponent;
