import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import {
  Nav, Tab, Row, Container,
} from 'react-bootstrap';
import { useDataLayer, productImpression } from '../../utils/dataLayer/index';
import { useShopify } from '../../contexts/ShopifyContext';
import ProductTileComponent from '../ProductTileComponent';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FilterableProductSliderComponent = ({ data, pageName }) => {
  const [dataLayerProductImpression] = useDataLayer(productImpression, { debounce: true });
  const { fetched, getLiveProduct } = useShopify();

  // Data Layer Analytics Pushes
  useEffect(() => {
    if (fetched) {
      dataLayerProductImpression(
        data.slides.map(({ product }) => getLiveProduct(product?.slug) || product), pageName,
      );
    }
  }, [fetched]);

  const categories = data.categories
    ? data.categories.split(',').map((category) => category.trim())
    : ['default'];

  const [activeKey, setActiveKey] = useState(0);

  // At slides == 4 and infinite = true, slides don't show
  const slidePatch = data.slides && data.slides.length <= 4 ? data.slides.length : 4;

  const settings = {
    dots: false,
    dotsClass: 'slick-dots slick-bars',
    infinite: true,
    speed: 500,
    slidesToShow: slidePatch,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  // shows categories tab if there is more then 1 category;

  const HasCategories = ({ data }) => {
    if (data.length > 1) {
      return (
        <Row>
          <Nav
            variant="link"
            className="d-flex flex-row ml-auto mr-auto justify-content-center categories_list"
          >
            {categories.map((category, index) => (
              <Nav.Item>
                <Nav.Link eventKey={index}>
                  <h6>{category}</h6>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Row>
      );
    }
    return null;
  };

  return (
    <>
      <Container className="page-width" style={{ marginBottom: '0px' }}>
        <Tab.Container
          id="slider-tabs"
          activeKey={activeKey}
          onSelect={(index) => setActiveKey(index)}
        >
          <HasCategories data={categories} />
          <Row>
            <Tab.Content className="w-100">
              {categories.map((category, index) => (
                <Tab.Pane eventKey={index}>
                  <Slider {...settings} key={Date.now()}>
                    {data.slides
                      ? data.slides
                        .filter((slide) => slide.category === category)
                        .map((slide) => (
                          <ProductTileComponent
                            key={slide.product ? slide.product.id : index}
                            data={slide.product}
                          />
                        ))
                      : null}
                  </Slider>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

export default FilterableProductSliderComponent;
