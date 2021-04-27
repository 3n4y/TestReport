import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { EngravingPromotion } from '../../../../../src/contexts/PromotionManager/EngravingPromotion/index';
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

const mockOnClickHandler = jest.fn();
const testProductSlug = 'test-slug';
const testVariantID = 'test-variant-id';
const testMedia = 'test-media';

const testProduct = {
  slug: testProductSlug,
  variants: [
    {
      id: testVariantID,
      selectedOptions: [
        {
          name: 'Personalisation',
          value: 'Engraved',
        },
      ],
    },
  ],
  media: [testMedia],
};

const mockAdditionalMessageText = 'test-additional-message-text';
const mockMetafieldsShopifyProduct = {
  metafields: [
    { key: 'additionalmessagetext', value: mockAdditionalMessageText },
  ],
};

describe('#hasCustomPurchaseFormFor', () => {
  const expectedOptionName = 'Personalisation';
  const expectedOptionValue = 'Engraved';
  let testPrdct;
  const testResultFor = (product, variantID) => EngravingPromotion.hasCustomPurchaseFormFor(
    product, variantID,
  );

  describe("when a product's engraving variant is selected", () => {
    beforeEach(() => {
      testPrdct = {
        slug: testProductSlug,
        variants: [
          {
            id: testVariantID,
            selectedOptions: [
              {
                name: expectedOptionName,
                value: expectedOptionValue,
              },
            ],
          },
        ],
      };
    });
    test('it returns true', () => {
      expect(testResultFor(testPrdct, testVariantID)).toBe(true);
    });
  });

  describe("when product's engraving variant isn't selected", () => {
    beforeEach(() => {
      testPrdct = {
        slug: testProductSlug,
        variants: [
          {
            id: testVariantID,
            selectedOptions: [],
          },
        ],
      };
    });

    test('it returns false', () => {
      expect(testResultFor(testPrdct, testVariantID)).toBe(false);
    });
  });
});

const setupCustomPurchaseForm = ({
  availableInventory = 1,
  onClickHandler = mockOnClickHandler,
  product = testProduct,
  variantID = testVariantID,
} = {}) => {
  const { CustomPurchaseForm } = EngravingPromotion;
  const output = render(
    <CustomPurchaseForm
      {...{
        product, variantID, onClickHandler, availableInventory,
      }}
    />,
  );
  return output;
};

const setupClickFormActivator = () => {
  const output = setupCustomPurchaseForm();
  fireEvent.click((output.queryByRole('button', { name: 'Add Message' })));
  return output;
};

const setupEnterInitialsWithoutHeart = ({
  initials = ['', '', ''],
} = {}) => {
  const output = setupClickFormActivator();
  const initial1Input = output.getByLabelText('Initial 1');
  const initial2Input = document.querySelector('#Initial_2');
  const initial3Input = output.getByLabelText('Initial 3');
  const initialInputs = [initial1Input, initial2Input, initial3Input];
  initials.forEach((initial, index) => {
    if (initial !== '') {
      fireEvent.input(initialInputs[index], { target: { value: initial } });
    }
  });
  return output;
};

const setupUseHeartInitial = () => {
  const output = setupClickFormActivator();
  const heartInitialInput = document.querySelector('#useHeart');
  fireEvent.click(heartInitialInput);
  return output;
};

const setupEnterInitialsWithHeart = ({
  initials = ['', '', ''],
} = {}) => {
  const output = setupUseHeartInitial();
  const initial1Input = output.getByLabelText('Initial 1');
  const initial2Input = document.querySelector('#Initial_2');
  const initial3Input = output.getByLabelText('Initial 3');
  const initialInputs = [initial1Input, initial2Input, initial3Input];
  initials.forEach((initial, index) => {
    if (initial !== '') {
      fireEvent.input(initialInputs[index], { target: { value: initial } });
    }
  });
  return output;
};

const setupEnterInitialsAndConfirm = ({
  initials = ['', '', ''],
} = {}) => {
  const output = setupEnterInitialsWithoutHeart({ initials });
  const confirmationCheckbox = output.getByLabelText(
    'I confirm the initials are correct. I understand that they cannot be changed once my order is placed.',
  );
  fireEvent.click(confirmationCheckbox);
  const saveInitialsButton = output.queryByRole(
    'button',
    { name: 'Save Initials' },
  );
  fireEvent.click(saveInitialsButton);
  return output;
};

const setupChoosePresetMessage = ({
  message = 'I Love You',
} = {}) => {
  const output = setupClickFormActivator();
  const messageInputLabel = output.getByLabelText('Message');
  fireEvent.click(messageInputLabel); // activates preset messages
  fireEvent.change(messageInputLabel, { target: { value: message } });

  return output;
};

const setupChoosePresetMessageWithHeart = ({
  message = 'I Love You',
} = {}) => {
  const output = setupChoosePresetMessage({ message });
  const addHeartInput = output.getByLabelText('Add Heart Icon');
  fireEvent.click((addHeartInput));

  return output;
};

const setupChoosePresetMessageAndConfirm = ({
  message = 'I Love You',
} = {}) => {
  const output = setupChoosePresetMessage(message);
  const confirmationCheckbox = output.getByLabelText(
    'I confirm the message is correct. I understand that they cannot be changed once my order is placed.',
  );
  fireEvent.click(confirmationCheckbox);
  const saveInitialsButton = output.getByRole(
    'button',
    { name: 'Save Message' },
  );
  fireEvent.click(saveInitialsButton);
  return output;
};

