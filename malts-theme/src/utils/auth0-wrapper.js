// src/utils/auth0-wrapper.js
import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import { useDataLayer, userAuthentication, newsletterSignup } from 'malts-theme/src/utils/dataLayer/index';

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState(
  {}, document.title, window.location.pathname,
);

export const Auth0Context = React.createContext({ isAuthenticated: false });
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  locale = 'en-gb',
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [
    dataLayerUserAuthentication,
    dataLayerNewsletterSignup,
  ] = useDataLayer([userAuthentication, newsletterSignup]);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);
      let eventAction = '';
      if (window.location.search.includes('code=')
          && window.location.search.includes('state=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        eventAction = appState?.event;
        onRedirectCallback(appState);
      }

      const isAuthntctd = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthntctd);

      if (isAuthntctd) {
        const usr = await auth0FromHook.getUser();
        setUser(usr);
        if (usr && eventAction === 'authentication') {
          dataLayerUserAuthentication(usr);
          if (usr['https://malts.com/new_signup']) {
            dataLayerNewsletterSignup(usr);
          }
        }
      }

      setLoading(false);
    };
    initAuth0();
  }, []);

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const usr = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(usr);
  };

  const loginWithRedirect = async () => {
    auth0Client.loginWithRedirect({
      redirect_uri: `${window.location.origin}/${locale}/`,
      appState: {
        returnTo: window.location.pathname + window.location.search,
        event: 'authentication',
      },
    });
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect,
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
