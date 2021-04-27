import React from 'react';
import { Row, Container } from 'react-bootstrap';
import Slider from 'react-slick';
import ImageTileComponent from '../ImageTileComponent';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FormattedGrid = ({
  format, tiles, columns, mobilecolumns,
}) => {
  const md = columns ? 12 / columns : 4; // class md-4 for default column count = 3
  const sm = mobilecolumns ? 12 / mobilecolumns : 12; // class sm-12 for default column count = 1

  const settings = {
    dots: false,
    dotsClass: 'slick-dots slick-bars',
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
          dots: false,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
        },
      },
    ],
  };

  if (format === 'Slider') {
    return (
      <Slider {...settings}>
        {tiles
          ? tiles.map((imagetile) => (
            <ImageTileComponent key={imagetile.id} data={imagetile} />
          ))
          : null}
      </Slider>
    );
  }
  // Default Grid
  return (
    <Row className="page-width">
      {tiles
        ? tiles.map((imagetile) => (
          <div
            className={`mt-3 mb-3 col-md-${md} col-sm-${sm} col-xs-${sm}`}
          >
            <ImageTileComponent key={imagetile.id} data={imagetile} />
          </div>
        ))
        : null}
    </Row>
  );
};

const ImageTileGridComponent = ({ data }) => (
  <Container
    className={`componentWrapper ${data.className ? data.className : ''}`}
  >
    <Container fluid>
      <FormattedGrid
        format={data.format}
        tiles={data.image_tiles}
        columns={data.column_count}
        mobilecolumns={data.mobile_column_count}
      />
    </Container>
  </Container>
);

export default ImageTileGridComponent;
