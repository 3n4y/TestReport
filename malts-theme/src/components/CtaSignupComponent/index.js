import React, { useState, useEffect } from 'react';
import {
  Modal, Container, Row, Col,
} from 'react-bootstrap';
import {
  useDataLayer, popupShow, popupClose, popupRegister, popupLogin,
} from 'malts-theme/src/utils/dataLayer/index';
import styles from './cta-signup-component.module.scss';
import { useAuth0 } from '../../utils/auth0-wrapper';

const CtaSignupComponent = ({ data }) => {
  const pages = ['/shop', '/marken', '/produkte/geschenke', '/whisky-guide', '/touren', '/produkte', '/de-de/produkte'];
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [show, setShow] = useState(false);
  const [
    dataLayerPopupShow,
    dataLayerPopupClose,
    dataLayerPopupRegister,
    dataLayerPopupLogin,
  ] = useDataLayer([popupShow, popupClose, popupRegister, popupLogin]);

  const handleLogin = () => {
    dataLayerPopupLogin();
    loginWithRedirect();
  };

  const handleRegister = () => {
    dataLayerPopupRegister();
    loginWithRedirect();
  };

  const handleClose = () => {
    setShow(false);
    dataLayerPopupClose();
  };
  const handleShow = () => {
    setShow(true);
    sessionStorage.setItem('cta_popup', true);
    dataLayerPopupShow();
  };

  useEffect(() => {
    let popupTimer = null;
    if (data.locale === 'de-de' && pages.includes(data.slug) && !isAuthenticated && !sessionStorage.getItem('cta_popup')) {
      popupTimer = setTimeout(() => handleShow(), 8000);
    }
    return () => {
      if (popupTimer) {
        clearTimeout(popupTimer);
      }
    };
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName={`${styles.signupModal}`}>
        <Modal.Body className={`${styles.signupModalBody}`}>
          <button
            className={`btn btn-primary ${styles.signupModalClose}`}
            onClick={handleClose}
          >
            &times;
          </button>
          <Container>
            <Row>
              <Col>
                Sie sind bereits Mitglied? Loggen Sie sich ein, um Sonderangebote zu erhalten.
              </Col>
            </Row>
            <Row>
              <Col>
                <button
                  className={`btn btn-primary ${styles.signupButton}`}
                  onClick={() => handleLogin()}
                >
                  Jetzt Einloggen
                </button>
              </Col>
            </Row>
            <Row>
              <hr />
            </Row>
            <Row>
              <Col>
                Sie sind noch kein Mitglied? Melden Sie sich jetzt an und abonnieren Sie unbedingt
                auch unseren Malts.com Newsletter, um als erstes von den neuesten Ausgaben,
                exklusiven Angeboten, Vorverkäufen von neuen Produkten und mehr zu erfahren.
              </Col>
            </Row>
            <Row>
              <Col>
                <button
                  className={`btn btn-primary ${styles.signupButton}`}
                  onClick={() => handleRegister()}
                >
                  Jetzt Registrieren
                </button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CtaSignupComponent;
