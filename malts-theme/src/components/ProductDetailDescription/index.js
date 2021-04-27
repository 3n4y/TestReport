import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

import styles from './product-detail-description.module.scss';

const ProductDetailDescription = ({ product }) => {
  const [viewReadMore, setViewReadMore] = useState(false);

  const { t } = useTranslation();

  if (product.detail_description) {
    return (
      <div className={styles.descriptionText}>
        {product.detail_description.length > 200 ? (
          <>
            {viewReadMore
              ? product.detail_description
              : `${product.detail_description.substring(0, 201)}...`}
            <span
              className={
                viewReadMore
                  ? 'read-more-less--more'
                  : 'read-more-less--less'
              }
              onClick={() => {
                setViewReadMore(!viewReadMore);
              }}
            >
              {viewReadMore ? `- ${t('LESS')}` : `+ ${t('MORE')}`}
            </span>
          </>
        ) : (
          product.detail_description
        )}
        <ReactMarkdown
          source={product.long_description}
          escapeHtml={false}
        />
      </div>
    );
  }
  return null;
};

export default ProductDetailDescription;
