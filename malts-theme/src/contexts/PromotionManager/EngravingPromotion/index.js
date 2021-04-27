import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import QuantityControl from '../../../components/QuantityControl';
import TextPersonalizationForm from '../TextPersonalizationForm';
import { useShopify } from '../../ShopifyContext';
import styles from '../../../components/ShopifyForm/shopify-form-component.module.scss';
import engravingStyles from './engraving-promotion-component.module.scss';
import ShopifyForm from '../../../components/ShopifyForm';
import Image from '../../../components/Image';
import AddToCartButton from '../../../components/AddToCartButton';

const promotionOptionName = 'Personalisation';
const promotionOptionValue = 'Engraved';
const defaultAsset = 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/auchroisk-10-year-old-label_084e16178b.jpeg';
const assetLookup = {
  'auchroisk-10-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/auchroisk-10-year-old-label_084e16178b.jpeg',
  'blair-athol-12-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/blair-athol-12-year-old-label_4228a7b674.jpeg',
  'caol-ila-12-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/caol-ila-12-year-old-label_4bafcca53c.jpeg',
  'caol-ila-15-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/caol-ila-15-year-old-label_04c47d1e12.jpeg',
  'caol-ila-18-year-old-2017': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/caol-ila-18-year-old-2017-label_012a504576.jpeg',
  'caol-ila-2016-distillers-edition': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/caol-ila-2016-distillers-edition-label_4792a68705.jpeg',
  'cragganmore-12-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/cragganmore-12-year-old-lable_4c14d355f4.jpeg',
  'cragganmore-12-year-old-special-release': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/cragganmore-12year-old-2019-label_8867617b45.jpeg',
  'cragganmore-20-year-old-special-release-2020': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/cragganmore-12-year-old-2020-label_5ba827fec1.jpeg',
  'dailuaine-16-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/dailuaine-16-year-old-label_b0823d4a12.jpeg',
  'dalwhinnie-30-year-old-special-release': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/dalwhinnie-30-year-old-special-release-label_2509a98359.jpeg',
  'dalwhinnie-30-year-old-special-release-2020': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/dalwhinnie-30-year-old-special-release-2020-label_13c98acffe.jpeg',
  'glen-spey-12-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/glen-spey-12-year-old-label_0a6c7c8dbd.jpeg',
  'glenlossie-10-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/glenlossie-10-year-old-label_c875c19448.jpeg',
  'mannochmore-12-year-old-flora-fauna': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/mannochmore-12-year-old-flora-fauna-label_b92ac49ea2.jpeg',
  'strathmill-12-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/strathmill-12-year-old-label_b1043210ca.jpeg',
  'teaninich-10-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/teaninich-10-year-old-label_c97a11e39c.jpeg',
  'lagavulin-12-year-old-special-release-2020': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/lagavulin-12-year-old-special-release-2020-label_2703371c57.jpeg',
  'talisker-8-year-old-special-release-2020': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-8-year-old-special-release-2020-label_dbc8ff7473.jpeg',
  'talisker-8-year-old-special-release-2020-gift-mug-included': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-8-year-old-special-release-2020-label_dbc8ff7473.jpeg',
  'talisker-18-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-18-year-old-label_edea706fb0.jpeg',
  'talisker-18-year-old-gift-mug-included': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-18-year-old-label_edea706fb0.jpeg',
  'talisker-skye': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-skye-label_e182582e81.jpeg',
  'talisker-skye-gift-mug-included': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-skye-label_e182582e81.jpeg',
  'talisker-port-ruighe': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-port-ruighe-label_65bdaa8ef5.jpeg',
  'talisker-port-ruighe-gift-mug-included': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-port-ruighe-label_65bdaa8ef5.jpeg',
  'talisker-10-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-10-year-old-label_0ca4176603.jpeg',
  'talisker-10-year-old-gift-mug-included': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-10-year-old-label_0ca4176603.jpeg',
  'talisker-storm': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-storm-label_334b4fa839.jpeg',
  'talisker-storm-gift-mug-included': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/talisker-storm-label_334b4fa839.jpeg',
  'pittyvaich-30-year-old-special-release-2020': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/pittyvaich-30-year-old-special-release-2020-label_ac7bf2bc75.jpeg',
  'royal-lochnagar-12-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/Royal_Lochnar_12_3bf0ec6be3.jpeg',
  'lagavulin-8-years-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/Lagavulin_8_e49d61acfb.jpeg',
  'lagavulin-16-year-old': 'https://s3.us-west-2.amazonaws.com/malts.com-strapi-temp/Lagavulin_16_9802db7d71.jpeg',
};
const heartIcon = '\u{2665}\u{fe0e}'; // ♥ ❤
const productExcludedFromHearts = (p) => p.slug.startsWith('lagavulin');

