import React from 'react';
import queryString from 'query-string';
import {
  Button, Container, Row, Col,
} from 'react-bootstrap';
import styles from './welcome.module.scss';

const Welcome = () => {
  const params = typeof window !== 'undefined' ? queryString.parse(window.location.search) : {};

  function handleContinue() {
    window.location.assign(`https://malts-diageo.eu.auth0.com/continue?state=${params.state || ''}`);
  }

  return (
    <Container fluid className={`${styles.welcome} main px-0`} id="page-wrap">
      <Container fluid className="p-0">
        <Row>
          <Col>
            <div className={styles.centreBox}>
              <Button variant="link" className={styles.closeBtn} onClick={handleContinue} />
              <span className="uppercase">Welcome</span>
              <hr />
              <p>Thank you for becoming a member of Malts.com!</p>
              <p>
                You will now be the first to know about our latest releases, exclusive offers,
                pre-sales and more!
              </p>
              <br />
              <Button onClick={handleContinue}>Continue</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Welcome;
