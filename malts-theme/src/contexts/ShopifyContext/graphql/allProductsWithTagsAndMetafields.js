const allProductsWithTagsAndMetafields = (root) => {
  root.addConnection('products', { args: { first: 250 } }, (product) => {
    product.add('id');
    product.add('availableForSale');
    product.add('createdAt');
    product.add('updatedAt');
    product.add('descriptionHtml');
    product.add('description');
    product.add('handle');
    product.add('productType');
    product.add('tags');
    product.add('title');
    product.add('vendor');
    product.add('publishedAt');
    product.add('onlineStoreUrl');
    product.add('options', (option) => {
      option.add('name');
      option.add('values');
    });
    product.addConnection('images', { args: { first: 250 } }, (image) => {
      image.add('id');
      image.add('src');
      image.add('altText');
    });
    product.addConnection('variants', { args: { first: 250 } }, (variant) => {
      variant.add('id');
      variant.add('title');
      variant.add('price');
      variant.add('weight');
      variant.add('availableForSale', { alias: 'available' });
      variant.add('sku');
      variant.add('compareAtPrice');
      variant.add('priceV2', (priceV2) => {
        priceV2.add('amount');
        priceV2.add('currencyCode');
      });
      variant.addConnection('presentmentPrices', { args: { first: 20 } }, (presentmentPrice) => {
        presentmentPrice.add('price', (price) => {
          price.add('amount');
          price.add('currencyCode');
        });
        presentmentPrice.add('compareAtPrice', (compareAtPrice) => {
          compareAtPrice.add('amount');
          compareAtPrice.add('currencyCode');
        });
      });
      variant.add('compareAtPriceV2', (compareAtPriceV2) => {
        compareAtPriceV2.add('amount');
        compareAtPriceV2.add('currencyCode');
      });
      variant.add('image', (image) => {
        image.add('id');
        image.add('originalSrc', { alias: 'src' });
        image.add('altText');
      });
      variant.add('selectedOptions', (selectedOption) => {
        selectedOption.add('name');
        selectedOption.add('value');
      });
      variant.add('unitPrice', (unitPrice) => {
        unitPrice.add('amount');
        unitPrice.add('currencyCode');
      });
      variant.add('unitPriceMeasurement', (unitPriceMeasurement) => {
        unitPriceMeasurement.add('measuredType');
        unitPriceMeasurement.add('quantityUnit');
        unitPriceMeasurement.add('quantityValue');
        unitPriceMeasurement.add('referenceUnit');
        unitPriceMeasurement.add('referenceValue');
      });
    });
    product.addConnection('metafields', { args: { first: 50 } }, (metafield) => {
      metafield.add('key');
      metafield.add('value');
      metafield.add('namespace');
    });
  });
};
export default allProductsWithTagsAndMetafields;
