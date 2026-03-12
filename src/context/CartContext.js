import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (restaurant, item) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (ci) => ci.itemName === item.name && ci.restaurantName === restaurant.name
      );
      if (existing) {
        return prev.map((ci) =>
          ci.itemName === item.name && ci.restaurantName === restaurant.name
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [
        ...prev,
        {
          id:             `${restaurant.id}-${item.name}`,
          restaurantName: restaurant.name,
          itemName:       item.name,
          price:          parsePrice(item.price),
          quantity:       1,
        },
      ];
    });
  };

  const removeFromCart = (restaurantName, itemName) => {
    setCartItems((prev) =>
      prev
        .map((ci) =>
          ci.itemName === itemName && ci.restaurantName === restaurantName
            ? { ...ci, quantity: ci.quantity - 1 }
            : ci
        )
        .filter((ci) => ci.quantity > 0)
    );
  };

  const deleteFromCart = (restaurantName, itemName) => {
    setCartItems((prev) =>
      prev.filter(
        (ci) => !(ci.itemName === itemName && ci.restaurantName === restaurantName)
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  const totalCost = cartItems.reduce(
    (sum, ci) => sum + ci.price * ci.quantity,
    0
  );

  const getItemQuantity = (restaurantName, itemName) => {
    const found = cartItems.find(
      (ci) => ci.itemName === itemName && ci.restaurantName === restaurantName
    );
    return found ? found.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        totalItems,
        totalCost,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Utility: parse "Rs.320" → 320  (also handles already-numeric values)
export const parsePrice = (priceStr) => {
  if (typeof priceStr === "number") return isNaN(priceStr) ? 0 : priceStr;
  const cleaned = String(priceStr)
    .replace(/Rs\.?\s*/i, "")   // remove "Rs." or "Rs" prefix
    .replace(/[^0-9.]/g, "")    // strip remaining non-numeric chars
    .trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};
