const dataLayerPopupRegister = () => ({
  event: 'customEvent',
  eventCategory: 'registration',
  eventAction: 'popup registration',
  eventInteraction: true,
});

export const popupRegister = () => (dataLayer) => dataLayer.push(dataLayerPopupRegister());
