import { graphql, Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import {
  Container, Row, Col, Tabs, Tab,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import ImageTileComponent from 'malts-theme/src/components/ImageTileComponent';
import BrandHeader from 'malts-theme/src/components/BrandHeader';
import BreadCrumbComponent from 'malts-theme/src/components/BreadCrumbComponent';
import ShopifyForm from 'malts-theme/src/components/ShopifyForm';
import { useShopify } from 'malts-theme/src/contexts/ShopifyContext/';

import Layout from 'malts-theme/src/components/layout';
import SEO from 'malts-theme/src/components/SEO';
import Image from 'malts-theme/src/components/Image';

import VideoComponent from 'malts-theme/src/components/VideoComponent';
import RecommendedProductsComponent from 'malts-theme/src/components/RecommendedProductsComponent';
import ThreediumView from 'malts-theme/src/components/ThreediumView';
import ProductDetailDescription from 'malts-theme/src/components/ProductDetailDescription';
import styles from './product-page.module.scss';
import { useDataLayer, productView } from '../utils/dataLayer/index';

import { withTrans } from '../components/i18n/withTrans';
import ClientOnly from '../utils/ClientOnly';

// This should be refactored
const RegionalCta = ({ product, region }) => {
  switch (region) {
    case 'en-gb':
    case 'de-de':
      return <ShopifyForm product={product} />;
    case 'en-au':
      return (
        <Link
          to="where-to-buy"
          className={`btn btn-primary ${styles.priceRegional}`}
        >
          Where to Buy
        </Link>
      );
    default:
      return (
        <span className={`${styles.price} ${styles.priceRegional}`}>
          Check availability with your local retailer
        </span>
      );
  }
};

const HORIZONTAL_ZOOMABLE_BREAKPOINT = 768;
const TastingNote = ({ title, text }) => (
  <Container className={`${styles.tastingNoteContainer} d-flex flex-column `}>
    <h5>{title}</h5>
    <ReactMarkdown source={text} />
  </Container>
);

const ProductPage = ({ data, location }) => {
  const { t } = useTranslation();
  const [viewProduct] = useDataLayer(productView, {
    debounce: true,
  });

  const settingsV = {
    dots: false,
    dotsClass: 'slick-dots slick-bars',
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: 'verticalslider',
    vertical: true,
    verticalSwiping: true,
  };

  const settingsMobile = {
    dots: false,
    dotsClass: 'slick-dots slick-bars',
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'horizontalslider',
    cssEase: 'linear',
  };

  const { product } = data.strapi;

  const [focusImage, setFocusImage] = useState(product.media[0]);

  const {
    fetched,
    getLiveProduct,
    cart: { checkout },
  } = useShopify();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  const liveProduct = getLiveProduct(product.slug);

  useEffect(() => {
    if (fetched) {
      viewProduct(liveProduct || product);
    }
  }, [fetched]);

  const firstVariant = liveProduct ? liveProduct.variants[0] : null;

  const breadcrumbLinks = { };
  breadcrumbLinks[`${t('Home')}`] = '/';
  breadcrumbLinks[`${t('Shop')}`] = `/${t('products')}`;

  if (product.brand && product.brand.name) {
    breadcrumbLinks[
      `${product.brand.name}`
    ] = `/${t('products')}/${product.brand.name.toLowerCase()}`;
  }

  return (
    <Layout pageName={product.title}>
      <SEO seo={product.seo} location={location} />
      <Helmet>
        <script type="application/ld+json">
          {`
              {
              "@context": "http://schema.org",
              "@type": "Product",
              "name": "${product.title}",
              "url":"${currentUrl}",
              "image":[
                  ${product.media
                    && product.media
                      .map(
                        (img) => `"${currentOrigin}${img?.imageFile?.publicURL}"`,
                      )
                      .join(',')}
              ],
              "description":"${product.detail_description ? product.detail_description.substring(0, 200) : ''}",
              ${firstVariant && firstVariant.sku
                        ? `"sku":"${firstVariant.sku}",` : ''
              }
              "brand":{
                      "@type":"Brand",
                      "name":"${
                        product.brand ? product.brand.name : 'malts.com'
                      }"
                  }
                  ${liveProduct
                        ? `,
                      "offers":{
                          "@type":"Offer",
                          ${firstVariant
                            && `"price":"${firstVariant.price}",`}
                          "priceCurrency":"${checkout.currencyCode}",
                          "url":"${currentUrl}",
                          "availability": "http://schema.org/InStock"
                      }
                  ` : ''}
              }
              `}
        </script>
      </Helmet>
      <Container fluid>
        <BrandHeader brand={product.brand} title={product.title} />
        <Container className="page-width pl-0">
          <BreadCrumbComponent
            className="pt-1"
            links={breadcrumbLinks}
            current={product.title}
          />
        </Container>
        <Container className="page-width detail-page">
          <Row className="pt-2">
            <Col md="6" sm="12" xs="12" style={{ zIndex: 2 }}>
              <Row>
                <Col sm="12" xs="12" className="d-sm-none">
                  <Container className={styles.mobileImageContainer}>
                    <Slider {...settingsMobile}>
                      {product.media
                        ? product.media.map((slide) => (
                          <Image
                            image={slide}
                            className="mainImage"
                            style={{
                              maxHeight: '355px !important',
                              border: '1px solid #d3d3d3 !important',
                            }}
                          />
                        ))
                        : ''}
                    </Slider>
                  </Container>
                </Col>
                <Col
                  sm="3"
                  className="d-none d-sm-block thumbnails"
                  style={{ border: '0px solid silver', overflow: 'hidden' }}
                >
                  <Slider {...settingsV}>
                    {product.media
                      ? product.media.map((slide) => (
                        <div onClick={() => setFocusImage(slide)}>
                          <Image
                            image={slide}
                            className="thmb"
                            style={{
                              maxHeight: '135px',
                              maxWidth: '135px',
                              border: '1px solid #d3d3d3',
                            }}
                          />
                        </div>
                      ))
                      : ''}
                  </Slider>
                </Col>
                <Col sm="9" className="d-none d-sm-block">
                  <ClientOnly>
                    <Image
                      image={focusImage}
                      isZoomable={
                        typeof window !== 'undefined'
                          ? window.innerWidth >= HORIZONTAL_ZOOMABLE_BREAKPOINT
                          : false
                      }
                      className="mainImage"
                      style={{ border: '1px solid #d3d3d3' }}
                    />
                  </ClientOnly>
                </Col>
              </Row>
            </Col>
            <Col
              md="6"
              sm="12"
              xs="12"
              className={styles.productDescriptionContainer}
            >
              <h1>{product.title}</h1>
              <div className={styles.priceText}>
                <div className="formAddToCart">
                  <RegionalCta
                    product={product}
                    region={data.site.siteMetadata.locale}
                  />
                </div>
              </div>
              <ThreediumView product={product} />
              <ProductDetailDescription product={product} />
            </Col>
          </Row>
          <Row>
            <Col className={`productProfile ${styles.tabContainer} pt-5`}>
              <Tabs defaultActiveKey="profile">
                {product.body
                || product.palate
                || product.nose
                || product.appearance ? (
                  <Tab eventKey="profile" title={t('Tasting Notes')}>
                    <Row>
                      <Col xs="12">
                        {product.appearance ? (
                          <TastingNote
                            text={product.appearance}
                            title={t('Appearance')}
                          />
                        ) : null}
                        {product.body ? (
                          <TastingNote
                            text={product.body}
                            title={t('Body')}
                          />
                        ) : null}
                        {product.nose ? (
                          <TastingNote
                            text={product.nose}
                            title={t('Nose')}
                          />
                        ) : null}
                        {product.palate ? (
                          <TastingNote
                            text={product.palate}
                            title={t('Palate')}
                          />
                        ) : null}
                        {product.finish ? (
                          <TastingNote
                            text={product.finish}
                            title={t('Finish')}
                          />
                        ) : null}
                      </Col>
                    </Row>
                  </Tab>
                  ) : null}
                {product.Awards && product.Awards.image_tiles ? (
                  <Tab eventKey="awards" title={t('Awards')}>
                    <Row className="page-width">
                      {product.Awards.image_tiles
                        ? product.Awards.image_tiles.map((award) => (
                          <Col className="col-sm-12 mt-3 mb-3 col-md-4">
                            <ImageTileComponent data={award} />
                          </Col>
                        ))
                        : null}
                    </Row>
                  </Tab>
                ) : null}

                {product.Reviews && product.Reviews.image_tiles ? (
                  <Tab eventKey="reviews" title={t('Reviews')}>
                    <Row className="page-width">
                      {product.Reviews.image_tiles
                        ? product.Reviews.image_tiles.map((review) => (
                          <Col
                            className="col-xs-2 col-sm-12 mt-3 mb-3 col-md-4"
                          >
                            <ImageTileComponent data={review} />
                          </Col>
                        ))
                        : null}
                    </Row>
                  </Tab>
                ) : null}

                {product.videos && Object.keys(product.videos).length > 0 ? (
                  <Tab eventKey="media" title="Media">
                    <Row>
                      <Col md="12" sm="12" className="m-auto">
                        {product.videos.map((video) => (
                          <VideoComponent data={video} />
                        ))}
                      </Col>
                    </Row>
                  </Tab>
                ) : null}
              </Tabs>
            </Col>
          </Row>
          <RecommendedProductsComponent />
        </Container>
      </Container>
    </Layout>
  );
};

export default withTrans(ProductPage);

export const pageQuery = graphql`
  query GetProduct($id: ID!) {
    strapi {
      product(id: $id) {
        seo {
          ...SeoComponent
        }
        id
        media {
          ...FullFluidImage
        }
        slug
        title
        tags
        brand {
          name
          content {
            ...HeaderComponent
          }
        }
        variants {
          sku
        }
        detail_description
        long_description
        Volume
        ABV
        nose
        origination
        palate
        appearance
        body
        finish
        videos {
          ...VideoComponent
        }
        Awards {
          ...ImageTileGridComponent
        }
        Reviews {
          ...ImageTileGridComponent
        }
        videos {
          ...VideoComponent
        }
        threedium_url
      }
    }
    site {
      siteMetadata {
        title
        locale
      }
    }
  }
`;
