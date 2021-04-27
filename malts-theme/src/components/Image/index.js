import React from 'react';
import Img from 'gatsby-image';
import { ReactSVG } from 'react-svg';
import ReactImageMagnify from 'react-image-magnify';

/**
 *
 * @param {object} Image data from fragment/FullFluidImage, SmallFixed or SmallFluid images
 *
 */
const Image = ({
  image, isZoomable, className, style,
}) => {
  if (!image) {
    return <div className={className} style={style} />;
  }
  const {
    alternativeText: alt, ext, height, width, imageFile,
  } = image || {};
  const { childImageSharp, publicURL } = imageFile || { childImageSharp: {} };
  const { fluid, fixed } = childImageSharp || {};
  if (isZoomable) {
    const { sizes = '', src = publicURL, srcSet = '' } = fixed || fluid || {};
    const img = {
      src,
      srcSet,
      sizes,
      alt,
    };
    return (
      <div className={className} style={style}>
        <ReactImageMagnify
          isHintEnabled
          shouldHideHintAfterFirstActivation={false}
          largeImage={{
            ...img,
            width,
            height,
          }}
          smallImage={{
            ...img,
            isFluidWidth: Boolean(fluid),
          }}
        />
      </div>
    );
  }

  if (ext === '.svg') {
    return (
      <div className={className} style={style}>
        <ReactSVG src={publicURL} alt={alt} />
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <Img
        fixed={fixed}
        fluid={fluid}
        alt={alt}
        style={{ maxHeight: '100%' }}
        imgStyle={{ objectFit: 'contain' }}
        loading="lazy"
      />
    </div>
  );
};

export default Image;
