import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LineItem from '../../../../../src/components/Cart/LineItem';
import QuantityControl from '../../../../../src/components/QuantityControl';

let mockQuantityControl;
jest.mock('../../../../../src/components/QuantityControl', () => jest.fn().mockImplementation((props) => {
  mockQuantityControl = props;
  return 'QuantityControl Stub';
}));

// https://stackoverflow.com/a/60862815
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

const mockProductTags = [];
const mockProductMetafields = [];
const mockProduct = {
  tags: mockProductTags,
  metafields: mockProductMetafields,
};

const mockRemoveLineItem = jest.fn();
const mockUpdateLineItem = jest.fn();
const mockGetLiveProduct = jest.fn().mockImplementation(() => mockProduct);
jest.mock('../../../../../src/contexts/ShopifyContext', () => ({
  useShopify: () => ({
    getLiveProduct: mockGetLiveProduct,
    removeLineItem: mockRemoveLineItem,
    updateLineItem: mockUpdateLineItem,
  }),
}));

// https://blacksquare.atlassian.net/browse/MAL-333
jest.mock('../../../../../src/contexts/PromotionManager', () => ({
  giftHandles: ['test gift handle'],
}));

const testLineItem = {
  id: 42,
  variant: {
    image: {
      src: 'test src',
    },
    title: 'test variant title',
    price: '2',
    product: {
      handle: 'test handle',
    },
  },
  title: 'test title',
  quantity: '7',
  customAttributes: [],
};

const testLineItem2 = {
  id: 43,
  variant: {
    image: {
      src: 'test src',
    },
    title: 'test variant title',
    price: '2',
    compareAtPrice: '3',
    product: {
      handle: 'test handle',
    },
  },
  title: 'test title',
  quantity: '3',
  customAttributes: [],
};

