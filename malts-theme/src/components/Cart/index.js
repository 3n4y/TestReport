import React, { useRef, useEffect } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { Row, Col, Button } from 'react-bootstrap';
import { useAuth0 } from 'malts-theme/src/utils/auth0-wrapper';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import LineItem from './LineItem';
import FreeShippingLine from './FreeShippingLine';
import { useShopify } from '../../contexts/ShopifyContext';

import styles from './cart.module.scss';

const Cart = () => {
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
  const { t } = useTranslation();
  const { user, loginWithRedirect } = useAuth0();
  const {
    state, dispatch, cart: { checkout, updating }, goToCheckout, hasShopifyConnection,
  } = useShopify();

  const toggleSidebar = () => {
    dispatch({ type: 'toggleCart' });
  };

  const cartStyle = state.isCartOpen ? styles.cartDrawer : styles.cartDrawerHidden;
  const lineItems = checkout?.lineItems.map(
    (lineItem) => <LineItem key={lineItem.id.toString()} line_item={lineItem} />,
  ) || [];

  const lineItemTotal = parseFloat(checkout?.lineItemsSubtotalPrice?.amount);
  const discount = lineItemTotal - checkout?.totalPrice;

  const cartDrawer = useRef();
  useEffect(
    () => {
      const listener = (event) => {
        if (!cartDrawer.current || cartDrawer.current.contains(event.target)) {
          return;
        }
        dispatch({ type: 'closeCart' });
      };
      document.addEventListener('mousedown', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        dispatch({ type: 'closeCart' });
      };
    },
    [cartDrawer, dispatch],
  );

  return (
    <>
      { hasShopifyConnection() ? (
        <div ref={cartDrawer}>
          <span onClick={toggleSidebar}>
            <AiOutlineShopping className={styles.icon} />
            <span className={styles.qtyCart}>
              {checkout.lineItems.reduce((total, lineItem) => total + lineItem.quantity, 0)}
            </span>
          </span>
          <div className={cartStyle}>
            <Row>
              <Col>
                <h3 className="pb-0">{t('REVIEW YOUR BASKET')}</h3>
                <FreeShippingLine
                  region={site.siteMetadata.locale}
                  totalPrice={checkout?.totalPrice}
                />
                <p onClick={toggleSidebar} className={styles.back_arrow_before}>{t('Continue shopping')}</p>
                <hr />
              </Col>
            </Row>

            {lineItems}

            <div className={updating ? styles.updating : null}>
              {lineItemTotal > 0 && (
                <Row>
                  <Col xs={6}>
                    <p className="display-6">{t('Subtotal')}</p>
                  </Col>
                  <Col xs={6} className="text-right">
                    <p>
                      {t('Currency')}
                      {lineItemTotal.toFixed(2)}
                    </p>
                  </Col>
                </Row>
              )}
              {discount > 0 && (
                <Row>
                  <Col xs={6}>
                    <p className="display-6">{t('Discount')}</p>
                  </Col>
                  <Col xs={6} className="text-right">
                    <p>
                      -
                    {t('Currency')}
                      {discount.toFixed(2)}
                    </p>
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs={6}>
                  <p className="display-6">{t('Total')}</p>
                </Col>
                <Col xs={6} className="text-right">
                  <p>
                    {t('Currency')}
                    {checkout.subtotalPrice}
                  </p>
                </Col>
              </Row>
              <Row className="pb-4">
                {user
                  && (
                    <Col xs={12} className="text-left" style={{ marginBottom: '10px' }}>
                      <button
                        className={`btn btn-primary ${styles.fullwidth}`}
                        onClick={goToCheckout}
                        disabled={checkout.lineItems.length === 0}
                      >
                        {t('Check Out')}
                      </button>
                      <p className="small pt-4">
                        {t('Check out legal')}
                        <Link to="/bsq-privacy-policy">{t('Privacy Policy')}</Link>
                      </p>
                    </Col>
                  )}
                {!user
                  && (
                    <Col xs={12} className="text-right" style={{ marginBottom: '10px' }}>
                      <Button
                        className={`btn btn-primary ${styles.fullwidth}`}
                        disabled={checkout.lineItems.length === 0}
                        onClick={() => loginWithRedirect()}
                      >
                        {t('Login or Sign Up')}
                      </Button>
                    </Col>
                  )}
                <Col xs={12} className="text-right">
                  <button
                    className={`btn btn-primary ${styles.fullwidth}`}
                    onClick={() => goToCheckout({ guest: true })}
                    disabled={checkout.lineItems.length === 0}
                  >
                    {t('Check out as Guest')}
                  </button>
                </Col>

              </Row>

            </div>
          </div>
        </div>

      ) : null}
    </>
  );
};

export default Cart;
