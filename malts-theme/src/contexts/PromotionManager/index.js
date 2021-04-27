import JWFreeGiftManager from './JWFreeGiftManager';
import TaliskerFreeGiftManager from './TaliskerFreeGiftManager';
import Bundle3xFreeGiftManager from './Bundle3xFreeGiftManager';
import TaliskerMultiPackFreeGiftManager from './TaliskerMultiPackFreeGiftManager';
import TaliskerDryBagGift from './TaliskerDryBagGift';
import { EngravingPromotion } from './EngravingPromotion';
import { PreorderPromotion } from './PreorderPromotion';

export const giftHandles = [
  TaliskerFreeGiftManager.giftHandle,
  JWFreeGiftManager.giftHandle,
  Bundle3xFreeGiftManager.giftHandle,
  TaliskerMultiPackFreeGiftManager.giftHandle,
  TaliskerDryBagGift.giftHandle,
];

export const customPurchaseFormFor = (product, variantId) => {
  const customFormProvider = [PreorderPromotion, EngravingPromotion].find(
    (promotion) => promotion.hasCustomPurchaseFormFor(product, variantId),
  );
  return customFormProvider?.CustomPurchaseForm;
};

export const customProductTileFor = (product) => {
  const customProductTileProvider = [EngravingPromotion].find(
    (promotion) => promotion.hasCustomProductTileFor(product),
  );
  return customProductTileProvider?.CustomProductTile;
};

export const MappedLineItems = (lineItems, liveProductData) => lineItems.map((lineItem) => {
  const variantId = lineItem.variant ? lineItem.variant.id : lineItem.variantId;
  const lineItemProduct = liveProductData.products.find(
    (product) => product.variants.map((t) => t.id).includes(variantId),
  );

  if (lineItemProduct) {
    const firstVariant = lineItemProduct.variants
      ? lineItemProduct.variants[0] : lineItemProduct.variant;

    return {
      id: lineItem.id,
      variant_id: firstVariant.id,
      quantity: lineItem.quantity,
      price: firstVariant.price,
      handle: lineItemProduct.handle,
    };
  }

  return {
    id: lineItem.id, variant_id: variantId, quantity: lineItem.quantity, price: 0.0, handle: '',
  };
});

const applicableLineItems = (giftHandle, lineItems, liveProductData) => {
  switch (giftHandle) {
    case Bundle3xFreeGiftManager.giftHandle:
      return MappedLineItems(
        Bundle3xFreeGiftManager.lineItems(lineItems, liveProductData), liveProductData,
      );
    case JWFreeGiftManager.giftHandle:
      return MappedLineItems(
        JWFreeGiftManager.lineItems(lineItems, liveProductData), liveProductData,
      );
    case TaliskerFreeGiftManager.giftHandle:
      return MappedLineItems(
        TaliskerFreeGiftManager.lineItems(lineItems, liveProductData), liveProductData,
      );
    case TaliskerMultiPackFreeGiftManager.giftHandle:
      return MappedLineItems(
        TaliskerMultiPackFreeGiftManager.lineItems(lineItems, liveProductData), liveProductData,
      );
    case TaliskerDryBagGift.giftHandle:
      return MappedLineItems(
        TaliskerDryBagGift.lineItems(lineItems, liveProductData), liveProductData,
      );
    default:
      return [];
  }
};

const eligibleForGift = (giftHandle, lineItems, isAuthenticated) => {
  switch (giftHandle) {
    case Bundle3xFreeGiftManager.giftHandle:
      return Bundle3xFreeGiftManager.eligibleForGift(lineItems);
    case JWFreeGiftManager.giftHandle:
      return JWFreeGiftManager.eligibleForGift(lineItems, isAuthenticated);
    case TaliskerFreeGiftManager.giftHandle:
      return TaliskerFreeGiftManager.eligibleForGift(lineItems);
    case TaliskerMultiPackFreeGiftManager.giftHandle:
      return TaliskerMultiPackFreeGiftManager.eligibleForGift(lineItems);
    case TaliskerDryBagGift.giftHandle:
      return TaliskerDryBagGift.eligibleForGift(lineItems);
    default:
      return false;
  }
};

