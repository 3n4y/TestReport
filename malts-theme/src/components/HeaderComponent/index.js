import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Container, Jumbotron } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useMediaQuery } from 'react-responsive';
import { useDataLayer, promoClick, promoImpression } from 'malts-theme/src/utils/dataLayer/index';
import styles from './header-component.module.scss';
import Image from '../Image';

const HeaderComponent = ({ data, position, stylea = {} }) => {
  const locale = useStaticQuery(graphql`
  query {
    site {
        siteMetadata {
            title
            locale
        }
      }
  }`);

  const isClickable = data.link ? '' : 'noClick';
  const desktopBackgroundImage = data.background_image?.imageFile?.childImageSharp?.fluid?.src;
  const mobileImage = data.alt_mobile_background_image?.imageFile?.childImageSharp?.fluid?.src;
  const mobileBackgroundImage = mobileImage || desktopBackgroundImage;

  const divDesktopStyle = {
    backgroundImage: `url(${desktopBackgroundImage})`,
    backgroundPosition: 'center',
  };
  const divMobileStyle = {
    backgroundImage: `url(${mobileBackgroundImage})`,
    backgroundPosition: 'center bottom',
  };
  const bannerHeight = data.className ? data.className : 'regular';
  const desktopStyle = { ...stylea, ...divDesktopStyle };
  const mobileStyle = { ...stylea, ...divMobileStyle };
  const [isMobile, setIsMobile] = useState(useMediaQuery({ query: '(max-width: 768px)' }));
  const [isLoading, setIsLoading] = useState(true);
  const [
    dataLayerPromoClick,
    dataLayerPromoImpression,
  ] = useDataLayer([promoClick, promoImpression]);

  function changeMobileView() {
    setIsMobile(window.innerWidth <= 768);
    setIsLoading(false);
  }

  function logPromoImpression() {
    if (data.link_text) {
      const promo = [{
        id: data.id,
        name: data.title,
        creative: isMobile ? mobileBackgroundImage : desktopBackgroundImage,
        position,
      }];
      dataLayerPromoImpression(promo);
    }
  }

  const handleClick = () => {
    const promo = {
      id: data.id,
      name: data.title,
      creative: isMobile ? mobileBackgroundImage : desktopBackgroundImage,
      position,
    };
    dataLayerPromoClick(promo);
  };

  useEffect(() => {
    changeMobileView();
    logPromoImpression();
    window.addEventListener('resize', changeMobileView);
    return () => {
      window.removeEventListener('resize', changeMobileView);
    };
  }, []);

  return (
    <a href={`/${locale.site.siteMetadata.locale}/${data.link}`} className={`${styles.noTextDecoration} ${isClickable}`} onClick={handleClick}>
      <Jumbotron
        fluid
        style={isLoading ? stylea : isMobile ? mobileStyle : desktopStyle}
        className={`${styles.headerContainer} ${bannerHeight} ${
          data.link_text ? 'text-left' : 'text-center'
        }`}
      >
        <Container className=" d-flex flex-column justify-content-center page-width">
          <div className="frame-content">
            <h1>
              <div className={styles.imgCenter}>
                <Image image={data.header_image} />
              </div>
              {data.title}
            </h1>
            <h4>
              <ReactMarkdown
                className={styles.subtitleText}
                source={data.subtitle}
              />
            </h4>
            {data.link_text ? (
              <div className="btn btn-primary">
                {data.link_text}
              </div>
            ) : null}
          </div>
        </Container>
      </Jumbotron>
    </a>
  );
};

export default HeaderComponent;
