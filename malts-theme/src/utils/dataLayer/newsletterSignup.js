const dataLayerNewsletterSignup = (user) => ({
  event: 'customEvent',
  eventAction: user['https://malts.com/accepts_marketing'] ? 'registration opt-in' : 'registration opt-out',
  eventCategory: 'newsletter',
  eventInteraction: true,
});

export const newsletterSignup = (user) => (dataLayer) => dataLayer.push(dataLayerNewsletterSignup(user));
