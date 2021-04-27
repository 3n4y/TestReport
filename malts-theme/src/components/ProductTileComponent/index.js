import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useMediaQuery } from 'react-responsive';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useShopify } from '../../contexts/ShopifyContext';
import styles from './product-tile-component.module.scss';
import Image from '../Image';
import ShopifyForm from '../ShopifyForm';
import AddToCartButton from '../AddToCartButton';
import { useDataLayer, productClick } from '../../utils/dataLayer/index';
import { customProductTileFor } from '../../contexts/PromotionManager';

const DefaultProductTile = ({ data, handleClick, locale }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const categoryLabel = data.category && data.category.name
    ? `${data.category.name.replace(/\s+/g, '-').toLowerCase()}/`
    : '';

  return (
    <>
      <div className={styles.tile}>
        <a
          href={`/${locale.site.siteMetadata.locale}/${t('products')}/${categoryLabel}${data.slug}/`}
          className={styles.tile}
          onClick={handleClick}
        >
          <Image
            image={data.media[0]}
            className={`productTileImage ${styles.tileImage}`}
            style={{
              minHeight: '',
              maxWidth: 'calc(100% - 30px)',
              textAlign: 'center',
            }}
          />
          <Row style={{ maxWidth: '100%', width: '100%', margin: '0 auto' }}>
            <Col md="7" xs="12" className={styles.tileTitleContainer}>
              <p className={`text-xs-center ${styles.tileTitle}`}>
                {data.title}
              </p>
            </Col>
            <Col md="5" xs="12" className={styles.tileTitleContainer}>
              <ShopifyForm product={data} priceOnly />
            </Col>
          </Row>
        </a>

        {!isMobile ? (
          <div className={styles.qsContainer}>
            <a
              href={`/${locale.site.siteMetadata.locale}/${t('products')}/${categoryLabel}${data.slug}/`}
              className={`link ${styles.popupTile}`}
              onClick={handleClick}
            />
            <AddToCartButton productID={data.slug} />
          </div>
        ) : null}
      </div>
    </>
  );
};
const ProductTileComponent = ({ data }) => {
  const locale = useStaticQuery(graphql`
  query{

      site {
          siteMetadata {
              title
              locale
          }
      }
  }`);
  const [dataLayerProductClick] = useDataLayer(productClick);

  const { getLiveProduct } = useShopify();
  const product = getLiveProduct(data.slug);

  const handleClick = () => {
    dataLayerProductClick(product || data);
  };

  const [productTile, setProductTile] = useState(
    <DefaultProductTile data={data} handleClick={handleClick} locale={locale} />,
  );
  useEffect(() => {
    if (product) {
      const NewProductTile = customProductTileFor(product) || DefaultProductTile;
      setProductTile(
        <NewProductTile data={data} handleClick={handleClick} locale={locale} />,
      );
    }
  }, [product, data, locale]);

  return productTile;
};
export default ProductTileComponent;
