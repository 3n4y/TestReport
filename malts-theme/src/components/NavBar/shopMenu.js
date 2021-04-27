import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import styles from './navbar-component.module.scss';

require('../../utils/fragments');

const ShopMenu = () => {
  const { t } = useTranslation();
  const data = useStaticQuery(graphql`
        query{
            strapi {
                brands(sort: "name:ASC",where:  {published: true}) {
                    name
                    category{
                        name
                    }
                    slug
                    tags
                }
                collections(sort: "name:ASC", where:  {published: "true", hide_from_menu: "false"}) {
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

  const blended = [];
  const other = [];
  const iconic = [];

  data.strapi.brands.forEach((brand) => {
    if (brand.category && brand.category.name === t('Other Whiskey')) {
      other.push(brand);
    } else if (brand.category && brand.category.name === t('Blended Scotch Whisky')) {
      blended.push(brand);
    } else if (brand.tags && brand.tags.indexOf('iconic') !== -1) {
      iconic.push(brand);
    }
  });

  return (
    <Container fluid className="justify-content-center p-lg-5 pl-1 pt-1">
      <Row fluid className={styles.subNavHolder}>
        <Col className={`${styles.menuList} col-sm-12 col-md-6 col-lg-2`}>
          <ul>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}`}><span className={styles.title}>{t('All Products')}</span></a></li>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=${t('offers')}`}><span className={styles.title}>{t('Offers')}</span></a></li>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=gifts`}><span className={styles.title}>{t('Whisky Gifts')}</span></a></li>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=new`}><span className={styles.title}>{t('New Products')}</span></a></li>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=rare%20%26%20exceptional`}><span className={styles.title}>{t('Rare and Exceptional')}</span></a></li>
            {data.site.siteMetadata.locale === 'en-gb'
              ? <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=personalise`}><span className={styles.title}>{t('Personalised Products')}</span></a></li>
              : ''}
          </ul>
        </Col>
        <Col className={`${styles.menuList} col-sm-12 col-md-6 col-lg-2`}>
          <ul>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=${t('iconic')}`}><span className={styles.title}>{t('Iconic Malts')}</span></a></li>
            { iconic ? iconic.map((brand) => (
              <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>{brand.name}</a></li>
            )) : ''}
          </ul>
        </Col>
        <Col className={styles.menuList}>
          <ul>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?flavour=fruity&flavour=smoky&flavour=spicy&flavour=sweet`}><span className={styles.title}>{t('Flavour')}</span></a></li>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?flavour=fruity`}>{t('Fruity')}</a></li>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?flavour=smoky`}>{t('Smoky')}</a></li>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?flavour=spicy`}>{t('Spicy')}</a></li>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?flavour=sweet`}>{t('Sweet')}</a></li>
          </ul>
        </Col>
        <Col className={`${styles.menuList} col-sm-12 col-md-6 col-lg-2`}>
          <ul>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=limited`}><span className={styles.title}>{t('Limited Editions')}</span></a></li>
            { data.strapi.collections ? data.strapi.collections.map((collection) => (
              <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/${t('collections')}/${collection.slug}`}>{collection.name}</a></li>
            )) : ''}
          </ul>
        </Col>
        <Col className={`${styles.menuList} col-sm-12 col-md-2`}>
          <ul>
            <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/?tag=blended`}><span className={styles.title}>{t('Blended Scotch Whisky')}</span></a></li>
            { blended ? blended.map((brand) => (
              <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/${brand.slug.replace(/\s+/g, '-').toLowerCase()}`}>{brand.name}</a></li>
            )) : ''}
          </ul>
        </Col>
        <Col className={`${styles.menuList} col-sm-12 col-md-2`}>
          <ul>
            <li><Link to={`/${t('products')}/?tag=world`}><span className={styles.title}>{t('World Whiskey')}</span></Link></li>
            { other ? other.map((brand) => (
              <li><a href={`/${data.site.siteMetadata.locale}/${t('products')}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}>{brand.name}</a></li>
            )) : ''}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopMenu;
