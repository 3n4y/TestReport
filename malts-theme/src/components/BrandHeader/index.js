import React from 'react';
import HeaderComponent from 'malts-theme/src/components/HeaderComponent';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const BrandHeader = ({ brand }) => {
  const { t } = useTranslation();

  const headerData = brand && brand.content
    ? brand.content.filter(
      (component) => component.__typename === 'Strapi_ComponentContentHeader',
    )
    : null;

  if (headerData && headerData.length > 0) {
    return <HeaderComponent data={headerData[0]} />;
  }
  return (
    <HeaderComponent
      data={{ background_image: null, title: brand ? brand.name : t('Shop') }}
      stylea={{ backgroundColor: '#1F5B5E' }}
    />
  );
};

BrandHeader.propTypes = {
  brand: PropTypes.node.isRequired,
};

export default BrandHeader;
