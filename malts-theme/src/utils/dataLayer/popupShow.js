const dataLayerPopupShow = () => ({
  event: 'customEvent',
  eventCategory: 'show',
  eventAction: 'popup show',
  eventInteraction: true,
});

export const popupShow = () => (dataLayer) => dataLayer.push(dataLayerPopupShow());
