import { getCurrencyCode } from '../product';
// "event':'ee-promoImpression',
// 'ecommerce':{
//  'currencyCode': 'EUR', //GBP for en-gb site
//   'promoView':{
//     'promotions':[{
//       'id':'got_promo30', //unique id for promo
//       'name':'GOT 30 off', //id or name required
//       'creative':'Lanister banner',
//       'position':'homepage hero' //e.g. slot location on page
//     }]
//   }
// }"

const dataLayerPromoImpression = (promotions, i18n) => ({
  event: 'ee-promoImpression',
  ecommerce: {
    ...getCurrencyCode(i18n),
    promoView: {
      promotions,
    },
  },
});

export const promoImpression = (promotions) => (dataLayer, i18n) => dataLayer.push(
  dataLayerPromoImpression(promotions, i18n),
);
