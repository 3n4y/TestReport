const dataLayerPopupLogin = () => ({
  event: 'customEvent',
  eventCategory: 'login',
  eventAction: 'popup login',
  eventInteraction: true,
});

export const popupLogin = () => (dataLayer) => dataLayer.push(dataLayerPopupLogin());
