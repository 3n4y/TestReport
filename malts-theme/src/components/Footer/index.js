import React from 'react';
import { Row, Container } from 'react-bootstrap';
import FooterLinkComponent from '../FooterLinkComponent';
import styles from './footer.module.scss';

const Footer = () => (
  <footer>
    <Container
      fluid
      className={`${styles.footerLower} d-flex flex-column align-items-center justify-content-center`}
    >
      <Row fixed>
        <FooterLinkComponent level={1} />
      </Row>

      <Row style={{ minHeight: '26px' }}>
        <div id="footer" />
      </Row>
      <Row className={styles.footerLinks} className="page-width">
        <FooterLinkComponent level={0} />
      </Row>
    </Container>
  </footer>
);

export default Footer;