describe('#CustomPurchaseForm', () => {
  test('it requests the live product from shopify', () => {
    setupCustomPurchaseForm();
    expect(mockGetLiveProduct).toHaveBeenCalledWith(testProductSlug);
  });

  test('it calls QuantityControl with expected props', () => {
    setupCustomPurchaseForm();
    const expectedMin = 1;
    const expectedQuantity = 1;
    const expectedProps = {
      max: 1,
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

  describe('when availableInventory is 0', () => {
    beforeEach(() => {
      setupCustomPurchaseForm({ availableInventory: 0 });
    });

    test('it changes the button text to "Sold Out"', () => {
      expect(screen.queryByText('Choose your engraving')).not.toBeInTheDocument();
      expect(screen.queryByText('Add Engraved To Cart')).not.toBeInTheDocument();
      expect(screen.getByText('Sold Out')).toBeInTheDocument();
    });

    test('it requests a translation for Sold Out', () => {
      expect(mockTranslate).toHaveBeenCalledWith('Sold Out');
    });
  });

  describe('before engravings are validated', () => {
    beforeEach(() => {
      setupCustomPurchaseForm();
    });

    test('it changes the button text to "Choose your engraving"', () => {
      expect(screen.getByText('Choose your engraving')).toBeInTheDocument();
      expect(screen.queryByText('Add Engraved To Basket')).not.toBeInTheDocument();
      expect(screen.queryByText('Sold Out')).not.toBeInTheDocument();
    });

    test('it requests a translation for Choose your engraving', () => {
      expect(mockTranslate).toHaveBeenCalledWith('Choose your engraving');
    });

    test('it disables the Choose your engraving button', () => {
      expect(screen.getByText('Choose your engraving')).toBeDisabled();
    });
  });

  describe('when product has additionalmessagetext metafield', () => {
    beforeEach(() => {
      mockGetLiveProduct.mockImplementationOnce(() => mockMetafieldsShopifyProduct);
      setupCustomPurchaseForm();
    });

    test('it displays additionalmessagetext', () => {
      expect(screen.getByText(mockAdditionalMessageText)).toBeInTheDocument();
    });
  });

  describe('after the launcher button is clicked', () => {
    beforeEach(() => {
      setupClickFormActivator();
    });

    test('it displays the form', () => {
      expect(screen.getByLabelText('Initial 2')).toBeInTheDocument();
    });
  });

  describe('when the user inputs initials without heart', () => {
    test('letter initials are previewed with added periods', () => {
      setupEnterInitialsWithoutHeart({ initials: ['a', 'b', 'c'] });
      expect(screen.getByText('a.b.c.')).toBeInTheDocument();
    });
    test('when middle initial is &, preview has no periods', () => {
      setupEnterInitialsWithoutHeart({ initials: ['a', '&', 'c'] });
      expect(screen.getByText('a&c')).toBeInTheDocument();
    });
    test('when middle initial is +, preview has no periods', () => {
      setupEnterInitialsWithoutHeart({ initials: ['a', '+', 'c'] });
      expect(screen.getByText('a+c')).toBeInTheDocument();
    });
  });

  describe('when user inputs initials with heart', () => {
    test('preview replaces middle initial with a heart symbol, no periods', () => {
      setupEnterInitialsWithHeart({ initials: ['a', 'b', 'c'] });
      expect(screen.getByText('a♥︎c')).toBeInTheDocument();
    });
  });

  describe('when user enters initials and confirms', () => {
    beforeEach(() => {
      setupEnterInitialsAndConfirm({ initials: ['a', 'c', 'o'] });
    });
    test('the add to cart button becomes enabled', () => {
      const addToCartButton = screen.queryByText('Add Engraved To Basket');
      expect(addToCartButton).toBeInTheDocument();
      expect(addToCartButton).not.toBeDisabled();
    });
    test('clicking the add to cart button invokes onClickHandler', () => {
      const addToCartButton = screen.queryByText('Add Engraved To Basket');
      fireEvent.click(addToCartButton);
      expect(mockOnClickHandler).toHaveBeenCalledWith(
        testVariantID,
        1,
        [{ key: 'Engraving', value: 'a.c.o.' }],
      );
    });
  });

  test('when user chooses a preset message without heart it is previewed without heart', () => {
    const desiredMessage = 'I Love You';
    setupChoosePresetMessage(desiredMessage);
    // Not using getByText because that detects the <option>
    const previewTextAreas = Array.from(document.querySelectorAll('.previewText'));
    expect(previewTextAreas.some((x) => x.textContent === desiredMessage));
    expect(previewTextAreas.some((x) => x.textContent === '♥︎')).toBeFalsy();
  });

  test('when user chooses a preset message with heart it is previewed with heart', () => {
    const desiredMessage = 'I Love You';
    setupChoosePresetMessageWithHeart(desiredMessage);
    // Not using queryByText because that can detect the <option>
    const previewTextAreas = Array.from(document.querySelectorAll('.previewText'));
    expect(previewTextAreas.some((x) => x.textContent === desiredMessage));
    expect(previewTextAreas.some((x) => x.textContent === '♥︎'));
  });
  describe('when user chooses message and confirms', () => {
    beforeEach(() => {
      setupChoosePresetMessageAndConfirm();
    });
    test('the add to cart button becomes enabled', () => {
      const addToCartButton = screen.queryByText('Add Engraved To Basket');
      expect(addToCartButton).toBeInTheDocument();
      expect(addToCartButton).not.toBeDisabled();
    });
    test('clicking the add to cart button invokes onClickHandler', () => {
      const addToCartButton = screen.queryByText('Add Engraved To Basket');
      fireEvent.click(addToCartButton);
      expect(mockOnClickHandler).toHaveBeenCalledWith(
        testVariantID,
        1,
        [{ key: 'Engraving', value: 'I Love You' }],
      );
    });
  });
});
