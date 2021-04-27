import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Col } from 'react-bootstrap';

import styles from './footerlink-component.module.scss';

const FooterLinkComponent = ({ level = 0 }) => {
  const data = useStaticQuery(graphql`
    query {
      strapi {
        footerLinks {
          links {
            text
            url
            className
            target
            order
            variant
          }
          regions {
            name
          }
        }
      }
      site {
        siteMetadata {
          locale
        }
      }
    }
  `);

  const footerLinksForCurrentRegion = (
    data.strapi.footerLinks || []
  ).filter((footerLink) => footerLink.regions
    .map((region) => region.name)
    .includes(data.site.siteMetadata.locale));
  const footerLinksForLevel = footerLinksForCurrentRegion[level]?.links || [];

  return footerLinksForLevel.map((link) => (
    <Col xs="12" sm="3" className="text-center">
      {link.url ? (
        <a
          href={`/${data.site.siteMetadata.locale}/${link.url}`}
          className={`${link.className ?? styles.footerLink}`}
        >
          {link.text}
        </a>
      ) : (
        <p className={`${link.className ?? styles.footerText}`}>{link.text}</p>
      )}
    </Col>
  ));
};

export default FooterLinkComponent;
