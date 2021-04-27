import { extractProductInfo, getCurrencyCode } from '../product';

// dataLayer.push({
//   'event':'ee-productImpression',
//   'ecommerce': {
//      'currencyCode': 'EUR',
//      'impressions': [{
//        'id':'ABC123',
//        'name':'Product Name',
//        'price':'15.00',
//        'brand':'Product Brand',
//        'category':'Product Category',
//        'position':0,
//        'list': 'Product list name'
//      }]
//   }
// })

const dataLayerProductImpression = (impressions, i18n) => ({
  event: 'ee-productImpression',
  ecommerce: {
    ...getCurrencyCode(i18n),
    impressions: [impressions].flat(),
  },
});

const buildProductImpression = (product, list, index) => {
  const extractedProduct = extractProductInfo(product);
  return {
    ...extractedProduct,
    position: index,
    list,
  };
};

export const productImpression = (products, list) => (dataLayer, i18n) => dataLayer.push(
  dataLayerProductImpression(products.map((product, index) => buildProductImpression(product, list, index)), i18n),
);
