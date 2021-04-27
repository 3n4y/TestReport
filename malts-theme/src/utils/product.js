export const extractProductInfo = (product) => {
  const {
    id,
    title: name,
    variants = [],
    productType: category,
    vendor: brand,
  } = product;
  const [productVariant] = variants;
  const { id: variant, price } = productVariant || {};

  const productInfo = {
    id,
    name,
    price,
    brand,
    category,
    variant,
  };
  return Object.entries(productInfo).reduce(
    (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc), {},
  );
};

const currencyCodeMap = {
  'en-gb': 'GBP',
  'de-de': 'EUR',
};
export const getCurrencyCode = (i18n) => (
  i18n?.language ? { currencyCode: currencyCodeMap[i18n.language] } : {}
);
