import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const FreeShippingLine = ({ region, totalPrice }) => {
  const { t } = useTranslation();

  /* Free shipping threshold per locale */
  const freeShippingThresholdByLocale = {
    'en-gb': 50,
    'de-de': 75,
  };
  const freeShippingThreshold = freeShippingThresholdByLocale[region] || 0;
  const freeShipmentAmount = (freeShippingThreshold - totalPrice).toFixed(2);
  const freeShipmentMessage = t('You are %1%2 away from Free Delivery').replace('%1', t('Currency')).replace('%2', freeShipmentAmount);

  return (
    <>
      { ['en-gb', 'de-de'].includes(region) && freeShipmentAmount > 0 ? (
        <p><strong>{freeShipmentMessage}</strong></p>
      ) : null}
    </>
  );
};

FreeShippingLine.propTypes = {
  region: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default FreeShippingLine;
