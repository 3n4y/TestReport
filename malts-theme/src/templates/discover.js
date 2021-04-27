import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from 'malts-theme/src/components/layout';
import SEO from 'malts-theme/src/components/SEO';
import DynamicContent from '../components/DynamicContent';

require('../utils/fragments');

const DiscoverPage = ({ data }) => {
  const { discover } = data.strapi;
  const discoverSlug = discover.slug.replace(/\//g, '_');
  return (
    <Layout pageName={discover.title}>
      <SEO seo={discover.seo} />
      <Container fluid className={`discover ${discoverSlug}`}>
        <DynamicContent
          components={discover.content}
          slug={discoverSlug}
          pageName={discover.title}
        />
      </Container>
    </Layout>
  );
};

export default DiscoverPage;

export const pageQuery = graphql`
    query GetDiscover($id: ID!) {
        strapi {
            discover(id: $id) {
                seo{
                    ... SeoComponent
                }
                id
                slug
                title
                updated_at
                tile {
                    ... TextTileComponent
                }
                content {
                    ... TextBlockComponent
                    ... HeaderComponent
                    ... TitleComponent
                    ... VideoComponent
                    ... ProductGridComponent
                    ... MenuLinkComponent
                    ... TextTileComponent
                    ... ImageTileGridComponent
                    ... FilterableProductSliderComponent
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
