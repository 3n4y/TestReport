const freeGiftSpendThreshold = 75.0;
const giftHandle = 'talisker-dry-bag-free-gift';

const totalSpend = (lineItems) => lineItems.reduce((total, lineItem) => {
  const lineItemCost = parseFloat(lineItem.price) * parseInt(lineItem.quantity, 10);
  return total + lineItemCost;
}, 0.0);

const TaliskerDryBagGift = {
  giftHandle,

  eligibleForGift: (lineItems) => totalSpend(lineItems) >= freeGiftSpendThreshold,

  lineItems: (lineItems, liveProductData) => lineItems.filter((lineItem) => {
    const variantId = lineItem.variant ? lineItem.variant.id : lineItem.variantId;
    return liveProductData.products.find(
      (product) => (product.tags.some((t) => t.value === 'Talisker') || product.vendor === 'Talisker') && product.variants.some((v) => v.id === variantId),
    );
  }),
};

export default TaliskerDryBagGift;
