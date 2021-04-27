import i18n from 'i18next';

const freeGiftSpendThreshold = 100.0;
const giftHandle = 'talisker-multipack-kostenloses-geschenk';

const allGiftCards = (liveProductData) => liveProductData.products.filter(
  (liveProduct) => liveProduct.handle.startsWith(i18n.t('gift-card')),
);

const totalSpend = (lineItems) => lineItems.reduce((total, lineItem) => {
  const lineItemCost = parseFloat(lineItem.price) * parseInt(lineItem.quantity, 10);
  return total + lineItemCost;
}, 0.0);

const TaliskerMultiPackFreeGiftManager = {

  giftHandle,

  eligibleForGift: (lineItems) => totalSpend(lineItems) >= freeGiftSpendThreshold,

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

export default TaliskerMultiPackFreeGiftManager;
