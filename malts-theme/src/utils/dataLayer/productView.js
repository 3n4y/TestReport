import { extractProductInfo, getCurrencyCode } from '../product';
// dataLayer.push({
//   event: "ee-productView",
//   ecommerce: {
//     'currencyCode': 'EUR',
//     detail: {
//       actionField: {
//         list: "Product list name",
//       },
//       products: [
//         {
//           id: "ABC123",
//           name: "Product Name",
//           price: "15.00",
//           brand: "Product Brand",
//           category: "Product Category",
//           position: 0,
//         },
//       ],
//     },
//   },
// })

const dataLayerProductView = ({ list, product }, i18n) => ({
  event: 'ee-productView',
  ecommerce: {
    ...getCurrencyCode(i18n),
    detail: {
      actionField: {
        list,
      },
      products: [product],
    },
  },
});
const buildProductView = (product) => {
  const extractedProduct = extractProductInfo(product);
  return {
    product: {
      ...extractedProduct,
      // position: 0,
      position: undefined,
    },
    // list: "Product View Item",
    list: undefined,
  };
};

export const productView = (product) => (dataLayer, i18n) => dataLayer.push(
  dataLayerProductView(
    buildProductView(product),
    i18n,
  ),
);
