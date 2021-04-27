import React from 'react';
import { useTranslation } from 'react-i18next';
import { useShopify } from '../../contexts/ShopifyContext';
import styles from './addtocartbutton-component.module.scss';

const AddToCart = ({ variantID, onClickHandler, availableInventory }) => {
  const { t } = useTranslation();
  const buttonText = availableInventory > 0 ? t('Add to Basket') : t('Sold out');

  return (
    <div className="formAddToCart">
      <button
        className={`btn btn-primary ${styles.addtocart}`}
        onClick={() => onClickHandler(variantID, 1)}
        disabled={availableInventory < 1}
      >
        {buttonText}
      </button>
    </div>
  );
};

const PreOrder = ({ variantID, onClickHandler, availableInventory }) => {
  const { t } = useTranslation();
  const buttonText = availableInventory > 0 ? t('Pre-Order') : t('Sold out');

  return (
    <div className="formAddToCart">
      <button
        className={`btn btn-primary addtocart ${styles.preorder}`}
        onClick={() => onClickHandler(variantID, 1)}
        disabled={availableInventory < 1}
      >
        {buttonText}
      </button>
    </div>
  );
};

const AddToCartButton = ({ productID }) => {
  const {
    dispatch,
    fetching,
    addVariantToCart,
    getLiveProduct,
  } = useShopify();

  const product = getLiveProduct(productID);

  function addToCart(variantID, qty) {
    addVariantToCart(variantID, qty);
    dispatch({ type: 'openCart' });
  }
  if (product) {
    const [firstVariant] = product.variants;
    const { availableForSale } = product;

    const isPreOrder = product.tags.map((t) => t.value).includes('preorder');

    return (
      <div className={`d-flex flex-column ${fetching ? 'fetching' : ''}`}>
        {availableForSale ? (
          <div className={`tileAddToCartButton ${isPreOrder ? 'preorder' : ''}`}>
            {isPreOrder ? (
              <PreOrder
                variantID={firstVariant.id}
                onClickHandler={addToCart}
                availableInventory={10}
              />
            ) : (
              <AddToCart
                variantID={firstVariant.id}
                onClickHandler={addToCart}
                availableInventory={10}
              />
            )}
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div className={`d-flex flex-column ${fetching ? 'fetching' : ''}`} />
  );
};

export default AddToCartButton;
