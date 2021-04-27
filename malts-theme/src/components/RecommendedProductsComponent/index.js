import React from 'react';
import { Container } from 'react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import FilterableProductSliderComponent from '../FilterableProductSliderComponent';
import TitleComponent from '../TitleComponent';

const recommendProductsFrom = (products) => [...products]
  .sort(() => 0.5 - Math.random())
  .slice(0, 8)
  .map((pr) => ({ category: 'default', product: pr }));

const RecommendedProductsComponent = () => {
  const data = useStaticQuery(graphql`
    query getRecommendedProducts {
      strapi {
        products(
          sort: "feature_weight:desc"
          where: { feature_weight_null: false, published: true }
          limit: 20
        ) {
          id
          media(limit: 1) {
            ...SmallFixedImage
          }
          title
          slug
          category {
            name
          }
          shopify_slug
          regions {
            name
          }
        }
      }
    }
  `);
  const allProducts = [...data.strapi.products];
  const recommendedProducts = React.useRef(false);
  if (!recommendedProducts.current) {
    recommendedProducts.current = recommendProductsFrom(allProducts);
  }
  const { t } = useTranslation();
  return (
    <Container className="componentWrapper recommended_products">
      <TitleComponent
        data={{
          Title: t('Recommended'),
          Subtitle: t('We think you\'ll enjoy these products'),
        }}
      />
      <FilterableProductSliderComponent
        data={{ categories: 'default', slides: recommendedProducts.current }}
        pageName="Recommended"
      />
    </Container>
  );
};

export default RecommendedProductsComponent;
