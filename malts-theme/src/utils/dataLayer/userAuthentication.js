const dataLayerUserAuthentication = (user) => ({
  event: 'customEvent',
  cidbid: user.sub.substring(6),
  eventCategory: user['https://malts.com/new_signup'] ? 'registration' : 'login',
  eventAction: user['https://malts.com/new_signup'] ? 'registration success' : 'login success',
  eventInteraction: true,
});

export const userAuthentication = (user) => (dataLayer) => dataLayer.push(dataLayerUserAuthentication(user));
