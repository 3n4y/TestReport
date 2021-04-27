import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';

import Layout from 'malts-theme/src/components/layout';
import SEO from 'malts-theme/src/components/SEO';
import DynamicContent from '../components/DynamicContent';

require('../utils/fragments');

const BrandHomePage = ({ data }) => {
  const brand = data.strapi.brandHome;
  return (
    <Layout pageName={brand.name}>
      <SEO seo={brand.seo} />
      <Container fluid className={`brand-page ${brand.slug}`}>
        <DynamicContent components={brand.content} slug={brand.slug} pageName={brand.name} />
      </Container>
    </Layout>
  );
};

export default BrandHomePage;

export const pageQuery = graphql`
    query GetBrandHome($id: ID!) {
        strapi {
            brandHome(id: $id) {
                seo{
                    ... SeoComponent
                }
                id
                slug
                name
                content {
                    ... HeaderComponent
                    ... TitleComponent
                    ... ProductGridComponent
                    ... TextTileComponent
                    ... VideoComponent
                    ... MenuLinkComponent
                    ... ImageTileGridComponent
                    ... GoogleMapsComponent
                }
              }
        }
        site {
            siteMetadata {
              title
              locale
            }
        }
    }`;
