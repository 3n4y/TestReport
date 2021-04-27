import '@testing-library/jest-dom';
import Bundle3xFreeGiftManager from '../../../../src/contexts/PromotionManager/Bundle3xFreeGiftManager';

jest.mock('i18next', () => ({
  init: () => {},
  use: () => {},
  t: (k) => k,
}));

describe('Bundle3xFreeGiftManager', () => {
  test('Gift Cards are filtered out of lineItems', () => {
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
          title: 'Tasty Whisky',
          quantity: '2',
          handle: 'tasty-whisky',
        },
        {
          id: 43,
          variants: [
            {
              id: 431,
              title: '10 Euro Gift Card',
              price: '10.00',
              handle: 'gift-card-ten-euros',
            },
            {
              id: 432,
              title: '50 Euro Gift Card',
              price: '50.00',
              handle: 'gift-card-fifty-euros',
            }],
          title: 'Gift Card',
          handle: 'gift-card',
          quantity: '1',
        },
        {
          id: 44,
          variants: [{
            id: 441,
            title: 'Some like it Peaty',
            price: '99.00',
            handle: 'peaty-whisky',
          }],
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
        id: 43,
        quantity: 1,
        title: '50 Euro Gift Card',
        handle: 'gift-card-fifty-euros',
        variant: {
          id: 432,
          handle: 'gift-card-fifty-euros',
          price: 50.00,
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
    const applicableLineItems = Bundle3xFreeGiftManager.lineItems(lineItems, liveProductData);

    // Assert
    expect(applicableLineItems.length).toBe(2);
  });

  test('Is eligible when has at lest one non gift card item', () => {
    // Arrange
    const lineItems = [{
      id: 42,
      price: 59.99,
      quantity: 2,
      title: 'Tasty Whisky',
      handle: 'tasty-whisky',
    }];
    // Act
    const giftEligibility = Bundle3xFreeGiftManager.eligibleForGift(lineItems);

    // Assert
    expect(giftEligibility).toBe(true);
  });

  test('Is not eligible if no applicable items', () => {
    // Arrange
    const lineItems = [];

    // Act
    const giftEligibility = Bundle3xFreeGiftManager.eligibleForGift(lineItems);

    // Assert
    expect(giftEligibility).toBe(false);
  });
});
