import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';

import Layout from 'malts-theme/src/components/layout';
import SEO from 'malts-theme/src/components/SEO';
import DynamicContent from '../components/DynamicContent';

require('../utils/fragments');

const CollectionPage = ({ data }) => {
  const { collection } = data.strapi;
  return (
    <Layout pageName={collection.name}>
      <SEO seo={collection.seo} />
      <Container fluid className={`${collection.slug} collection`}>
        <DynamicContent
          components={collection.content}
          slug={collection.slug}
          pageName={collection.name}
        />
      </Container>
    </Layout>
  );
};

export default CollectionPage;

export const pageQuery = graphql`
    query GetCollection($id: ID!) {
        strapi {
            collection(id: $id) {
                seo{
                    ... SeoComponent
                }
                id
                slug
                name
                updated_at
                content {
                    ... HeaderComponent
                    ... Cta12Component
                    ... Cta21Component
                    ... FilterableProductSliderComponent
                    ... ProductGridComponent
                    ... ImageTileGridComponent
                    ... HeroSliderComponent
                    ... TitleComponent
                    ... VideoComponent
                    ... MenuLinkComponent
                    ... TextTileComponent
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
