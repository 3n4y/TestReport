import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextPersonalizationForm from '../../../../src/contexts/PromotionManager/TextPersonalizationForm';

const launchButtonText = 'test-launch-button-text';
const previewImage = 'https://preview.image/url';
const finalMessage = 'test-final-message';
const saveButtonText = 'test-save-button-text';
const finalMessageFontSize = 90;
const testChildrenContent = 'test-children-content';
let disabled; let
  inputSaveable;
disabled = false;
inputSaveable = false;

describe('TextPersonalizationForm', () => {
  beforeEach(() => {
    disabled = false;
    inputSaveable = false;
    render(
      <TextPersonalizationForm
        disabled={disabled}
        finalMessage={finalMessage}
        finalMessageFontSize={finalMessageFontSize}
        inputSaveable={inputSaveable}
        launchButtonText={launchButtonText}
        previewImage={previewImage}
        saveButtonText={saveButtonText}
      >
        {testChildrenContent}
      </TextPersonalizationForm>,
    );
  });

  describe('before clicking the launch button', () => {
    test('it uses the launchButtonText on the launch button', () => {
      expect(screen.queryByText(launchButtonText)).toBeInTheDocument();
    });

    test('it does not display the modal', () => {
      expect(screen.queryByText(finalMessage)).not.toBeInTheDocument();
    });
  });

  describe('after clicking the launch button', () => {
    beforeEach(() => {
      fireEvent.click(screen.queryByText(launchButtonText));
    });

    test('it displays the modal with modalHeaderText', () => {
      expect(screen.queryByText(finalMessage)).toBeInTheDocument();
    });

    // investigate querying for images using react test library
    test.skip('it displays the previewImage', () => {
      // eslint-disable-next-line no-undef
      expect(renderContainer.container.querySelector('div.previewImage')).not.toHaveStyle(`background-image: url(${previewImage})`);
    });

    describe.skip('when submitting input', () => {
      // need to investgate generating input via fireEvent
      beforeEach(() => {
        fireEvent.click(screen.queryByText('Save'));
      });

      test('it passes the input to validationHandler', () => {
        // eslint-disable-next-line no-undef
        expect(mockValidationHandler).toHaveBeenCalledWith(
          // eslint-disable-next-line no-undef
          { [testInputLabel]: testInputText },
        );
      });
    });
  });
});
