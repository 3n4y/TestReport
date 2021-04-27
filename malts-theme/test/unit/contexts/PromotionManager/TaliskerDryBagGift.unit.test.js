import '@testing-library/jest-dom';
import TaliskerDryBagGift from '../../../../src/contexts/PromotionManager/TaliskerDryBagGift';

describe('TaliskerDryBagGift', () => {
  test('Non Talisker products are filtered out of lineItems', () => {
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
          id: 46,
          variants: [{
            id: 461,
            title: 'Peat over talisker',
            price: '49.99',
            handle: 'peat-over-talisker',
          }],
          tags: [{ value: 'peaty' }],
          title: 'Peat over talisker',
          quantity: '5',
          handle: 'peat-over-talisker',
          vendor: 'talisker',
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
      {
        id: 46,
        quantity: 1,
        title: 'Peat over Talisker',
        handle: 'peat-over-talisker',
        variant: {
          id: 461,
          handle: 'peat-over-talisker',
          price: 49.00,
        },
      },
    ];
    // Act
    const applicableLineItems = TaliskerDryBagGift.lineItems(lineItems, liveProductData);
    // Assert
    expect(applicableLineItems.length).toBe(1);
  });

  test('Is eligible when total spend is over 75', () => {
    // Arrange
    const lineItems = [
      {
        id: 42,
        price: 59.99,
        quantity: 1,
        title: 'Tasty Whisky',
        handle: 'tasty-whisky',
      },
      {
        id: 46,
        price: 49.99,
        quantity: 1,
        title: 'peat over Talisker',
        handle: 'peat-over-talisker',
      },
    ];
    // Act
    const giftEligibility = TaliskerDryBagGift.eligibleForGift(lineItems);

    // Assert
    expect(giftEligibility).toBe(true);
  });

  test('Is not eligible when total spend is under 75', () => {
    // Arrange
    const lineItems = [{
      id: 42,
      price: 59.99,
      quantity: 1,
      title: 'Tasty Whisky',
      handle: 'tasty-whisky',
    }];

    // Act
    const giftEligibility = TaliskerDryBagGift.eligibleForGift(lineItems);

    // Assert
    expect(giftEligibility).toBe(false);
  });
});
