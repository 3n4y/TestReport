import React, { useState, useEffect } from 'react';
import styles from './shopify-form-component.module.scss';

const DynamicProductOptions = ({ product, updateHandler, hidden }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    product.options.reduce((initialOptions, productOption) => {
      const [firstOptionValue] = productOption.values;
      return {
        ...initialOptions,
        [productOption.name]: firstOptionValue.value,
      };
    }, {}),
  );

  useEffect(() => {
    updateHandler(selectedOptions);
  }, [selectedOptions, updateHandler]);

  if (hidden) {
    return null;
  }

  const onChangeHandler = (e) => {
    const updatedOption = e.target;
    setSelectedOptions((previousOptions) => (
      { ...previousOptions, [updatedOption.name]: updatedOption.value }
    ));
  };

  const dynamicProductOptions = product.options.filter(
    (productOption) => productOption.values.length > 1,
  );

  return (
    <div className={`productOptions ${styles.productOptions}`} onChange={onChangeHandler}>
      {dynamicProductOptions.map((dynamicProductOption) => (
        <React.Fragment key={dynamicProductOption.name}>
          <h4>
            {dynamicProductOption.name}
            :
          </h4>
          <div className="productOptionValues">
            {dynamicProductOption.values.map((optionValue, i) => (
              <React.Fragment key={`${dynamicProductOption.name}${i}`}>
                <label htmlFor={`${dynamicProductOption.name}${i}`}>
                  {optionValue.value}
                </label>
                <input
                  type="radio"
                  id={`${dynamicProductOption.name}${i}`}
                  name={dynamicProductOption.name}
                  value={optionValue.value}
                  defaultChecked={i === 0}
                />
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DynamicProductOptions;
