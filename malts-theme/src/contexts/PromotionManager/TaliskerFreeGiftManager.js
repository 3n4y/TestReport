const freeGiftSpendThreshold = 70.0;
const giftHandle = 'talisker-bag-free-gift';

const totalSpend = (lineItems) => lineItems.reduce((total, lineItem) => {
  const lineItemCost = parseFloat(lineItem.price) * parseInt(lineItem.quantity, 10);
  return total + lineItemCost;
}, 0.0);

const TaliskerFreeGiftManager = {
  giftHandle,

  eligibleForGift: (lineItems) => totalSpend(lineItems) >= freeGiftSpendThreshold,

  lineItems: (lineItems, liveProductData) => lineItems.filter((lineItem) => {
    const variantId = lineItem.variant ? lineItem.variant.id : lineItem.variantId;
    return liveProductData.products.find(
      (product) => product.tags.map((t) => t.value).includes('Talisker') && product.variants.map((t) => t.id).includes(variantId),
    );
  }),
};

export default TaliskerFreeGiftManager;
