import { getCurrencyCode } from '../product';
// "event':'ee-promoClick',
// 'ecommerce':{
//  'currencyCode': 'EUR', //GBP for en-gb site
//   'promoClick':{
//     'promotions':[{
//       'id':'got_promo30', //unique id for promo
//       'name':'GOT 30 off', //id or name required
//       'creative':'Lanister banner',
//       'position':'homepage hero' //e.g. slot location on page
//     }]
//   }
// }"

const dataLayerPromoClick = (promo, i18n) => ({
  event: 'ee-promoClick',
  ecommerce: {
    ...getCurrencyCode(i18n),
    promoClick: {
      promotions: [promo],
    },
  },
});

export const promoClick = (promo) => (dataLayer, i18n) => dataLayer.push(dataLayerPromoClick(promo, i18n));
