import React from 'react';
import styles from './quantity-control.module.scss';

const QuantityControl = ({
  quantity, min, max, updateListener,
}) => {
  const updateQuantity = (newQuantity) => {
    if (newQuantity <= max && newQuantity >= min) {
      updateListener(newQuantity);
    }
  };

  return (
    <span className={`tileQuantity ${styles.quantityControl}`}>
      <button className="btn btn-gray" onClick={() => updateQuantity(quantity - 1)}>-</button>
      <span>{quantity}</span>
      <button className="btn btn-gray" onClick={() => updateQuantity(quantity + 1)}>+</button>
    </span>
  );
};

export default QuantityControl;
