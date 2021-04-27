import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QuantityControl from '../../../components/QuantityControl';
import styles from '../../../components/ShopifyForm/shopify-form-component.module.scss';
import { useShopify } from '../../ShopifyContext';

export const PreorderPromotion = {
  hasCustomPurchaseFormFor: (product) => product.tags.map((t) => t.value).includes('preorder'),
  CustomPurchaseForm: (
    {
      product, variantID, onClickHandler, availableInventory, hidden,
    },
  ) => {
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState(1);
    const { getLiveProduct } = useShopify();
    const buttonText = availableInventory > 0 ? t('Pre-Order') : t('Sold Out');
    const shopifyProduct = getLiveProduct(product.slug);
    const productMetafields = shopifyProduct?.metafields;
    const additionalMessageText = productMetafields?.find((mf) => mf.key === 'additionalmessagetext')?.value;
    if (hidden) {
      return null;
    }
    return (
      <>
        <div className={styles.formAddToCart}>
          <QuantityControl
            max={availableInventory}
            min={1}
            quantity={quantity}
            updateListener={(newQuantity) => setQuantity(newQuantity)}
          />
          <button
            className={`btn btn-primary ${styles.addtocart}`}
            onClick={() => onClickHandler(variantID, quantity)}
            disabled={availableInventory < 1}
          >
            {buttonText}
          </button>
        </div>
        {additionalMessageText ? (
          <div className={`my-3 p-3 ${styles.preorderMessage}`}>
            {additionalMessageText}
          </div>
        ) : null}
      </>
    );
  },
};
