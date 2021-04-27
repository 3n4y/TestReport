import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { withTrans } from 'malts-theme/src/components/i18n/withTrans';

import Layout from 'malts-theme/src/components/layout';
import SEO from 'malts-theme/src/components/SEO';
import DynamicContent from '../components/DynamicContent';
import BrandMenu from '../components/NavBar/brandMenu';

require('../utils/fragments');

const Page = ({
  data, location,
}) => {
  const { t } = useTranslation();
  const { page } = data.strapi;
  return (
    <Layout pageName={page.title}>
      <SEO seo={page.seo} location={location} />
      <Container fluid className="text-center px-0">
        <DynamicContent components={page.content} slug={page.slug} pageName={page.title} />
        {page.slug === `/${t('brands')}`
          ? (
            <div className="d-flex align-items-center justify-content-center">
              <BrandMenu hideAd />
            </div>
          )
          : null}
      </Container>
    </Layout>
  );
};

export default withTrans(Page);

/**
 *  ...HeaderComponent (etc..) fragments are included in the utils/fragments.js source file
 *
 *
 */
export const pageQuery = graphql`
query GetPage($id: ID!) {
  strapi {
    page(id: $id) {
      seo {
        ... SeoComponent
      }
      title
      slug
      content {
        ... HeaderComponent

        ... TitleComponent

        ... ProductGridComponent

        ... ImageTileGridComponent

        ... Cta12Component

        ... Cta21Component

        ... Cta11Component

        ... HeroSliderComponent

        ... FilterableProductSliderComponent

        ... TextTileComponent

        ... MenuLinkComponent

        ... VideoComponent

        ... TextBlockComponent

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
