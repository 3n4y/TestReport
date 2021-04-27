import React from 'react';
import { Container } from 'react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';

import { Helmet } from 'react-helmet';
import styles from './breadcrumb.module.scss';

/**
 * Provides a breadcrumb links and related seo for the breadcrumbs
 */
const BreadCrumbComponent = ({ links, current }) => {
  const locale = useStaticQuery(graphql`
  query{

      site {
          siteMetadata {
              title
              locale
          }
      }
  }`);
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      <Container fluid className="page-width text-left">
        <div className={styles.breadcrumbContainer}>
          {links ? Object.keys(links).map((key) => (
            <>
              <a href={`/${locale.site.siteMetadata.locale}/${links[key].replace(/\s+/g, '-').toLowerCase()}`} className={`${styles.breadcrumbLink}`}>{key}</a>
              <span className={`${styles.breadcrumbDevider}`}>&nbsp;/&nbsp;</span>
            </>
          )) : null}
          <span className={`${styles.breadcrumbCurrent}`}>{current}</span>
        </div>
      </Container>
      <Helmet>
        <script type="application/ld+json">
          {`
                {
                "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement":
                    [
                        ${links ? Object.keys(links).map((key, i) => `{
                            "@type": "ListItem",
                            "position": ${i + 1},
                            "item":
                                {
                                "@id": "${currentOrigin}${links[key].replace(/\s+/g, '-').toLowerCase()}",
                                "name": "${key}"
                                }
                            }`) : ''}
                    ]
                }
                `}
        </script>
      </Helmet>
    </>
  );
};

export default BreadCrumbComponent;