const existingGift = (giftHandle, lineItems) => lineItems.find(
  (lineItem) => lineItem.variant.product.handle === giftHandle,
);

const hasGift = (giftHandle, lineItems) => existingGift(giftHandle, lineItems) !== undefined;

const PromotionManager = {
  onAddToCart: (
    lineItemsToAdd,
    lineItems,
    liveProductData,
    isAuthenticated,
  ) => {
    const giftLineItemsToAdd = giftHandles.map((giftHandle) => {
      const items = applicableLineItems(
        giftHandle, [...lineItems, ...lineItemsToAdd], liveProductData,
      );

      if (eligibleForGift(giftHandle, items, isAuthenticated) && !hasGift(giftHandle, lineItems)) {
        // Gift not yet in cart add it if eligible
        const freeGift = liveProductData.products.find(
          (product) => product.handle === giftHandle,
        );

        if (freeGift?.availableForSale) {
          const [freeGiftVariant] = freeGift.variants;
          const addingFreeGift = lineItemsToAdd.find(
            (lineItem) => freeGiftVariant.id === lineItem.variantId,
          );
          if (!addingFreeGift) {
            return { variantId: freeGiftVariant.id, quantity: 1 };
          }
        }
      }
    });
    // if there are no changes to make, return the original
    return [...lineItemsToAdd, ...giftLineItemsToAdd];
  },

  onRemoveFromCart: (lineItemToRemoveIDs, lineItems, liveProductData, isAuthenticated) => {
    const giftLineItemToRemoveIDs = giftHandles.map((giftHandle) => {
      if (hasGift(giftHandle, lineItems)) {
        const items = applicableLineItems(giftHandle, lineItems, liveProductData);
        const remainingLineItems = items.filter(
          (lineItem) => !(lineItemToRemoveIDs.includes(lineItem.id)
                          || giftHandles.includes(lineItem.handle)),
        );

        if (!eligibleForGift(giftHandle, remainingLineItems, isAuthenticated)) {
          // Remove free gift
          return existingGift(giftHandle, lineItems).id;
        }
      }
      return giftLineItemToRemoveIDs;
    });
    // if there are no changes to make, return the original
    return [...lineItemToRemoveIDs, ...giftLineItemToRemoveIDs];
  },

  onUpdateLineItem: (lineItemsToUpdate, lineItems, liveProductData, isAuthenticated) => {
    const giftLineItemsToUpdate = giftHandles.map((giftHandle) => {
      const cartAfterUpdate = lineItems.map((lineItem) => {
        const lineItemUpdate = lineItemsToUpdate.find(
          (lineItemToUpdate) => lineItemToUpdate.id === lineItem.id,
        );
        if (lineItemUpdate) {
          return { ...lineItem, quantity: lineItemUpdate.quantity };
        }
        return lineItem;
      });

      const items = applicableLineItems(giftHandle, cartAfterUpdate, liveProductData);
      if (hasGift(giftHandle, lineItems) && !eligibleForGift(giftHandle, items, isAuthenticated)) {
        // does the result of the update drop below threshold remove free gift
        const removeGiftUpdate = { id: existingGift(giftHandle, lineItems).id, quantity: 0 };
        return removeGiftUpdate;
      }
    });

    return [...lineItemsToUpdate, ...giftLineItemsToUpdate];
  },

  onAuthentication: (
    lineItems, liveProductData, isAuthenticated, addVariantToCart, removeLineItem,
  ) => {
    giftHandles.map((giftHandle) => {
      if (giftHandle === JWFreeGiftManager.giftHandle) {
        const items = applicableLineItems(giftHandle, lineItems, liveProductData);
        const eligible = eligibleForGift(giftHandle, items, isAuthenticated);
        if (eligible && !hasGift(giftHandle, lineItems)) {
          const freeGift = liveProductData.products.find(
            (product) => product.handle === giftHandle,
          );
          if (freeGift?.availableForSale) {
            const [freeGiftVariant] = freeGift.variants;
            addVariantToCart(freeGiftVariant.id, 1);
          }
        }
        if (!eligible && hasGift(giftHandle, lineItems)) {
          removeLineItem(existingGift(giftHandle, lineItems).id);
        }
      }
    });
  },
};

export default PromotionManager;
