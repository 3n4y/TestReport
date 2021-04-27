const dataLayerAccountUpdate = (acceptMarketing) => ({
  event: 'customEvent',
  eventAction: acceptMarketing ? 'account opt-in' : 'account opt-out',
  eventCategory: 'newsletter',
  eventInteraction: true,
});

export const accountUpdate = (acceptMarketing) => (dataLayer) => dataLayer.push(dataLayerAccountUpdate(acceptMarketing));
