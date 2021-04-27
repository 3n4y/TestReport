import { extractProductInfo, getCurrencyCode } from '../product';
// dataLayer.push({
//   event: "ee-addToCart",
//   ecommerce: {
//     'currencyCode': 'EUR',
//     add: {
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

const dataLayerProductAddToCart = (product, i18n) => ({
  event: 'ee-addToCart',
  ecommerce: {
    ...getCurrencyCode(i18n),
    add: {
      products: [product],
    },
  },
});
const buildProductAddToCart = (product, quantity = 1) => {
  const extractedProduct = extractProductInfo(product);
  return {
    ...extractedProduct,
    quantity,
    // position: 0,
    position: undefined,
  };
};

export const productAddToCart = (product, quantity = 1) => (dataLayer, i18n) => dataLayer.push(
  dataLayerProductAddToCart(
    buildProductAddToCart(product, quantity),
    i18n,
  ),
);
