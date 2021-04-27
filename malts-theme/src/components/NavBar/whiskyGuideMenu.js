import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import styles from './navbar-component.module.scss';

require('../../utils/fragments');

const WhiskyGuideMenu = () => {
  const locale = useStaticQuery(graphql`
    query{

        site {
            siteMetadata {
                title
                locale
            }
        }
    }`);
  const { t } = useTranslation();

  return (
    <Container fluid className="justify-content-center p-lg-5 pl-0 pt-0">
      <Row className={styles.subNavHolder}>
        <Col className={`text-center ${styles.groupCaption} ${styles.menuList} col-sm-12 col-lg-2`}><li><a href={`/${locale.site.siteMetadata.locale}/${t('whisky-guide')}/${t('whisky-types')}`}>{t('Whisky Types')}</a></li></Col>
        <Col className={`text-center ${styles.groupCaption} ${styles.menuList} col-sm-12 col-lg-2`}><li><a href={`/${locale.site.siteMetadata.locale}/${t('whisky-guide')}/${t('the-making')}`}>{t('The Making')}</a></li></Col>
        <Col className={`text-center ${styles.groupCaption} ${styles.menuList} col-sm-12 col-lg-2`}><li><a href={`/${locale.site.siteMetadata.locale}/${t('whisky-guide')}/${t('the-flavour')}`}>{t('The Flavour')}</a></li></Col>
        <Col className={`text-center ${styles.groupCaption} ${styles.menuList} col-sm-12 col-lg-2`}><li><a href={`/${locale.site.siteMetadata.locale}/${t('whisky-guide')}/${t('the-tasting')}`}>{t('The Tasting')}</a></li></Col>
        <Col className={`text-center ${styles.groupCaption} ${styles.menuList} col-sm-12 col-lg-2`}><li><a href={`/${locale.site.siteMetadata.locale}/${t('whisky-guide')}/${t('the-history')}`}>{t('The History')}</a></li></Col>
        <Col className={`text-center ${styles.groupCaption} ${styles.menuList} col-sm-12 col-lg-2`}><li><a href={`/${locale.site.siteMetadata.locale}/${t('whisky-guide')}/${t('the-lingo')}`}>{t('The Lingo')}</a></li></Col>
      </Row>
    </Container>
  );
};

export default WhiskyGuideMenu;