describe('When LineItem component is rendered', () => {
  test('it shows product data correctly without Compare At Price', () => {
    // Arrange
    const expectedCurrencyAndCost = `Currency${(testLineItem.quantity * testLineItem.variant.price).toFixed(2)}`;

    // Act
    const { container } = render(<LineItem line_item={testLineItem} />);

    // Assert
    expect(screen.getByAltText('test title product shot')).toBeInTheDocument();
    expect(screen.getByAltText('test title product shot')).toHaveAttribute('src', expect.stringMatching('test src'));
    expect(screen.getByText('test title')).toBeInTheDocument();
    expect(screen.getByText(expectedCurrencyAndCost)).toBeInTheDocument();
    expect(container.querySelector('.productPreviousPrice')).toBeNull();
  });

  test('it shows product data correctly with Compare at Price', () => {
    // Arrange
    const expectedCurrencyAndCost = `Currency${(testLineItem2.quantity * testLineItem2.variant.price).toFixed(2)}`;
    const expectedCompareAtCurrencyAndCost = `Currency${(testLineItem2.quantity * testLineItem2.variant.compareAtPrice).toFixed(2)}`;

    // Act
    const { container } = render(<LineItem line_item={testLineItem2} />);

    // Assert
    expect(screen.getByAltText('test title product shot')).toBeInTheDocument();
    expect(screen.getByAltText('test title product shot')).toHaveAttribute('src', expect.stringMatching('test src'));
    expect(screen.getByText('test title')).toBeInTheDocument();
    expect(screen.getByText(expectedCurrencyAndCost)).toBeInTheDocument();
    expect(screen.getByText(expectedCompareAtCurrencyAndCost)).toBeInTheDocument();
    expect(container.querySelector('.productPreviousPrice')).toBeInTheDocument();
  });

  // Get the assertion below working as part of https://blacksquare.atlassian.net/browse/MAL-324
  // expect(screen.getByText('test variant title')).toBeInTheDocument()
  test.todo('it shows product variant data correctly');

  // Get the test below working as part of https://blacksquare.atlassian.net/browse/MAL-324
  test.skip('it does not show product variant data when the title of the line item variant is equal to "Default Title"', () => {
    // Arrange
    testLineItem.variant.title = 'Default Title';

    // Act
    render(<LineItem line_item={testLineItem} />);

    // Assert
    expect(screen.queryByText('Default Title')).not.toBeInTheDocument();
  });

  describe('when it is a preorder', () => {
    let mockPreOrderProduct;
    beforeEach(() => {
      mockPreOrderProduct = {
        tags: [{ value: 'preorder' }],
        metafields: [],
      };
    });

    test('it shows a correct preOrderNote when both additional message and replace buy button text are present', () => {
      // Arrange
      mockPreOrderProduct.metafields.push(
        { key: 'additionalmessagetext', value: 'test additionalmessagetext' },
        { key: 'replacebuybuttontext', value: 'test replacebuybuttontext' },
      );
      mockGetLiveProduct.mockReturnValue(mockPreOrderProduct);

      // Act
      render(<LineItem line_item={testLineItem} />);

      // Assert
      expect(screen.getByText('test replacebuybuttontext: test additionalmessagetext')).toBeInTheDocument();
    });

    test('it shows a correct preOrderNote when additional message is present and replace buy button text is not', () => {
      // Arrange
      mockPreOrderProduct.metafields.push(
        { key: 'additionalmessagetext', value: 'test additionalmessagetext' },
      );
      mockGetLiveProduct.mockReturnValue(mockPreOrderProduct);
      // Act
      render(<LineItem line_item={testLineItem} />);

      // Assert
      expect(screen.getByText('test additionalmessagetext')).toBeInTheDocument();
    });

    test('it shows a correct preOrderNote when additional message is not present and replace buy button text is', () => {
      // Arrange
      mockPreOrderProduct.metafields.push(
        { key: 'replacebuybuttontext', value: 'test replacebuybuttontext' },
      );
      mockGetLiveProduct.mockReturnValue(mockPreOrderProduct);
      // Act
      render(<LineItem line_item={testLineItem} />);

      // Assert
      expect(screen.getByText('test replacebuybuttontext')).toBeInTheDocument();
    });

    test('it shows a correct preOrderNote  when neither additional message text nor replace buy button text are present', () => {
      // Arrange
      mockGetLiveProduct.mockReturnValue(mockPreOrderProduct);
      // Act
      const { container } = render(<LineItem line_item={testLineItem} />);
      // Assert
      expect(container.querySelector('.productNote')).toBeNull();
    });
  });

  test('when it is a gift it does not render a QuantityControl component', () => {
    // Arrange
    testLineItem.variant.product.handle = 'test gift handle';

    // Act
    render(<LineItem line_item={testLineItem} />);

    // Assert
    expect(QuantityControl).not.toHaveBeenCalled();
  });

  describe('when it is not a gift', () => {
    beforeEach(() => {
      // Arrange
      testLineItem.variant.product.handle = 'something different to test gift handle';

      // Act
      render(<LineItem line_item={testLineItem} />);
    });

    // Assert
    test('it renders the QuantityControl component passes the correct props', () => {
      expect(QuantityControl).toHaveBeenCalledTimes(1);
      expect(mockQuantityControl.min).toEqual(1);
      expect(mockQuantityControl.max).toEqual(10);
      expect(mockQuantityControl.quantity).toEqual(testLineItem.quantity);
      // https://blacksquare.atlassian.net/browse/MAL-325 will create an assertion that mockQuantityControl.updateListener === updateQuantityHandler
    });

    test('it renders the remove item button which, when clicked, calls the correct functions with the correct arguments', () => {
      fireEvent.click(screen.getByText('×')); // This is coded as &times; in LineItem
      expect(mockRemoveLineItem).toHaveBeenCalledWith(testLineItem.id);
    });
  });

  test('when 3 decimal places are set in the variant price it shows the price to 2 decimal places', () => {
    // Arrange
    testLineItem.variant.price = '2.543';

    // Act
    render(<LineItem line_item={testLineItem} />);

    // Assert
    expect(screen.getByText('Currency17.80')).toBeInTheDocument();
  });

  describe('when the updateQuantityHandler function is called', () => {
    let updateQuantityHandler;

    beforeEach(() => {
      render(<LineItem line_item={testLineItem} />);
      updateQuantityHandler = mockQuantityControl.updateListener;
    });

    test('it does nothing when the new quantity === line item quantity', () => {
      // Arrange

      // Act
      updateQuantityHandler(testLineItem.quantity);

      // Assert
      expect(mockUpdateLineItem).not.toHaveBeenCalled();
    });

    test('it updates lineItem when the new quantity !== line item quantity', () => {
      // Arrange
      const quanityNotEqualToLineItemQuantity = parseInt(testLineItem.quantity, 10) + 1;

      // Act
      updateQuantityHandler(quanityNotEqualToLineItemQuantity);

      // Assert
      expect(mockUpdateLineItem)
        .toHaveBeenCalledWith(testLineItem.id, parseInt(testLineItem.quantity, 10) + 1);
    });
  });
});
