import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useAuth0 } from 'malts-theme/src/utils/auth0-wrapper';
import Layout from 'malts-theme/src/components/layout';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';

const UserLoginPage = ({ location }) => {
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
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

  useEffect(() => {
    if (loading || isAuthenticated) {
      navigate('user/account');
    }
    const fn = async () => { await loginWithRedirect(); };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect]);

  return (<>  </>);
};

export default UserLoginPage;
