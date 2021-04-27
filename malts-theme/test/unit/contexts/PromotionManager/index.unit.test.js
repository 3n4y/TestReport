import '@testing-library/jest-dom';
import { MappedLineItems } from '../../../../src/contexts/PromotionManager';

describe('PromotionManager', () => {
  test('MappedLineItems with live Product', () => {
    // Arrange
    const liveProductData = {
      products: [
        {
          id: 42,
          variants: [{
            id: 421,
            title: 'Tasty Whisky',
            price: '59.99',
            handle: 'tasty-whisky',
          }],
          tags: [{ value: 'Talisker' }, { value: 'Spicy' }],
          title: 'Tasty Whisky',
          quantity: '2',
          handle: 'tasty-whisky',
        }],
    };
    const lineItems = [
      {
        id: 42,
        quantity: 2,
        title: 'Tasty Whisky',
        handle: 'tasty-whisky',
        variant: {
          id: 421,
          price: 59.99,
          handle: 'tasty-whisky',
        },
      },
    ];
    // Act
    const mappedItems = MappedLineItems(lineItems, liveProductData);
    // Assert
    expect(mappedItems.length).toBe(1);
    expect(mappedItems[0].id).toBe(42);
    expect(mappedItems[0].variant_id).toBe(421);
    expect(mappedItems[0].quantity).toBe(2);
    expect(mappedItems[0].price).toBe('59.99');
    expect(mappedItems[0].handle).toBe('tasty-whisky');
  });

  test('MappedLineItems missing live Product', () => {
    // Arrange
    const liveProductData = {
      products: [
        {
          id: 42,
          variants: [{
            id: 421,
            title: 'Tasty Whisky',
            price: '59.99',
            handle: 'tasty-whisky',
          }],
          tags: [{ value: 'Talisker' }, { value: 'Spicy' }],
          title: 'Tasty Whisky',
          quantity: '2',
          handle: 'tasty-whisky',
        }],
    };
    const lineItems = [
      {
        id: 66,
        quantity: 1,
        variantId: 466,
      },
    ];
    // Act
    const mappedItems = MappedLineItems(lineItems, liveProductData);
    // Assert
    expect(mappedItems.length).toBe(1);
    expect(mappedItems[0].id).toBe(66);
    expect(mappedItems[0].variant_id).toBe(466);
    expect(mappedItems[0].quantity).toBe(1);
    expect(mappedItems[0].price).toBe(0);
    expect(mappedItems[0].handle).toBe('');
  });
});
