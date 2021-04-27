import React, { useEffect, useState } from 'react';
import {
  Row, Col, Container, Modal, Button,
} from 'react-bootstrap';
import { useAuth0 } from 'malts-theme/src/utils/auth0-wrapper';
import { useDataLayer, accountUpdate } from 'malts-theme/src/utils/dataLayer/index';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { withTrans } from 'malts-theme/src/components/i18n/withTrans';
import { getProfile, updateProfile } from 'malts-theme/src/utils/cidb-api';
import Layout from 'malts-theme/src/components/layout';
import SEO from 'malts-theme/src/components/SEO';
import HeaderComponent from 'malts-theme/src/components/HeaderComponent';
import RecommendedProductsComponent from 'malts-theme/src/components/RecommendedProductsComponent';
import styles from './account.module.scss';

const UserAccountPage = ({ location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            locale
          }
        }
      }
    `,
  );
  const {
    loading,
    isAuthenticated,
    loginWithRedirect,
    user,
    getTokenSilently,
    logout,
  } = useAuth0();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState();
  const [marketing, setMarketing] = useState();
  const [dataLayerAccountUpdate] = useDataLayer([accountUpdate]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    profileLoad();
  };

  const handleSubmit = () => {
    profileUpdate();
  };

  const profileLoad = async () => {
    const data = await getProfile(token);
    setShowResult(false);
    setMarketing(data.accept);
    setShow(true);
  };

  const profileUpdate = async () => {
    const result = await updateProfile(token, marketing);
    setSuccess(result);
    if (result) {
      dataLayerAccountUpdate(marketing);
    }
    setShowResult(true);
  };

  const handleLogout = () => logout({
    returnTo:
        `${window.location.origin}/${site.siteMetadata.locale}/?agp=true`,
  });

  const handleMarketing = (e) => setMarketing(e.target.checked);

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) {
      const getToken = async () => {
        const anotherToken = await getTokenSilently();
        setToken(anotherToken);
      };
      getToken();

      const handler = (event) => {
        if (event.data === 'close') {
          setShow(false);
        }
      };

      window.addEventListener('message', handler);
      return () => window.removeEventListener('message', handler);
    }
    const fn = async () => { await loginWithRedirect(); };
    fn();
  }, [loading, isAuthenticated, getTokenSilently, loginWithRedirect]);

  return (
    <>
      <Layout pageName="Account">
        <SEO location={location} />
        <HeaderComponent
          data={{ background_image: null, title: t('My Account') }}
          stylea={{ backgroundColor: '#1F5B5E' }}
        />
        <Container className="text-center" style={{ minHeight: '450px' }}>
          <Row>
            <Col>
              {user && (
                <>
                  <div style={{ marginTop: '48px', padding: '0 30px' }}>
                    <h2>{t('Welcome')}</h2>
                    <p>
                      {t('Thank you for being a member of Malts.com')}
                      .
                    </p>
                    <p>
                      {t('Below you can update your email preferences or logout')}
                      .
                    </p>
                    <h4 className="mt-5">{t('Account Options')}</h4>
                    <Button
                      className="btn d-block mx-auto mt-3"
                      style={{ width: '320px' }}
                      onClick={handleShow}
                    >
                      {t('Change Email Preferences')}
                    </Button>
                    <Button
                      className="btn d-block mx-auto mt-3"
                      style={{ width: '320px' }}
                      onClick={handleLogout}
                    >
                      {t('Logout')}
                    </Button>
                  </div>
                </>
              )}
            </Col>
          </Row>
          <Row>
            <RecommendedProductsComponent />
          </Row>
        </Container>
      </Layout>
      <Modal show={show} onHide={handleClose} dialogClassName={`${styles.profileModal}`}>
        <Modal.Header className={`${styles.profileModalHeader}`}>
          <Modal.Title>{t('Update Contact Details')}</Modal.Title>
          <button
            className={`btn btn-primary ${styles.profileModalClose}`}
            onClick={handleClose}
          >
            &times;
          </button>
        </Modal.Header>
        <Modal.Body className={`${styles.profileModalBody}`}>
          <Container>
            {!showResult && (
              <>
                <Row>
                  <Col className={`${styles.profileModalForm}`}>
                    <label htmlFor="accept-marketing">
                      <input type="checkbox" id="accept-marketing" name="accept-marketing" checked={marketing} onChange={handleMarketing} />
                      {t('Yes, I would like to hear more from MALTS, via email, on news and offers. Please see our Privacy and Cookie Notice for more information about how Diageo may see and process your personal information and your rights in connection with that personal information')}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button
                      className={`btn btn-primary ${styles.profileModalButton}`}
                      onClick={handleSubmit}
                    >
                      {t('Confirm')}
                    </button>
                    <button
                      className={`btn btn-secondary ${styles.profileModalButton}`}
                      onClick={handleClose}
                    >
                      {t('Cancel')}
                    </button>
                  </Col>
                </Row>
              </>
            )}
            {showResult && (
              <>
                <Row>
                  <Col className={`${styles.profileModalMessage}`}>
                    {success ? t('Thank you, your account has been updated.') : t('Sorry something went wrong.')}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button
                      className="btn btn-primary"
                      onClick={handleClose}
                    >
                      {t('Close')}
                    </button>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withTrans(UserAccountPage);
