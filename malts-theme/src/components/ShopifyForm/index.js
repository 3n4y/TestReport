import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useShopify } from '../../contexts/ShopifyContext';
import styles from './shopify-form-component.module.scss';
import {
  giftHandles,
  customPurchaseFormFor,
} from '../../contexts/PromotionManager';
import DefaultPurchaseForm from './DefaultPurchaseForm';
import StaticProductOptions from './StaticProductOptions';
import DynamicProductOptions from './DynamicProductOptions';

const ShopifyForm = ({ product, priceOnly = false }) => {
  const { t } = useTranslation();

  const {
    dispatch,
    fetching,
    cart: { checkout },
    addVariantToCart,
    getLiveProduct,
  } = useShopify();

  const formatPrice = (price) => Intl.NumberFormat(undefined, {
    // undefined or region code?
    currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price || 0));

  const shopifyProduct = getLiveProduct(product.slug);
  const [selectedVariant, setSelectedVariant] = useState({});
  const optionsUpdateHandler = (newSelectedOptions) => {
    const matchingVariant = shopifyProduct.variants.find(
      (variant) => variant.selectedOptions.every(
        (selectedOption) => newSelectedOptions[selectedOption.name] === selectedOption.value,
      ),
    );
    setSelectedVariant(matchingVariant);
  };

  const addToCart = useCallback(
    (variantID, qty, customAttributes = []) => {
      addVariantToCart(variantID, qty, customAttributes);
      dispatch({ type: 'openCart' });
    }, [addVariantToCart, dispatch],
  );

  const [purchaseForm, setPurchaseForm] = useState(
    <DefaultPurchaseForm
      hidden={priceOnly}
      product={product}
      variantID={selectedVariant.id}
      onClickHandler={addToCart}
      availableInventory={10}
    />,
  );

  useEffect(() => {
    if (shopifyProduct) {
      const NewPurchaseForm = customPurchaseFormFor(
        shopifyProduct,
        selectedVariant.id,
      ) || DefaultPurchaseForm;

      setPurchaseForm(
        <NewPurchaseForm
          hidden={priceOnly}
          product={product}
          variantID={selectedVariant.id}
          onClickHandler={addToCart}
          availableInventory={10}
        />,
      );
    }
  }, [selectedVariant, shopifyProduct, product, addToCart, priceOnly]);

  if (giftHandles.includes(product.slug)) {
    return null;
  }

  if (shopifyProduct) {
    const formattedPrice = formatPrice(selectedVariant.price);
    const formattedPreviousPrice = selectedVariant.compareAtPrice
                                   && formatPrice(selectedVariant.compareAtPrice);
    const { availableForSale } = shopifyProduct;
    const productMetafields = shopifyProduct.metafields;
    const replacedeliverynoticetext = productMetafields.find(
      (mf) => mf.key === 'replacedeliverynoticetext',
    )?.value || t('*Delivery calculated at checkout');

    const clickableLinks = productMetafields.find(
      (mf) => mf.key === 'clickablelinks',
    )?.value || null;

    return (
      <div className={`shopifyForm d-flex flex-column ${fetching ? 'fetching' : ''}`}>
        <StaticProductOptions
          product={shopifyProduct}
          hidden={priceOnly}
        />
        <span className={styles.price}>
          {formattedPrice}
          {' '}
          {formattedPreviousPrice ? (
            <span className={`${styles.limitedtimeofferNote} ${styles.price}`}>
              {t('Limited time offer')}
            </span>
          ) : null}
        </span>
        {formattedPreviousPrice ? (
          <span className={styles.pricePrevious}>{formattedPreviousPrice}</span>
        ) : null}

        <p className={styles.deliveryNote}>{replacedeliverynoticetext}</p>

        {clickableLinks && !priceOnly ? (
          <p><div dangerouslySetInnerHTML={{ __html: clickableLinks }} /></p>
        ) : null}

        <DynamicProductOptions
          product={shopifyProduct}
          updateHandler={optionsUpdateHandler}
          hidden={priceOnly}
        />

        {availableForSale
          ? (purchaseForm)
          : (<span className={`${styles.unavailable}`}>{t('Out of Stock')}</span>)}
      </div>
    );
  }
  return (
    <div className={`d-flex flex-column ${fetching ? 'fetching' : ''}`} />
  );
};

export default ShopifyForm;
