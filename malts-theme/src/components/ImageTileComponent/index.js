import React from 'react';
import { Link } from 'gatsby';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import Image from '../Image';
import styles from './imagetile-component.module.scss';

const HasLink = ({ children, to }) => {
  if (to) {
    if (to.indexOf('http') !== -1) {
      return <a href={`${to}`}>{children}</a>;
    }
    return <Link to={`${to}`}>{children}</Link>;
  }
  return <>{children}</>;
};

/**
 * @param {object} ImageTile data
 */
const ImageTileComponent = ({ data }) => {
  const orientation = data.text_placement || 'Above';

  const backgroundImage = data.image
  && data.image.imageFile
  && data.image.imageFile.childImageSharp
  && data.image.imageFile.childImageSharp.fluid
    ? data.image.imageFile.childImageSharp.fluid.src
    : null;

  const divStyle = {
    color: '#FFF',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  switch (orientation) {
    case 'Above':
      return (
        <HasLink to={data.link}>
          <Container
            className="imageTile textAbove align-items-center d-flex flex-column"
          >
            {data.text ? <ReactMarkdown source={data.text} /> : null}
            <Image image={data.image} className="image" />
          </Container>
        </HasLink>
      );
    case 'Below':
      return (
        <HasLink to={data.link}>
          <Container
            className="imageTile textBelow align-items-center d-flex flex-column"
          >
            <Image image={data.image} className="image" />
            <div className={`${styles.captionBlock}`}>
              {data.text ? <ReactMarkdown source={data.text} /> : null}
            </div>
          </Container>
        </HasLink>
      );
    case 'Cover':
      return (
        <HasLink to={data.link}>
          <Container
            style={divStyle}
            className="imageTile textCover imageTileCover align-items-center justify-content-center d-flex flex-column"
          >
            {data.text ? <ReactMarkdown source={data.text} /> : null}
          </Container>
        </HasLink>
      );
    default:
      return '';
  }
};

export default ImageTileComponent;
