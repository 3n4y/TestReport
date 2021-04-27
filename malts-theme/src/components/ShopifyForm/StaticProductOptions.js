import React from 'react';
import styles from './shopify-form-component.module.scss';

const StaticProductOptions = ({ product, hidden }) => {
  if (hidden) {
    return null;
  }

  const staticOptions = product.options.filter(
    (productOption) => productOption.values.length === 1,
  );

  return (
    <div className="productOptions">
      {staticOptions.map((staticOption) => (
        <span
          className={styles.productOption}
          key={staticOption.values[0].value}
        >
          {staticOption.values[0].value}
        </span>
      ))}
      <div className={`d-md-block ${styles.dividerBlock}`} />
    </div>
  );
};

export default StaticProductOptions;
