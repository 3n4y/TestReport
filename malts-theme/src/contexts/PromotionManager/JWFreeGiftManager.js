import i18n from 'i18next';

const giftHandle = 'johnnie-walker-black-label-sample-5cl';
const allGiftCards = (liveProductData) => liveProductData.products.filter(
  (liveProduct) => liveProduct.handle.startsWith(i18n.t('gift-card')),
);

const JWFreeGiftManager = {
  giftHandle,

  eligibleForGift: (lineItems, isAuthenticated) => isAuthenticated && (lineItems.length > 0),

  lineItems: (lineItems, liveProductData) => {
    const allGiftCardVariantIDs = allGiftCards(liveProductData).map((giftCard) => {
      const giftCardVariantIDs = giftCard.variants.map((giftCardVariant) => giftCardVariant.id);
      return giftCardVariantIDs;
    });
    return lineItems.filter((lineItem) => {
      const variantId = lineItem.variant ? lineItem.variant.id : lineItem.variantId;
      return !allGiftCardVariantIDs.flat().includes(variantId);
    });
  },
};

export default JWFreeGiftManager;
