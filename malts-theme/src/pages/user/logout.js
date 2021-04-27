import React, { useEffect } from 'react';
import { useAuth0 } from 'malts-theme/src/utils/auth0-wrapper';
import { useTranslation } from 'react-i18next';

const UserLogoutPage = () => {
  const { logout } = useAuth0();
  const { i18n } = useTranslation();

  useEffect(() => {
    const fn = async () => {
      await logout({ returnTo: `${window.location.origin}/${i18n.language}/?agp=true` });
    };
    fn();
  }, [logout]);

  return (<>  </>);
};

export default UserLogoutPage;
