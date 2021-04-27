import React from 'react';
import { Row, Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useStaticQuery, graphql } from 'gatsby';
import styles from './announcebar-component.module.scss';

const AnnounceBarComponent = () => {
  const data = useStaticQuery(graphql`
    query{
        strapi {
            announceBars {
                className
                link
                text
                regions{
                    name
                }
            }

        }
        site {
            siteMetadata {
                locale
            }
        }
    }`);

  const announceBars = data.strapi.announceBars ? data.strapi.announceBars.filter(
    (announceBar) => announceBar.regions
      .map((region) => region.name).includes(data.site.siteMetadata.locale),
  ) : null;

  return (
    <Container fluid>
      { announceBars ? announceBars.map((bar) => (
        <Row className={`${bar.className ? bar.className : styles.announceBarBackground} ${styles.announceBar}`}>
          <ReactMarkdown source={bar.text} />
        </Row>
      )) : null}
    </Container>
  );
};

export default AnnounceBarComponent;
