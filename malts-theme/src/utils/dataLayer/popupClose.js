const dataLayerPopupClose = () => ({
  event: 'customEvent',
  eventCategory: 'close',
  eventAction: 'popup close',
  eventInteraction: true,
});

export const popupClose = () => (dataLayer) => dataLayer.push(dataLayerPopupClose());
