import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import styles from './navbar-component.module.scss';

require('../../utils/fragments');

const BrandHomeMenu = () => {
  const { t } = useTranslation();
  const data = useStaticQuery(graphql`
        query{
            strapi {
                brandHomes(sort: "name:asc",where:  {published: "true"} ) {
                    name
                    slug
                }
                imageCtas {
                    id
                    link
                    image{
                        ...ThumbnailFixedImage
                    }
                }

            }
            site {
                siteMetadata {
                    title
                    locale
                }
            }
        }`);

  const { imageCtas } = data.strapi;

  let imageCta = null;
  if (imageCtas) {
    imageCta = imageCtas[Math.floor(Math.random() * imageCtas.length)];
  }

  const aToC = [];
  const dToO = [];
  const pToZ = [];

  data.strapi.brandHomes.forEach((brand) => {
    if (/^[a-cA-C].*$/.test(brand.name)) {
      aToC.push(brand);
    } else if (/^[d-oD-O].*$/.test(brand.name)) {
      dToO.push(brand);
    } else {
      pToZ.push(brand);
    }
  });

  return (
    <Container fluid className="justify-content-center p-lg-5 pl-1 pt-1">
      <Row className={styles.subNavHolder}>
        <Col className={`${styles.groupCaption} ${styles.menuList} col-xs-12 col-lg-4`}>
          <ul>
            { data.strapi.brandHomes.slice(0, 4).map((brand, i) => (
              <li data-brandhome-index={i}><a href={`/${data.site.siteMetadata.locale}/${t('distilleries')}/${brand.slug}`}>{brand.name}</a></li>
            )) }
          </ul>
        </Col>
        <Col className={`${styles.groupCaption} ${styles.menuList} col-xs-12 col-lg-4`}>
          <ul>
            { data.strapi.brandHomes.slice(4, 8).map((brand, i) => (
              <li data-brandhome-index={i + 4}><a href={`/${data.site.siteMetadata.locale}/${t('distilleries')}/${brand.slug}`}>{brand.name}</a></li>
            )) }
          </ul>
        </Col>
        <Col className={`${styles.groupCaption} ${styles.menuList} col-xs-12 col-lg-4`}>
          <ul>
            { data.strapi.brandHomes.slice(8, 12).map((brand, i) => (
              <li data-brandhome-index={i + 8}><a href={`/${data.site.siteMetadata.locale}/${t('distilleries')}/${brand.slug}`}>{brand.name}</a></li>
            )) }
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default BrandHomeMenu;
