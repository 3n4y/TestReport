import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { Link } from 'gatsby';
import styles from './texttile-component.module.scss';
import Image from '../Image';
import Video from '../Video';
import GoogleMapsComponent from '../GoogleMapsComponent';

const TextTileComponent = ({ data }) => {
  const orientation = data.image_placement || 'Above';

  switch (orientation) {
    case 'Above':
      return <ImageAboveComponent data={data} />;
    case 'Right':
      return <ImageRightComponent data={data} />;
    case 'Left':
      return <ImageLeftComponent data={data} />;
    case 'Cover':
      return <ImageCoverComponent data={data} />;
    default:
      return '';
  }
};

const ImageLeftComponent = ({ data }) => (
  <Container className={` ${data.className ? data.className : ''}`}>
    <Row className="content">
      {' '}
      {/* */}
      <Col md="6" sm="12" xs="12" className={`left-column p-0 ${styles.imageContainer}`}>
        <ImageComponent
          image={data.image}
          background={data.background_image}
          videoUrl={data.video_url}
        />
      </Col>
      <Col md="6" sm="12" xs="12" className={`right-column p-0 ${styles.textContainer}`}>
        <TextSideComponent data={data} />
      </Col>
    </Row>
  </Container>
);

const ImageRightComponent = ({ data }) => (
  <Container className={` ${data.className ? data.className : ''}`}>
    <Row className={`${styles.imageRight} m-auto content`}>
      <Col md="6" sm="12" xs="12" className={`left-column p-0 ${styles.textContainer}`}>
        <TextSideComponent data={data} />
      </Col>
      <Col md="6" sm="12" xs="12" className={`right-column p-0 ${styles.imageContainer}`}>
        <ImageComponent
          googleMapEmbed={data.google_maps_embed}
          image={data.image}
          background={data.background_image}
          videoUrl={data.video_url}
        />
      </Col>
    </Row>
  </Container>
);

const ImageAboveComponent = ({ data }) => (
  <Container
    className={`page-width ${data.className}`}
    style={{ display: 'grid', gridAutoRows: '1fr' }}
  >
    <ImageComponent
      image={data.image}
      background={data.background_image}
      videoUrl={data.video_url}
    />
    <TextSideComponent data={data} />
  </Container>
);

const ImageCoverComponent = ({ data }) => {
  const backgroundImage = data.background_image && data.background_image.imageFile
    ? data.background_image.imageFile.childImageSharp.fluid.src
    : null;
  const divStyle = {
    minHeight: '500px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <Container className={`${data.className}`} style={divStyle}>
      <Row>
        <Col className="p-0">
          <TextSideComponent data={data} />
        </Col>
      </Row>
    </Container>
  );
};

const TextSideComponent = ({ data }) => (
  <>
    <div className={`contentHolder ${styles.background}`}>
      {data.title_image ? (
        <div className={styles.imgCenter}>
          <h2>
            <Image image={data.title_image} />
          </h2>
        </div>
      ) : null}
      <Container>
        <h2 className={styles.titleText}>{data.title}</h2>
        <div className={styles.markdownBody}>
          <ReactMarkdown source={data.description} />
        </div>

        {data.link_text && data.link && data.link.indexOf('http') !== -1 ? (
          <a
            className="btn btn-primary"
            href={`${data.link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.link_text}
          </a>
        ) : data.link_text && data.link ? (
          <Link to={data.link} className="btn btn-primary">
            {data.link_text}
          </Link>
        ) : null}
      </Container>
    </div>
  </>
);

const ImageComponent = ({
  image, background, videoUrl, googleMapEmbed,
}) => {
  if (googleMapEmbed) {
    return <GoogleMapsComponent data={{ embed: googleMapEmbed }} />;
  }

  const backgroundImage = background?.imageFile?.childImageSharp?.fluid?.src;
  const mediaImage = image?.imageFile?.childImageSharp?.fluid?.src;

  const divStyle = {
    padding: '30px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const mediaStyle = {
    backgroundImage: `url(${mediaImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  };

  return (
    <div
      style={divStyle}
      className="w-100 h-100 d-flex justify-content-center align-items-center"
    >
      <div style={mediaStyle} className="w-100 h-100">
        {videoUrl ? <Video videoUrl={videoUrl} /> : null}
      </div>
    </div>
  );
};

export default TextTileComponent;
