import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import HeaderComponent from '../HeaderComponent';
import styles from './cta-component.module.scss';

const LinkWrapper = ({ data, children }) => {
  const locale = useStaticQuery(graphql`
  query{

      site {
          siteMetadata {
              title
              locale
          }
      }
  }`);

  return (
    <>{data.link ? <a href={`/${locale.site.siteMetadata.locale}/${data.link}`}>{children}</a> : { children }}</>
  );
};

/**
 *
 * @param {data} data - Format
 *
 *
 *
 */
const CtaComponent = ({ data, order }) => {
  let leftColumnStyle;
  let rightColumnStyle;

  switch (order.order) {
    case '11':
      leftColumnStyle = 'col-xs-12 col-md-6 mt-0 mb-0 mb-sm-3';
      rightColumnStyle = 'col-xs-12 col-md-6 mt-0 mb-0 mb-sm-3';
      break;
    case '12':
      leftColumnStyle = 'd-none d-md-block col-md-4 mt-0 mb-0 mb-sm-3 square';
      rightColumnStyle = 'col-sm-12 col-md-8 mt-0 mb-0 mb-sm-3 rectangular';
      break;
    case '21':
      leftColumnStyle = 'col-sm-12 col-md-8 mt-0 mb-0 mb-sm-3 rectangular';
      rightColumnStyle = 'd-none d-md-block col-md-4 mt-0 mb-0 mb-sm-3 square';
      break;
    default:
      console.log('Unexpected Action');
  }

  return (
    <Container
      className={`pb-4 alt componentWrapper ${
        data.className ? data.className : ''
      }`}
    >
      <Container fluid className={`cta text-center ${styles.cta}`}>
        <Row className="page-width">
          <Col className={leftColumnStyle}>
            <LinkWrapper data={data.Left_Column}>
              <HeaderComponent
                data={data.Left_Column}
                stylea={{ width: '100%' }}
              />
            </LinkWrapper>
          </Col>
          <Col className={rightColumnStyle}>
            <LinkWrapper data={data.Right_Column}>
              <HeaderComponent
                data={data.Right_Column}
                stylea={{ width: '100%' }}
              />
            </LinkWrapper>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CtaComponent;
