import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer,
  useCallback,
  useMemo,
} from 'react';

import Client from 'shopify-buy/index.unoptimized.umd';
import { useAuth0 } from '../../utils/auth0-wrapper';
import PromotionManager from '../PromotionManager';
import allProductsWithTagsAndMetafields from './graphql/allProductsWithTagsAndMetafields';
import {
  useDataLayer,
  productRemoveFromCart,
  productAddToCart,
} from '../../utils/dataLayer/index';

const initialCartState = {
  adding: false,
  updating: false,
  checkout: { lineItems: [] },
};
const initialContext = {
  cart: initialCartState,
  fetching: false,
  fetched: false,
  hasShopifyConnection: () => false,
  addVariantToCart: () => { },
  removeLineItem: () => { },
  updateLineItem: () => { },
  updateAttributes: () => { },
  getLiveProduct: () => { },
  checkoutWithEmail: () => { },
  state: { isCartOpen: false },
  dispatch: () => { },
};
const ShopifyContext = React.createContext(initialContext);
export const useShopify = () => useContext(ShopifyContext);

export const ShopifyContextProvider = ({ children, domain, storefrontAccessToken }) => {
  const { user, isAuthenticated } = useAuth0();
  const [dataLayerAddProductToCart, dataLayerRemoveProductFromCart] = useDataLayer(
    [productAddToCart, productRemoveFromCart],
  );

  const shopifyClient = useRef(false);
  if (domain && storefrontAccessToken) {
    const tryClient = Client.buildClient({
      storefrontAccessToken,
      domain: `${domain}`,
    });
    if (tryClient) {
      shopifyClient.current = tryClient;
    }
  }

  const initialLiveProductState = {
    fetching: false,
    products: [],
  };

  const [cart, setCart] = useState(initialCartState);
  const [liveProductData, setLiveProductData] = useState(initialLiveProductState);
  // actions
  const filters = (state, action) => {
    switch (action.type) {
      case 'toggleCart':
        return { ...state, isCartOpen: !state.isCartOpen };
      case 'openCart':
        return !state?.isCartOpen ? { ...state, isCartOpen: true } : state;
      case 'closeCart':
        return state?.isCartOpen ? { ...state, isCartOpen: false } : state;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(filters, { isCartOpen: false });

  useEffect(() => {
    setLiveProductData((prevState) => ({ ...prevState, fetching: true }));

    const productsQuery = shopifyClient.current.graphQLClient?.query(
      allProductsWithTagsAndMetafields,
    );

    // Call the send method with the custom products query
    if (shopifyClient.current) {
      shopifyClient.current.graphQLClient.send(productsQuery)
        .then(({ model }) => {
          const { products } = model;
          setLiveProductData((prevState) => ({
            ...prevState, products, fetching: false, fetched: true,
          }));
        }).catch(() => {
          setLiveProductData((prevState) => ({ ...prevState, fetching: false, fetched: true }));
        });
    }
  }, []);

  const isBrowser = useMemo(() => typeof window !== 'undefined', []);

  const setCheckoutInState = useCallback(
    (checkoutForState) => {
      if (isBrowser && checkoutForState) {
        localStorage.setItem('shopify_checkout_id', checkoutForState.id);
        setCart(() => ({ checkout: checkoutForState }));
      }
    },
    [isBrowser],
  );

  const onAddToCart = (lineItemsToAdd) => {
    let finalLineItemsToAdd = lineItemsToAdd;

    finalLineItemsToAdd = PromotionManager.onAddToCart(
      finalLineItemsToAdd,
      cart.checkout.lineItems,
      liveProductData,
      isAuthenticated,
    );

    return finalLineItemsToAdd;
  };

  const addVariantToCart = (variantId, quantity, customAttributes = []) => {
    if (variantId === '' || !quantity) {
      return;
    }
    setCart((prevState) => ({ ...prevState, adding: true, updating: true }));

    const checkoutID = cart.checkout.id;
    const lineItemsToAdd = onAddToCart(
      [{ variantId, quantity: parseInt(quantity, 10), customAttributes }],
    );
    return shopifyClient.current?.checkout
      ?.addLineItems(checkoutID, lineItemsToAdd)
      ?.then((updatedCheckout) => {
        setCart((prevState) => {
          const product = liveProductData.products
            .find((liveProduct) => liveProduct.variants.map((variant) => variant.id)
              .includes(variantId));
          dataLayerAddProductToCart(product, quantity);
          return {
            ...prevState,
            checkout: updatedCheckout,
            adding: false,
            updating: false,
          };
        });
      });
  };

  const onRemoveFromCart = (lineItemIDToRemove) => {
    let finalLineItemIDsToRemove = [lineItemIDToRemove];

    finalLineItemIDsToRemove = PromotionManager.onRemoveFromCart(
      finalLineItemIDsToRemove,
      cart.checkout.lineItems,
      liveProductData,
      isAuthenticated,
    );

    return finalLineItemIDsToRemove;
  };

  const getLineItem = (lineItemID) => cart.checkout.lineItems.find((li) => li.id === lineItemID);

  const getLiveProduct = (productID) => liveProductData.products.find(
    (product) => product.handle === productID,
  );

  const removeLineItem = (lineItemID) => {
    const checkoutID = cart.checkout.id;
    setCart((prevState) => ({ ...prevState, updating: true }));
    const lineItemsToRemove = onRemoveFromCart(lineItemID);
    return shopifyClient.current?.checkout
      ?.removeLineItems(checkoutID, lineItemsToRemove)
      ?.then((updatedCheckout) => {
        setCart((prevState) => {
          const lineItem = getLineItem(lineItemID);
          const product = getLiveProduct(lineItem.variant.product.handle);
          dataLayerRemoveProductFromCart(product, lineItem.quantity);
          return {
            ...prevState,
            checkout: updatedCheckout,
            updating: false,
          };
        });
      });
  };

  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const existingCheckoutID = isBrowser
        ? localStorage.getItem('shopify_checkout_id')
        : null;

      const fetchCheckout = (id) => shopifyClient.current?.checkout?.fetch(id);

      if (existingCheckoutID) {
        try {
          const existingCheckout = await fetchCheckout(existingCheckoutID);
          // Ensure cart hasn't already been purchased.
          if (!existingCheckout.completedAt) {
            setCheckoutInState(existingCheckout);
            PromotionManager.onAuthentication(
              existingCheckout.lineItems,
              liveProductData,
              isAuthenticated,
              addVariantToCart,
              removeLineItem,
            );
            return;
          }
        } catch (e) {
          localStorage.setItem('shopify_checkout_id', null);
        }
      }
      const newCheckout = await shopifyClient.current?.checkout?.create();
      setCheckoutInState(newCheckout);
    };

    initializeCheckout();
  }, [isBrowser, setCheckoutInState]);

  const onUpdateLineItem = (lineItemsToUpdate) => {
    let finalLineItemsToUpdate = lineItemsToUpdate;
    finalLineItemsToUpdate = PromotionManager.onUpdateLineItem(
      finalLineItemsToUpdate,
      cart.checkout.lineItems,
      liveProductData,
      isAuthenticated,
    );
    return finalLineItemsToUpdate;
  };

  useEffect(() => {
    const onAuthentication = () => {
      PromotionManager.onAuthentication(
        cart.checkout.lineItems,
        liveProductData,
        isAuthenticated,
        addVariantToCart,
        removeLineItem,
      );
    };

    onAuthentication();
  }, [isAuthenticated]);

  const updateLineItem = (lineItemID, quantity) => {
    const checkoutID = cart.checkout.id;

    const lineItemsToUpdate = onUpdateLineItem(
      [{ id: lineItemID, quantity: parseInt(quantity, 10) }],
    );

    setCart((prevState) => ({ ...prevState, updating: true }));

    // Updating a cart does not allow adding new item (gift).
    // Need to call add to cart
    return shopifyClient.current?.checkout
      ?.updateLineItems(checkoutID, lineItemsToUpdate)
      ?.then((updatedCheckout) => {
        const finalLineItemsToAdd = PromotionManager.onAddToCart(
          [],
          updatedCheckout.lineItems,
          liveProductData,
        );
        const lineItem = getLineItem(lineItemID);
        const product = getLiveProduct(lineItem.variant.product.handle);
        if (quantity > lineItem.quantity) {
          dataLayerAddProductToCart(product);
        } else if (quantity < lineItem.quantity) {
          dataLayerRemoveProductFromCart(product);
        }

        if (finalLineItemsToAdd.length) {
          return shopifyClient.current?.checkout
            ?.addLineItems(updatedCheckout.id, finalLineItemsToAdd)
            ?.then((finalCheckout) => {
              setCart((prevState) => (
                { ...prevState, checkout: finalCheckout, updating: false }
              ));
            });
        }
        setCart((prevState) => ({ ...prevState, checkout: updatedCheckout, updating: false }));
      });
  };

  const updateAttributes = (key, value) => {
    const checkoutID = cart.checkout.id;
    return shopifyClient.current?.checkout
      ?.updateAttributes(checkoutID, { customAttributes: [{ key, value }] })
      ?.then((updatedCheckout) => {
        setCart((prevState) => ({ ...prevState, checkout: updatedCheckout, updating: false }));
      });
  };

  const updateEmailAndGoToCheckout = () => shopifyClient.current?.checkout
    ?.updateEmail(cart.checkout.id, user.email)
    ?.then((updatedCheckout) => {
      updateAttributes('cidbid', user.sub.substring(6));
      setCart((prevState) => ({
        ...prevState,
        checkout: updatedCheckout,
        updating: false,
      }));
      window.open(updatedCheckout.webUrl, '_self');
    });

  const goToCheckout = () => {
    window.open(cart.checkout.webUrl, '_self');
  };

  const goToGuestCheckout = () => {
    const savedLineItems = cart.checkout.lineItems.map((lineItem) => ({
      variantId: lineItem.variant.id,
      quantity: lineItem.quantity,
    }));
    if (shopifyClient.current) {
      shopifyClient.current.checkout.create()
        .then((newCheckout) => shopifyClient.current?.checkout
          ?.addLineItems(newCheckout.id, savedLineItems)
          ?.then((guestCheckoutWithLineItems) => {
            setCheckoutInState(guestCheckoutWithLineItems);
            setCart((prevState) => ({ ...prevState, updating: false }));
            window.open(guestCheckoutWithLineItems.webUrl, '_self');
          }));
    }
  };

  return (
    <ShopifyContext.Provider
      value={{
        state,
        dispatch,
        cart,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        updateAttributes,
        getLiveProduct,
        hasShopifyConnection: () => shopifyClient.current,
        goToCheckout: ({ guest = false }) => {
          setCart((prevState) => ({ ...prevState, updating: true }));
          if (guest) {
            // guest checkout requested
            if (cart.checkout.email) {
              // already registered an email with checkout, reset the cart
              goToGuestCheckout();
            } else {
              // no email registered yet, just go to checkout
              goToCheckout();
            }
          } else {
            // non guest checkout, attempt to send email
            updateEmailAndGoToCheckout();
          }
        },
        fetching: liveProductData.fetching,
        fetched: liveProductData.fetched,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
};
