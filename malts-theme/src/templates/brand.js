import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';

import Layout from 'malts-theme/src/components/layout';
import SEO from 'malts-theme/src/components/SEO';
import DynamicContent from '../components/DynamicContent';

require('../utils/fragments');

const BrandPage = ({ data }) => {
  const { brand } = data.strapi;
  return (
    <>
      <Layout pageName={brand.slug}>
        <SEO seo={brand.seo} />
        <Container fluid className={`brand-page ${brand.slug}`}>
          <DynamicContent components={brand.content} slug={brand.slug} pageName={brand.name} />
        </Container>
      </Layout>

    </>
  );
};

export default BrandPage;

export const pageQuery = graphql`
    query GetBrand($id: ID!) {
        strapi {
            brand(id: $id) {
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
                    ... TextBlockComponent
                    ... TextTileComponent
                    ... VideoComponent
                    ... MenuLinkComponent
                    ... FilterableProductSliderComponent
                    ... ImageTileGridComponent
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
