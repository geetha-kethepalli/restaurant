import React from "react";
import { useCart } from "./CartContext";
import "./CartDrawer.css";

// ============================================
// CART DRAWER COMPONENT
// ============================================
const CartDrawer = ({ isOpen, onClose, onProceedToCheckout }) => {
  const { cartItems, removeFromCart, addToCart, deleteFromCart, clearCart, totalCost } =
    useCart();

  // Group cart items by restaurant
  const grouped = cartItems.reduce((acc, item) => {
    if (!acc[item.restaurantName]) acc[item.restaurantName] = [];
    acc[item.restaurantName].push(item);
    return acc;
  }, {});

  const restaurantCount = Object.keys(grouped).length;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="cd-overlay" onClick={onClose} />
      )}

      {/* Drawer — BEM modifier drives the open/closed transform */}
      <div className={`cd-drawer${isOpen ? " cd-drawer--open" : " cd-drawer--closed"}`}>

        {/* ── Header ── */}
        <div className="cd-header">
          <div>
            <h2 className="cd-header__title">🛒 Your Cart</h2>
            {cartItems.length > 0 && (
              <p className="cd-header__subtitle">
                {cartItems.reduce((s, i) => s + i.quantity, 0)} item(s) from{" "}
                {restaurantCount} restaurant{restaurantCount > 1 ? "s" : ""}
              </p>
            )}
          </div>

          <div className="cd-header__actions">
            {cartItems.length > 0 && (
              <button className="cd-clear-btn" onClick={clearCart}>
                Clear All
              </button>
            )}
            <button className="cd-close-btn" onClick={onClose}>
              ×
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="cd-body">
          {cartItems.length === 0 ? (

            /* ── Empty state ── */
            <div className="cd-empty">
              <div className="cd-empty__icon">🍽️</div>
              <p className="cd-empty__title">Your cart is empty</p>
              <p className="cd-empty__hint">
                Browse restaurants and add items to get started!
              </p>
            </div>

          ) : (
            <>
              {/* ── List header ── */}
              <div className="cd-list-header">
                <span>Item</span>
                <span className="cd-lh-qty">Qty</span>
                <span className="cd-lh-cost">Cost</span>
                <span />
              </div>

              {/* ── Grouped by Restaurant ── */}
              {Object.entries(grouped).map(([restaurantName, items]) => {
                const restaurantTotal = items.reduce(
                  (s, i) => s + i.price * i.quantity,
                  0
                );
                return (
                  <div className="cd-restaurant-group" key={restaurantName}>

                    {/* Restaurant bar */}
                    <div className="cd-restaurant-bar">
                      <span>🏪 {restaurantName}</span>
                      <span className="cd-restaurant-bar__subtotal">
                        Subtotal: Rs.{restaurantTotal.toFixed(0)}
                      </span>
                    </div>

                    {/* Items */}
                    {items.map((item) => (
                      <div className="cd-item-row" key={item.id}>

                        {/* Item name + unit price */}
                        <div>
                          <p className="cd-item__name">{item.itemName}</p>
                          <p className="cd-item__price">Rs.{item.price} each</p>
                        </div>

                        {/* Qty stepper */}
                        <div className="cd-stepper">
                          <button
                            className="cd-stepper__btn cd-stepper__btn--remove"
                            onClick={() => removeFromCart(restaurantName, item.itemName)}
                          >
                            −
                          </button>
                          <span className="cd-stepper__qty">{item.quantity}</span>
                          <button
                            className="cd-stepper__btn cd-stepper__btn--add"
                            onClick={() =>
                              addToCart(
                                { id: item.id, name: restaurantName },
                                { name: item.itemName, price: item.price } // already a number — no Rs. wrapping
                              )
                            }
                          >
                            +
                          </button>
                        </div>

                        {/* Row cost */}
                        <p className="cd-item__cost">
                          Rs.{(item.price * item.quantity).toFixed(0)}
                        </p>

                        {/* Delete */}
                        <button
                          className="cd-item__delete"
                          onClick={() => deleteFromCart(restaurantName, item.itemName)}
                          title="Remove item"
                        >
                          🗑
                        </button>

                      </div>
                    ))}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* ── Footer / Total ── */}
        {cartItems.length > 0 && (
          <div className="cd-footer">

            {/* Summary table */}
            <table className="cd-summary-table">
              <thead>
                <tr>
                  <th className="cd-th">Restaurant</th>
                  <th className="cd-th">Item</th>
                  <th className="cd-th cd-th--center">Qty</th>
                  <th className="cd-th cd-th--right">Cost</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="cd-td">{item.restaurantName}</td>
                    <td className="cd-td">{item.itemName}</td>
                    <td className="cd-td cd-td--center">{item.quantity}</td>
                    <td className="cd-td cd-td--right cd-td--bold">
                      Rs.{(item.price * item.quantity).toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Grand Total bar */}
            <div className="cd-grand-total">
              <span className="cd-grand-total__label">
                Grand Total ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <span className="cd-grand-total__amount">
                Rs.{totalCost.toFixed(0)}
              </span>
            </div>

            {/* Checkout */}
            <button
              className="cd-checkout-btn"
              onClick={() => { onClose(); onProceedToCheckout(); }}
            >
              Proceed to Checkout →
            </button>

          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
