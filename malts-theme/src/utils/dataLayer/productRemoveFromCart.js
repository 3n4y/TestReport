import { extractProductInfo, getCurrencyCode } from '../product';

// dataLayer.push({
//   event: "ee-removeFromCart",
//   ecommerce: {
//     'currencyCode': 'EUR',
//     remove: {
//       products: [
//         {
//           id: "ABC123",
//           name: "Product Name",
//           price: "15.00",
//           brand: "Product Brand",
//           category: "Product Category",
//           variant: "Product Variant",
//           position: 0,
//           quantity: 1,
//         },
//       ],
//     },
//   },
// })

const dataLayerProductRemoveFromCart = (product, i18n) => ({
  event: 'ee-removeFromCart',
  ecommerce: {
    ...getCurrencyCode(i18n),
    remove: {
      products: [product],
    },
  },
});
const buildProductRemoveFromCart = (product, quantity = 1) => {
  const extractedProduct = extractProductInfo(product);
  return {
    ...extractedProduct,
    quantity,
    // position: 0,
    position: undefined,
  };
};

export const productRemoveFromCart = (product, quantity = 1) => (dataLayer, i18n) => dataLayer.push(
  dataLayerProductRemoveFromCart(
    buildProductRemoveFromCart(product, quantity),
    i18n,
  ),
);
