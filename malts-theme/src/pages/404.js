import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import HeaderComponent from 'malts-theme/src/components/HeaderComponent';
import SearchComponent from 'malts-theme/src/components/SearchComponent';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from 'malts-theme/src/components/layout';
import SEO from 'malts-theme/src/components/SEO';
import { useTranslation } from 'react-i18next';
import { withTrans } from 'malts-theme/src/components/i18n/withTrans';

const ErrorPage = ({ location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            locale
          }
        }
      }
    `,
  );
  const { t } = useTranslation();
  return (
    <Layout pageName="404">
      <SEO location={location} />
      <HeaderComponent data={{ background_image: null, title: '404' }} stylea={{ backgroundColor: '#1F5B5E' }} />
      <Container className="text-center">
        <Row>
          <Col className="mt-5">
            <h1>{ site.siteMetadata.locale === 'de-de' ? 'ES TUT UNS LEID!' : t('Sorry!') }</h1>
            <p>{ site.siteMetadata.locale === 'de-de' ? 'Wir können diese Seite nicht finden. Versuchen Sie weiter unten zu suchen...' : t("We can't seem to find this page. Try searching below...") }</p>
          </Col>
        </Row>
        <Row className="d-block onpagesearch">
          <Col>
            <SearchComponent visible="true" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default withTrans(ErrorPage);
