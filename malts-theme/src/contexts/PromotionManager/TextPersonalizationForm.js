import React, { useState } from 'react';
import {
  Modal, Container, Row, Col,
} from 'react-bootstrap';
import engravingStyles from './EngravingPromotion/engraving-promotion-component.module.scss';

const TextPersonalizationForm = ({
  children,
  disabled = false,
  finalMessage = '',
  finalMessageFontSize = 50,
  inputSaveable = true,
  launchButtonText = 'Personalise',
  previewImage = '',
  saveButtonText = 'save',
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [inputErrors, setInputErrors] = useState(
  //   inputs.reduce((acc, i) => ({...acc, [i.inputLabel]: false}), {})
  // )
  const heartIcon = '\u{2665}\u{fe0e}'; // ♥ ❤

  const isPresetWithHeart = finalMessage.endsWith(heartIcon) && finalMessage.length > 4;

  return (
    <>
      <div className="launchButton">
        <button
          className={`btn btn-primary ${engravingStyles.launchButton}`}
          onClick={handleShow}
          disabled={disabled}
          name="launchButton"
        >
          {launchButtonText}
        </button>
      </div>
      <Modal show={show} onHide={handleClose} dialogClassName={`${engravingStyles.engravingModal}`}>
        <Modal.Body className={`${engravingStyles.engravingModalBody}`}>
          <button
            className={`btn btn-primary ${engravingStyles.modalClose}`}
            onClick={handleClose}
          >
            &times;
          </button>
          <Container>
            <Row>
              <div
                className={`${engravingStyles.previewImage} col-md-6`}
                style={{ backgroundImage: `url(${previewImage})` }}
              >
                <div className={`${engravingStyles.modalDisclaimer}`}>
                  This is an approximate rendering, actual position of engraving may differ.
                </div>
                <div className={engravingStyles.previewTextContainer}>
                  <span
                    className={engravingStyles.previewText}
                    style={{
                      '--personalization-font-size': `${finalMessageFontSize}px`,
                    }}
                  >
                    {isPresetWithHeart ? finalMessage.replace(heartIcon, '') : finalMessage}
                  </span>
                  {(isPresetWithHeart)
                    ? (
                      <span
                        className={engravingStyles.previewText}
                        style={{
                          '--personalization-font-size': `${finalMessageFontSize}px`,
                        }}
                      >
                        {heartIcon}
                      </span>
                    )
                    : null}
                </div>
              </div>
              <Col
                className={`${engravingStyles.previewControls} col-md-6`}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  alignContent: 'center',
                }}
              >
                {children}
                <button
                  className={`btn btn-primary ${engravingStyles.engravingSubmit}`}
                  disabled={!inputSaveable}
                  onClick={handleClose}
                >
                  {saveButtonText}
                </button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TextPersonalizationForm;
