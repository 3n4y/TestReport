import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProductTileComponent from '../ProductTileComponent';
import { useShopify } from '../../contexts/ShopifyContext';
import { giftHandles } from '../../contexts/PromotionManager';
import { useDataLayer, productImpression } from '../../utils/dataLayer/index';

const ProductGridComponent = ({ data, lgColumnCount, pageName }) => {
  const lg = lgColumnCount ?? 3;
  const [dataLayerProductImpression] = useDataLayer(productImpression, { debounce: true });
  const { fetched, getLiveProduct } = useShopify();

  useEffect(() => {
    if (fetched && data.products?.length) {
      dataLayerProductImpression(
        data.products.map((product) => getLiveProduct(product.slug) || product), pageName,
      );
    }
  }, fetched);

  return (
    <Container className="componentWrapper">
      <Container className="text-center page-width">
        <Row className="product-grid">
          {data.products
            ? data.products.map((product) => {
              if (giftHandles.includes(product.shopify_slug)) {
                return null;
              }
              return (
                <Col
                  xl={lg}
                  lg="6"
                  md="6"
                  sm="6"
                  xs="6"
                  className="p-0 mb-3"
                >
                  <ProductTileComponent key={product.id} data={product} />
                </Col>
              );
            })
            : ''}
        </Row>
      </Container>
    </Container>
  );
};

export default ProductGridComponent;