export const EngravingPromotion = {
  hasCustomPurchaseFormFor: (product, variantId) => {
    if (!variantId) {
      return false;
    }
    const selectedVariant = product.variants.find((v) => v.id === variantId);
    return selectedVariant.selectedOptions.some(
      (so) => so.name === promotionOptionName && so.value === promotionOptionValue,
    );
  },
  CustomPurchaseForm: (
    {
      product, variantID, onClickHandler, availableInventory, hidden,
    },
  ) => {
    const { t } = useTranslation();
    const { getLiveProduct } = useShopify();
    const [quantity, setQuantity] = useState(1);
    const inputs = [
      {
        inputLabel: 'Initial 1',
        maxCharacters: 1,
        targetCoordinates: { x: 180, y: 200 },
      },
      {
        inputLabel: 'Initial 2',
        maxCharacters: 1,
        targetCoordinates: { x: 200, y: 200 },
      },
      {
        inputLabel: 'Initial 3',
        maxCharacters: 1,
        targetCoordinates: { x: 220, y: 200 },
      },
    ];

    const [inputErrors] = useState(
      inputs.reduce((acc, i) => ({ ...acc, [i.inputLabel]: false }), {}),
    );

    const shopifyProduct = getLiveProduct(product.slug);
    const productMetafields = shopifyProduct?.metafields;
    const additionalMessageText = productMetafields?.find((mf) => mf.key === 'additionalmessagetext')?.value;

    const emptyEngravings = {
      'Initial 1': '',
      'Initial 2': '',
      'Initial 3': '',
      Message: '',
    };

    const [engravings, setEngravings] = useState(emptyEngravings);
    const [initialsActive, setInitialsActive] = useState(true);
    const [engravingsValidated, setEngravingsValidated] = useState(false);
    const [confirmationChecked, setConfirmationChecked] = useState(false);
    const [middleInitialHeart, setMiddleInitialHeart] = useState(false);
    const [addHeartToMessage, setAddHeartToMessage] = useState(false);
    const heartInitialChangeHandler = (e) => {
      setMiddleInitialHeart(e.target.value === 'true');
    };

    const initialsOnly = Object.entries(engravings).reduce((memo, [key, value]) => {
      if (key.startsWith('Initial')) {
        return [...memo, value];
      }
      return memo;
    }, []);

    useEffect(() => {
      setEngravingsValidated(() => {
        if (!confirmationChecked) {
          return false;
        }
        if (initialsActive) {
          return middleInitialHeart
            ? initialsOnly[0].length > 0 && initialsOnly[2].length > 0
            : initialsOnly[0].length > 0 && initialsOnly[1].length > 0;
        }
        return engravings.Message?.length > 0;
      });
    }, [engravings, initialsActive, inputs, confirmationChecked]);

    const initialsSize = 55; // 35.65 - 80
    const messageSizes = {
      'Happy Easter': 140,
      'For My True Love': 170,
      'For A Special Person': 200,
      'To My Boyfriend': 160,
      'To My Girlfriend': 170,
      'To My Wife': 110,
      'To My Husband': 150,
      'To My Partner': 150,
      'Just For You': 140,
      'I Love You': 120,
      Congratulations: 150,
      'For A Special Friend': 170,
      'Happy Birthday': 150,
      'Happy Anniversary': 170,
      'Thinking of You': 150,
      'I Love You Mum': 140,
      'Just For You Mum': 150,
    };

    const presetMessages = [
      'Happy Easter',
      'For My True Love',
      'For A Special Person',
      'To My Boyfriend',
      'To My Girlfriend',
      'To My Wife',
      'To My Husband',
      'To My Partner',
      'Just For You',
      'I Love You',
      'Congratulations',
      'For A Special Friend',
      'Happy Birthday',
      'Happy Anniversary',
      'Thinking of You',
      'I Love You Mum',
      'Just For You Mum',
    ];

    let finalInitials;
    if (middleInitialHeart) {
      const addHeartTo = initialsOnly;
      addHeartTo[1] = heartIcon;
      finalInitials = addHeartTo.join('');
    } else if (['+', '&'].includes(engravings['Initial 2'])) {
      finalInitials = initialsOnly.join('');
    } else {
      finalInitials = initialsOnly.reduce(
        (acc, initial) => (initial.length === 1 ? `${acc}${initial}.` : acc),
        '',
      );
    }
    const finalMessage = addHeartToMessage ? engravings.Message.concat(`${heartIcon}`) : engravings.Message;
    const finalEngraving = initialsActive ? finalInitials : finalMessage;
    const finalEngravingLength = initialsActive ? initialsSize : messageSizes[engravings.Message];

    const maxFontSize = 90;
    const minEngravingLength = 55;
    const finalEngravingFontSize = maxFontSize - (
      Math.max((finalEngravingLength - minEngravingLength), 0) * 0.35
    );
    const engravingsAsCustomAttributes = [
      { key: 'Engraving', value: finalEngraving.replace(heartIcon, '\'HEART\'') },
    ];

    const purchaseText = engravingsValidated
      ? t('Add Engraved To Basket')
      : t('Choose your engraving');

    const finalButtonText = availableInventory > 0 ? purchaseText : t('Sold Out');
    const previewImage = assetLookup[product.slug] || defaultAsset;

    const checkboxConfirmMessage = `I confirm the ${initialsActive ? 'initials are' : 'message is'} correct. I understand that they cannot be changed once my order is placed.`;
    const modalHeaderSubtext = 'Make this product extra special for yourself or create the perfect gift with two options for engraving. Please enter up-to three initials or select a message to be engraved.';
    const modalHeader = 'Personalise your bottle';
    const saveButtonText = t(`Save ${initialsActive ? 'Initials' : 'Message'}`);

    if (hidden) {
      return null;
    }

    return (
      <>
        <TextPersonalizationForm
          disabled={false}
          finalMessage={finalEngraving}
          finalMessageFontSize={finalEngravingFontSize}
          inputSaveable={engravingsValidated}
          launchButtonText={t('Add Message')}
          previewImage={previewImage}
          saveButtonText={saveButtonText}
        >

          <h3 className={engravingStyles.modalHeader}>
            {t(modalHeader)}
          </h3>
          <p>{t(modalHeaderSubtext)}</p>
          <Container
            className={engravingStyles.inputsContainer}
          >
            <Row onClick={() => setInitialsActive(true)} className={`${engravingStyles.inputRow} ${engravingStyles.engravingOption} ${!initialsActive ? engravingStyles.inputRowInactive : ''}`}>
              {inputs.map((input) => {
                // converts everything except letters and numbers to underscore
                const inputName = input.inputLabel.replace(/[^A-Z0-9]+/ig, '_');
                const inputError = inputErrors[input.inputLabel];
                const inputStyle = inputError ? { borderColor: 'red' } : {};
                return (
                  <React.Fragment key={inputName}>
                    <div className={engravingStyles.inputGroup}>
                      {inputName === 'Initial_2' && !productExcludedFromHearts(product)
                        ? (
                          <div className={engravingStyles.heartInitialForm}>
                            <label
                              htmlFor="useInitial"
                              className={engravingStyles.heartInputLabel}
                            >
                              <input
                                type="radio"
                                id="useInitial"
                                name="middleInitialHeart"
                                value="false"
                                checked={!middleInitialHeart}
                                onChange={heartInitialChangeHandler}
                              />
                              {input.inputLabel}
                            </label>

                            <label
                              htmlFor="useHeart"
                              className={engravingStyles.heartInputLabel}
                            >
                              <input
                                type="radio"
                                id="useHeart"
                                name="middleInitialHeart"
                                value="true"
                                checked={middleInitialHeart}
                                onChange={heartInitialChangeHandler}
                              />
                              Heart
                            </label>
                          </div>
                        )
                        : (
                          <label
                            htmlFor={inputName}
                            className={engravingStyles.inputLabel}
                          >
                            {input.inputLabel}
                          </label>
                        )}
                      <input
                        id={inputName}
                        name={inputName}
                        type="text"
                        maxLength={input.maxCharacters}
                        className={engravingStyles.textInput}
                        onChange={(e) => {
                          if (e.target.value !== heartIcon) {
                            setEngravings(
                              (prev) => ({ ...prev, [input.inputLabel]: e.target.value }),
                            );
                          }
                        }}
                        style={inputStyle}
                        value={inputName === 'Initial_2' && middleInitialHeart ? heartIcon : engravings[input.inputLabel]}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </Row>
            <Row onClick={() => setInitialsActive(false)} className={`${engravingStyles.heartInitialForm} ${engravingStyles.inputRow} ${engravingStyles.engravingOption} ${engravingStyles.engravingOptionSelect} ${initialsActive ? engravingStyles.inputRowInactive : ''}`}>
              <Row className={engravingStyles.messageWrap}>
                <label
                  htmlFor="presetMessage"
                  className={engravingStyles.inputLabel}
                >
                  {t('Message')}
                </label>
                <select
                  id="presetMessage"
                  name="presetMessage"
                  className={engravingStyles.presetMessageSelect}
                  onFocus={() => setInitialsActive(false)}
                  onChange={(e) => setEngravings((prev) => ({ ...prev, Message: e.target.value }))}
                  defaultValue={engravings.Message ? engravings.Message : ''}
                >
                  <option value="" disabled>
                    {t('Choose your message...')}
                  </option>
                  {presetMessages.map((message) => (
                    <option
                      key={t(message)}
                      value={t(message)}
                    >
                      {t(message)}
                    </option>
                  ))}
                </select>
              </Row>
              {!productExcludedFromHearts(product)
                ? (
                  <Row className={engravingStyles.heartCheckboxWrapper}>
                    <input
                      className={engravingStyles.heartCheckbox}
                      id="addHeartToMessage"
                      type="checkbox"
                      checked={addHeartToMessage}
                      onChange={() => { setAddHeartToMessage((prev) => !prev); }}
                    />
                    <label
                      htmlFor="addHeartToMessage"
                      className={engravingStyles.heartInputLabel}
                    >
                      Add Heart Icon
                    </label>
                  </Row>
                )
                : null}
            </Row>
            <Row className={engravingStyles.inputRow}>
              <Col>
                <input
                  type="checkbox"
                  name="confirmation"
                  id="confirmation"
                  checked={confirmationChecked}
                  className={engravingStyles.engravingCheckbox}
                  onChange={(e) => setConfirmationChecked(e.target.checked)}
                />

                <label htmlFor="confirmation" className={`${engravingStyles.engravingCheckboxLabel}`}>
                  {t(checkboxConfirmMessage)}
                </label>
              </Col>
            </Row>
            <Row className={engravingStyles.inputRow} />
          </Container>
        </TextPersonalizationForm>
        <div className={engravingStyles.engravingFinal}>
          {engravingsValidated ? `Engraving: ${finalEngraving}` : ''}
        </div>
        <div className={styles.formAddToCart}>
          <QuantityControl
            max={availableInventory}
            min={1}
            quantity={quantity}
            updateListener={(newQuantity) => setQuantity(newQuantity)}
          />
          <button
            className={`btn btn-primary ${styles.addtocart}`}
            onClick={() => {
              onClickHandler(
                variantID,
                quantity,
                engravingsAsCustomAttributes,
              );
              setEngravings(emptyEngravings);
              setConfirmationChecked(false);
              setEngravingsValidated(false);
              setMiddleInitialHeart(false);
            }}
            disabled={availableInventory < 1 || engravingsValidated === false}
          >
            {finalButtonText}
          </button>
        </div>
        {additionalMessageText ? (
          <div className={`my-3 p-3 ${styles.preorderMessage}`}>
            {additionalMessageText}
          </div>
        ) : null}
      </>
    );
  },
  hasCustomProductTileFor: (product) => {
    if (product) {
      return product.variants.some(
        (variant) => variant.selectedOptions.some(
          (so) => so.name === promotionOptionName && so.value === promotionOptionValue,
        ),
      );
    }
    return false;
  },
  CustomProductTile: ({ data, handleClick, locale }) => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const categoryLabel = data.category && data.category.name
      ? `${data.category.name.replace(/\s+/g, '-').toLowerCase()}/`
      : '';

    return (
      <>
        <div className={engravingStyles.tile}>
          <a
            href={`/${locale.site.siteMetadata.locale}/${t('products')}/${categoryLabel}${data.slug}/`}
            className={engravingStyles.tile}
            onClick={handleClick}
          >
            <Image
              image={data.media[0]}
              className={`productTileImage ${engravingStyles.tileImage}`}
              style={{
                minHeight: '',
                maxWidth: 'calc(100% - 30px)',
                textAlign: 'center',
              }}
            />

            <div className={engravingStyles.tileTitlePersonalize}>{t('Personalise')}</div>

            <Row className={engravingStyles.tileTitleContainer}>
              <Col md="7" xs="12" className={engravingStyles.tileTitleContainer}>
                <p className={`text-xs-center ${engravingStyles.tileTitle}`}>
                  {data.title}
                </p>
              </Col>
              <Col md="5" xs="12" className={engravingStyles.tileTitleContainer}>
                <ShopifyForm product={data} priceOnly />
              </Col>
            </Row>
          </a>

          {!isMobile ? (
            <>

              <div className={engravingStyles.qsContainer}>
                <a
                  href={`/${locale.site.siteMetadata.locale}/${t('products')}/${categoryLabel}${data.slug}/`}
                  className={`link ${engravingStyles.popupTile}`}
                  onClick={handleClick}
                />
                <span className={`${engravingStyles.tileTitlePersonalizeAddCart}`}>
                  <AddToCartButton productID={data.slug} />
                </span>
              </div>
            </>
          ) : null}
        </div>
      </>
    );
  },
};
