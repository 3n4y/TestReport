import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import FreeShippingLine from '../../../../../src/components/Cart/FreeShippingLine';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));
describe('Free shipping line in cart', () => {
  const freeShippingThresholdGB = 50.00;
  const freeShippingThresholdDE = 75.00;

  describe('When in valid region and below free shipping threshold component is rendered', () => {
    test('the remaining amount is displayed correctly for en-gb', () => {
      // Arrange

      const totalPrice = 23.07;
      const freeShipmentAmount = (freeShippingThresholdGB - totalPrice).toFixed(2);
      const remainingAmount = `You are Currency${freeShipmentAmount} away from Free Delivery`;
      // Act
      render(<FreeShippingLine region="en-gb" totalPrice={totalPrice} />);

      // Assert
      expect(screen.getByText(remainingAmount)).toBeInTheDocument();
    });

    test('the remaining amount is displayed correctly for de-de', () => {
      // Arrange
      const totalPrice = 69.99;
      const freeShipmentAmount = (freeShippingThresholdDE - totalPrice).toFixed(2);
      const remainingAmount = `You are Currency${freeShipmentAmount} away from Free Delivery`;
      // Act
      render(<FreeShippingLine region="de-de" totalPrice={totalPrice} />);

      // Assert
      expect(screen.getByText(remainingAmount)).toBeInTheDocument();
    });
  });

  describe('When in valid region and above free shipping threshold component is not rendered', () => {
    test('the remaining amount is not displayed for en-gb', () => {
      // Arrange
      const totalPrice = 100.00;
      const freeShipmentAmount = (freeShippingThresholdGB - totalPrice).toFixed(2);
      const remainingAmount = `You are Currency${freeShipmentAmount} away from Free Delivery`;
      // Act
      render(<FreeShippingLine region="en-gb" totalPrice={totalPrice} />);

      // Assert
      expect(screen.queryByText(remainingAmount)).not.toBeInTheDocument();
    });

    test('the remaining amount is not displayed for de-de', () => {
      // Arrange
      const totalPrice = 100.00;
      const freeShipmentAmount = (freeShippingThresholdDE - totalPrice).toFixed(2);
      const remainingAmount = `You are Currency${freeShipmentAmount} away from Free Delivery`;
      // Act
      render(<FreeShippingLine region="de-de" totalPrice={totalPrice} />);

      // Assert
      expect(screen.queryByText(remainingAmount)).not.toBeInTheDocument();
    });
  });

  describe('When in invalid region and below free shipping threshold component is not rendered', () => {
    test('the remaining amount is not displayed for en-row', () => {
      // Arrange
      const totalPrice = 23.07;
      const freeShipmentAmount = (freeShippingThresholdGB - totalPrice).toFixed(2);
      const remainingAmount = `You are Currency${freeShipmentAmount} away from Free Delivery`;
      // Act
      render(<FreeShippingLine region="en-row" totalPrice={totalPrice} />);

      // Assert
      expect(screen.queryByText(remainingAmount)).not.toBeInTheDocument();
    });
  });
});
