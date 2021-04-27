import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from 'malts-theme/src/components/layout';
import SEO from 'malts-theme/src/components/SEO';
import AnyRoadsTourComponent from 'malts-theme/src/components/AnyRoadsTourComponent';
import DynamicContent from 'malts-theme/src/components/DynamicContent';

require('../utils/fragments');

const BrandHomeTourPage = ({ data }) => {
  const tour = data.strapi.tourBooking;
  return (
    <Layout pageName={tour.title}>
      <SEO seo={tour.seo} />
      <Container fluid className={`brand-page ${tour.slug}`}>
        <DynamicContent components={tour.content} slug={tour.slug} pageName={tour.title} />
        <AnyRoadsTourComponent data={tour.anyroads} />
      </Container>
    </Layout>
  );
};

export default BrandHomeTourPage;

export const pageQuery = graphql`
    query GetBrandHomeTours($id: ID!) {
        strapi {
            tourBooking(id: $id) {
                seo{
                    ... SeoComponent
                }
                slug
                title
                anyroads{
                    id
                    container_id
                    configuration
                }
                content {
                    ... HeaderComponent
                    ... MenuLinkComponent
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
