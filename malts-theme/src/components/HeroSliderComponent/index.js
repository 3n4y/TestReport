import React from 'react';
import Slider from 'react-slick';
import { Container } from 'react-bootstrap';
import HeaderComponent from '../HeaderComponent';
import styles from './hero-slider-component.module.scss';

const HeroSliderComponent = ({ data, slug }) => {
  const settingsV = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    fade: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    dotsClass: styles.slickDotsV,
    className: 'verticalslider',
    vertical: true,
    verticalSwiping: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          arrows: true,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };

  return (
    <Container fluid className={`text-center ${styles.heroContainer}`}>
      <Slider {...settingsV}>
        {data.slides
          ? data.slides.map((slide, index) => (
            <HeaderComponent
              key={slide.id}
              data={slide}
              position={`${slug} hero slot_${index + 1}`}
              stylea={{ overflow: 'hidden', height: '375px' }}
            />
          ))
          : ''}
      </Slider>
    </Container>
  );
};

export default HeroSliderComponent;
