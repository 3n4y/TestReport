import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PreorderPromotion } from '../../../../../src/contexts/PromotionManager/PreorderPromotion/index';
import QuantityControlMock from '../../../../../src/components/QuantityControl';

const mockGetLiveProduct = jest.fn();
jest.mock('../../../../../src/contexts/ShopifyContext', () => ({
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

jest.mock('../../../../../src/components/QuantityControl', () => jest.fn(() => null));

const productSlug = 'test-slug';

describe('#hasCustomPurchaseFormFor', () => {
  let testProduct;
  const testResultFor = (product) => PreorderPromotion.hasCustomPurchaseFormFor(product);

  describe('when product has a preorder tag', () => {
    beforeEach(() => {
      testProduct = {
        slug: productSlug,
        tags: [{ key: 'test-tag-type', value: 'preorder' }],
      };
    });
    test('it returns true', () => {
      expect(testResultFor(testProduct)).toBe(true);
    });
  });

  describe('when product does not have a preorder tag', () => {
    beforeEach(() => {
      testProduct = {
        slug: productSlug,
        tags: [],
      };
    });

    test('it returns false', () => {
      expect(testResultFor(testProduct)).toBe(false);
    });
  });
});

describe('#CustomPurchaseForm', () => {
  const { CustomPurchaseForm } = PreorderPromotion;
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
        <CustomPurchaseForm
          {...{
            product, variantID, onClickHandler, availableInventory,
          }}
        />,
      );
    });

    test('it changes the button text from "Sold Out" to "Pre-Order"', () => {
      expect(screen.queryByText('Pre-Order')).toBeInTheDocument();
      expect(screen.queryByText('Sold Out')).not.toBeInTheDocument();
    });

    test('it enables the Pre-Order button', () => {
      expect(screen.queryByText('Pre-Order').closest('button')).not.toBeDisabled();
    });

    test('it requests a translation for Pre-Order', () => {
      expect(mockTranslate).toHaveBeenCalledWith('Pre-Order');
    });

    describe('when Pre-Order button is clicked', () => {
      beforeEach(() => {
        fireEvent.click(screen.queryByText('Pre-Order'));
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
        <CustomPurchaseForm
          {...{
            product, variantID, onClickHandler, availableInventory,
          }}
        />,
      );
    });

    test('it changes the button text from "Pre-Order" to "Sold Out"', () => {
      expect(screen.queryByText('Pre-Order')).not.toBeInTheDocument();
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
        <CustomPurchaseForm
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
        <CustomPurchaseForm
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
