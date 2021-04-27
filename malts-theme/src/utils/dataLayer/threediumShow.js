const dataLayerShowThreedium = (product) => ({
  event: 'customEvent',
  eventAction: '3D View',
  eventCategory: 'Engagement',
  eventLabel: product,
  eventInteraction: true,
});

export const threediumShow = (product) => (dataLayer) => dataLayer.push(
  dataLayerShowThreedium(product),
);
