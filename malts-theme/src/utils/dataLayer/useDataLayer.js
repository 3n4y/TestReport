import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const getOrInitializeDataLayer = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  return window.dataLayer;
};

export const useDataLayer = (actions, { debounce = false } = {}) => {
  const { i18n } = useTranslation();
  const dataLayer = useRef(getOrInitializeDataLayer());
  const actionSent = useRef(false);

  const dataLayerAction = (action) => (...args) => {
    if (!(debounce && actionSent.current) && dataLayer.current) {
      actionSent.current = action(...args)(dataLayer.current, i18n);
    }
  };
  return [actions].flat().map((a) => dataLayerAction(a));
};
