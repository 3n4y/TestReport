import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useShopify } from '../../../contexts/ShopifyContext';
import styles from './line-item.module.scss';
import QuantityControl from '../../QuantityControl';
import { giftHandles } from '../../../contexts/PromotionManager';

const LineItem = ({ line_item }) => {
  const { t } = useTranslation();
  const { removeLineItem, updateLineItem, getLiveProduct } = useShopify();

  const variantImage = line_item.variant.image ? (
    <img
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
      height={50}
    />
  ) : null;

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
      (option) => `${option.name}: ${option.value} `,
    )
    : null;

  const product = getLiveProduct(line_item.variant.product.handle);

  const handleRemove = () => {
    removeLineItem(line_item.id);
  };

  const updateQuantityHandler = (newQuantity) => {
    if (newQuantity !== line_item.quantity) {
      updateLineItem(line_item.id, newQuantity);
    }
  };

  const isPreOrder = product && product.tags.map((tag) => tag.value).includes('preorder');
  const productMetafields = product ? product.metafields : [];
  const additionalMessageText = productMetafields.find((mf) => mf.key === 'additionalmessagetext')?.value;
  const buttonReplacemenText = productMetafields.find((mf) => mf.key === 'replacebuybuttontext')?.value;
  let preOrderNote = '';
  if (buttonReplacemenText) {
    preOrderNote = buttonReplacemenText;
    if (additionalMessageText) {
      preOrderNote += `: ${additionalMessageText}`;
    }
  } else if (additionalMessageText) {
    preOrderNote = additionalMessageText;
  }

  return (
    <div className={styles.wrapper} style={{ flexDirection: 'column' }}>

      <Row className="container" style={{ alignItems: 'start' }}>
        <Col xs="2" className="p-0">
          {variantImage}
        </Col>
        <Col xs="10" className="p-0">
          <span className={styles.productTitle}>
            {line_item.title}
            {'  '}
            {line_item.variant.title === !'Default Title'
              ? line_item.variant.title
              : ''}
          </span>
          <Row className="m-0">
            <Col xs="8" className="p-0">
              <span className={styles.productOptions}>{selectedOptions}</span>
              <div className={styles.customAttributes}>
                {line_item.customAttributes.map(({ key, value }) => (
                  <span key={`${key}-${value}`} className="customAttribute">
                    {key}
                    :
                    {value}
                  </span>
                ))}
              </div>
            </Col>
            <Col xs="4" className="p-0">
              <span
                className={styles.productPrice}
                style={{ textAlign: 'right' }}
              >
                {t('Currency')}
                {(line_item.variant.price * line_item.quantity).toFixed(2)}
              </span>
              { line_item.variant.compareAtPrice
                && (
                <span
                  className={styles.productPreviousPrice}
                  style={{ textAlign: 'right' }}
                >
                  {t('Currency')}
                  {(line_item.variant.compareAtPrice * line_item.quantity).toFixed(2)}
                </span>
                )}
            </Col>
          </Row>

        </Col>
      </Row>

      { isPreOrder && preOrderNote
        && (
        <Row className="m-0">
          <Col xs="12" className="p-0">
            <span
              className={`pl-3 pb-2 ${styles.productNote}`}
            >
              {preOrderNote}
            </span>
          </Col>
        </Row>
        )}

      { !giftHandles.includes(line_item.variant.product.handle) ? (
        <Row className="container">
          <Col xs="10" className="mt-2 mx-0">
            <QuantityControl
              quantity={line_item.quantity}
              min={1}
              max={10 /* need inventory access */}
              updateListener={updateQuantityHandler}
            />
          </Col>
          <Col xs="2" className="text-right p-0 mr-0">
            <button
              className={`btn btn-primary ${styles.removeItem}`}
              onClick={handleRemove}
            >
              &times;
            </button>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default LineItem;
