import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useStaticQuery, graphql } from 'gatsby';
import { withTrans } from './i18n/withTrans';
import Navbar from './NavBar';

const Layout = ({ children, pageName }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          locale
        }
      }
    }
  `);
  const { i18n } = useTranslation();
  if (i18n.language !== data.site.siteMetadata.locale) {
    i18n.changeLanguage(data.site.siteMetadata.locale);
  }

  return (
    <>
      <Navbar pageName={pageName} />
      <Container fluid className="px-0 main" id="page-wrap">
        <Container fluid className="p-0">
          <Row className="mx-0">
            <Col className="px-0">
              <main>{children}</main>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default withTrans(Layout);
