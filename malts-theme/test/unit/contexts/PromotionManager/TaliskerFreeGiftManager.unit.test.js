import '@testing-library/jest-dom';
import TaliskerFreeGiftManager from '../../../../src/contexts/PromotionManager/TaliskerFreeGiftManager';

describe('TaliskerFreeGiftManager', () => {
  test('Non Talikser products are filtered out of lineItems', () => {
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
        },
        {
          id: 44,
          variants: [{
            id: 441,
            title: 'Some like it Peaty',
            price: '99.00',
            handle: 'peaty-whisky',
          }],
          tags: [{ value: 'Peaty' }, { value: 'Oban' }],
          title: 'Some like it Peaty',
          handle: 'peaty-whisky',
          quantity: '1',
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
      {
        id: 44,
        quantity: 1,
        title: 'Some like it Peaty',
        handle: 'peaty-whisky',
        variant: {
          id: 441,
          handle: 'peaty-whisky',
          price: 99.00,
        },
      },
    ];
    // Act
    const applicableLineItems = TaliskerFreeGiftManager.lineItems(lineItems, liveProductData);
    // Assert
    expect(applicableLineItems.length).toBe(1);
  });

  test('Is eligible when totalspend is over 70', () => {
    // Arrange
    const lineItems = [{
      id: 42,
      price: 59.99,
      quantity: 2,
      title: 'Tasty Whisky',
      handle: 'tasty-whisky',
    }];
    // Act
    const giftEligiblility = TaliskerFreeGiftManager.eligibleForGift(lineItems);

    // Assert
    expect(giftEligiblility).toBe(true);
  });

  test('Is not eligible when totalspend is under 70', () => {
    // Arrange
    const lineItems = [{
      id: 42,
      price: 59.99,
      quantity: 1,
      title: 'Tasty Whisky',
      handle: 'tasty-whisky',
    }];

    // Act
    const giftEligiblility = TaliskerFreeGiftManager.eligibleForGift(lineItems);

    // Assert
    expect(giftEligiblility).toBe(false);
  });
});
