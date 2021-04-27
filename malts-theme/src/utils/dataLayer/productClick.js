import { extractProductInfo, getCurrencyCode } from '../product';
// dataLayer.push({
//   event: "ee-productClick",
//   ecommerce: {
//     currencyCode: 'EUR',
//     click: {
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

const dataLayerProductClick = ({ list, product }, i18n) => ({
  event: 'ee-productClick',
  ecommerce: {
    ...getCurrencyCode(i18n),
    click: {
      actionField: {
        list,
      },
    },
    products: [product],
  },
});
const buildProductClick = (product) => {
  const extractedProduct = extractProductInfo(product);
  return {
    product: {
      ...extractedProduct,
      position: 0,
    },
    // list: "Product Click Tile",
    list: undefined,
  };
};

export const productClick = (product) => (dataLayer, i18n) => dataLayer.push(
  dataLayerProductClick(
    buildProductClick(product),
    i18n,
  ),
);
