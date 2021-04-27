import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import styles from './navbar-component.module.scss';

require('../../utils/fragments');

const DESKTOP_COLS_COUNT = 6;

const BrandMenu = () => {
  const { t } = useTranslation();
  const data = useStaticQuery(graphql`
    query {
      strapi {
        brands(sort: "name:ASC", where: { published: true }) {
          name
          category {
            name
          }
          regions {
            name
          }
          slug
        }
        imageCtas {
          id
          link
          image {
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
    }
  `);

  const strapiBrands = data.strapi.brands.filter((brand) => {
    const availableInRegion = brand.regions
      .filter((region) => region.name === data.site.siteMetadata.locale);
    if (availableInRegion.length > 0) {
      if (!brand.category) {
        return true;
      } if (
        !(
          brand.category.name === t('Other Whiskey')
          || brand.category.name === t('Blended Scotch Whisky')
        )
      ) {
        return true;
      }
    }
    return false;
  });

  const brandsPerColumn = Math.ceil(strapiBrands.length / DESKTOP_COLS_COUNT);

  const brandColumns = strapiBrands.reduce((finalArray, brand, i) => {
    const targetColumn = Math.floor(i / brandsPerColumn);
    const brandArray = finalArray;
    if (!brandArray[targetColumn]) {
      brandArray[targetColumn] = {
        id: `brandMenuCol-${i}`,
        brands: [brand],
      };
    } else {
      brandArray[targetColumn].brands.push(brand);
    }

    return brandArray;
  }, []);

  return (
    <Container fluid className="p-lg-5 pl-1 pt-1">
      <Row className={`${styles.subNavHolder} ${styles.brandMenuRow}`}>
        {brandColumns.map((brandColumn) => (
          <Col className={`${styles.groupCaption} ${styles.menuList} col-xs-12 col-sm-6 col-lg-2 p-0`} key={brandColumn.id}>
            <ul>
              {brandColumn.brands.map((brand, i) => (
                <li key={brand.slug} data-brand-index={i}>
                  <a href={`/${data.site.siteMetadata.locale}/${t('brands')}/${brand.slug}`}>{brand.name}</a>
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BrandMenu;
