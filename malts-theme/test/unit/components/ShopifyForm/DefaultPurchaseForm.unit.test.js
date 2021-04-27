import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import DefaultPurchaseForm from '../../../../src/components/ShopifyForm/DefaultPurchaseForm';
import QuantityControlMock from '../../../../src/components/QuantityControl';

const mockGetLiveProduct = jest.fn();
jest.mock('../../../../src/contexts/ShopifyContext', () => ({
  useShopify: () => ({
    getLiveProduct: mockGetLiveProduct,
  }),
}));

const mockTranslate = jest.fn((word) => word);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockTranslate,
  }),
}));

jest.mock('../../../../src/components/QuantityControl', () => jest.fn(() => null));

describe('DefaultPurchaseForm', () => {
  const productSlug = 'test-slug';
  const product = { slug: productSlug };
  const variantID = 'test-variant-id';
  const onClickHandler = jest.fn();
  const mockAdditionalMessageText = 'test-additional-message-text';
  const mockMetafieldsShopifyProduct = {
    metafields: [
      { key: 'additionalmessagetext', value: mockAdditionalMessageText },
    ],
  };

  let availableInventory;

  describe('when availableInventory is > 0', () => {
    beforeEach(() => {
      availableInventory = 1;
      render(
        <DefaultPurchaseForm
          {...{
            product, variantID, onClickHandler, availableInventory,
          }}
        />,
      );
    });

    test('it changes the button text from "Sold Out" to "Add to Basket"', () => {
      expect(screen.queryByText('Add to Basket')).toBeInTheDocument();
      expect(screen.queryByText('Sold Out')).not.toBeInTheDocument();
    });

    test('it enables the Add to Basket button', () => {
      expect(screen.queryByText('Add to Basket').closest('button')).not.toBeDisabled();
    });

    test('it requests a translation for Add to Basket', () => {
      expect(mockTranslate).toHaveBeenCalledWith('Add to Basket');
    });

    describe('when Add to Basket button is clicked', () => {
      beforeEach(() => {
        fireEvent.click(screen.queryByText('Add to Basket'));
      });
      test('it invokes onClickHandler', () => {
        const expectedQuantity = 1;
        expect(onClickHandler).toHaveBeenCalledWith(variantID, expectedQuantity);
      });
    });
  });

  describe('when availableInventory is 0', () => {
    beforeEach(() => {
      availableInventory = 0;
      render(
        <DefaultPurchaseForm
          {...{
            product, variantID, onClickHandler, availableInventory,
          }}
        />,
      );
    });

    test('it changes the button text from "Add to Basket" to "Sold Out"', () => {
      expect(screen.queryByText('Add to Basket')).not.toBeInTheDocument();
      expect(screen.queryByText('Sold Out')).toBeInTheDocument();
    });

    test('it disables the Sold Out button', () => {
      expect(screen.queryByText('Sold Out').closest('button')).toBeDisabled();
    });

    test('it requests a translation for Sold Out', () => {
      expect(mockTranslate).toHaveBeenCalledWith('Sold Out');
    });
  });

  describe('when product has additionalmessagetext metafield', () => {
    beforeEach(() => {
      mockGetLiveProduct.mockImplementationOnce(() => mockMetafieldsShopifyProduct);
      render(
        <DefaultPurchaseForm
          {...{
            product, variantID, onClickHandler, availableInventory,
          }}
        />,
      );
    });
    test('it displays additionalmessagetext', () => {
      expect(screen.queryByText(mockAdditionalMessageText)).toBeInTheDocument();
    });
  });

  describe('always', () => {
    beforeEach(() => {
      availableInventory = 1;
      render(
        <DefaultPurchaseForm
          {...{
            product, variantID, onClickHandler, availableInventory,
          }}
        />,
      );
    });

    test('it requests the live product', () => {
      expect(mockGetLiveProduct).toHaveBeenCalledWith(productSlug);
    });

    test('creates QuantityControl with expected props', () => {
      const expectedMin = 1;
      const expectedQuantity = 1;
      const expectedProps = {
        max: availableInventory,
        min: expectedMin,
        quantity: expectedQuantity,
        updateListener: expect.any(Function),
      };
      const expectedContext = {};
      expect(QuantityControlMock).toHaveBeenCalledWith(
        expectedProps,
        expectedContext,
      );
    });
  });
});
