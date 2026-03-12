import React, { useMemo } from "react";
import StepIndicator from "../components/StepIndicator";
import { useCart } from "../context/CartContext";
import "./OrderSummary.css";

// ============================================
// PRICE PARSER — handles "Rs.320" → 320
// ============================================
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  if (typeof priceStr === "number") return isNaN(priceStr) ? 0 : priceStr;
  const num = parseFloat(
    priceStr.toString().replace(/Rs\.?\s*/i, "").replace(/[^0-9.]/g, "")
  );
  return isNaN(num) ? 0 : num;
};

// ============================================
// DELIVERY FEE LOGIC
// Free delivery above threshold, else tiered
// by order value — mirrors real-world apps
// ============================================
const FREE_DELIVERY_THRESHOLD = 500; // Rs.500+ = free delivery

const calcDeliveryFee = (subtotal) => {
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  if (subtotal >= 300) return 30;
  if (subtotal >= 200) return 40;
  return 50;
};

// GST rate
const GST_RATE = 0.05; // 5%


// ============================================
// RESTAURANT ORDER CARD
// ============================================
const RestaurantOrderCard = ({ restaurantName, items }) => {
  const itemSubtotal   = items.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0);
  const deliveryFee    = calcDeliveryFee(itemSubtotal);
  const gst            = Math.round(itemSubtotal * GST_RATE);
  const total          = itemSubtotal + deliveryFee + gst;
  const isFreeDelivery = deliveryFee === 0;

  return (
    <div className="os-card">

      {/* ── Card Header ── */}
      <div className="os-card-header">
        <div className="os-card-header-inner">
          <div className="os-restaurant-icon">🏪</div>
          <div>
            <h3 className="os-restaurant-name">{restaurantName}</h3>
            <span className="os-item-count">
              {items.reduce((s, i) => s + i.qty, 0)} item(s)
            </span>
          </div>
        </div>
        {isFreeDelivery && (
          <span className="os-free-delivery-badge">🎉 Free Delivery</span>
        )}
      </div>

      {/* ── Items Table ── */}
      <div className="os-items-table">
        <div className="os-table-header">
          <span className="os-col-item">Item</span>
          <span className="os-col-qty">Qty</span>
          <span className="os-col-price">Price</span>
          <span className="os-col-total">Total</span>
        </div>

        {items.map((item) => (
          <div key={item.id} className="os-table-row">
            <span className="os-col-item">{item.name}</span>
            <span className="os-col-qty">× {item.qty}</span>
            <span className="os-col-price">Rs.{parsePrice(item.price)}</span>
            <span className="os-col-total">
              Rs.{(parsePrice(item.price) * item.qty).toFixed(0)}
            </span>
          </div>
        ))}
      </div>

      {/* ── Bill Breakdown ── */}
      <div className="os-bill-breakdown">

        <div className="os-bill-row">
          <span className="os-bill-label">Item Total</span>
          <span className="os-bill-value">Rs.{itemSubtotal.toFixed(0)}</span>
        </div>

        <div className="os-bill-row">
          <span className="os-bill-label">
            Delivery Fee
            {isFreeDelivery && (
              <span className="os-saved-tag"> (You saved Rs.50!)</span>
            )}
            {!isFreeDelivery && itemSubtotal < FREE_DELIVERY_THRESHOLD && (
              <span className="os-free-hint">
                {" "}· Add Rs.{(FREE_DELIVERY_THRESHOLD - itemSubtotal).toFixed(0)} for free delivery
              </span>
            )}
          </span>
          {isFreeDelivery ? (
            <span className="os-bill-value os-bill-value--free">FREE</span>
          ) : (
            <span className="os-bill-value">Rs.{deliveryFee}</span>
          )}
        </div>

        <div className="os-bill-row">
          <span className="os-bill-label">GST (5%)</span>
          <span className="os-bill-value">Rs.{gst}</span>
        </div>

        <div className="os-bill-divider" />

        <div className="os-bill-row os-bill-row--total">
          <span className="os-bill-total-label">Restaurant Total</span>
          <span className="os-bill-total-value">Rs.{total.toFixed(0)}</span>
        </div>

      </div>
    </div>
  );
};


// ============================================
// GRAND TOTAL SUMMARY CARD
// ============================================
const GrandTotalCard = ({ grouped, onProceed }) => {
  const summary = useMemo(() => {
    return Object.entries(grouped).map(([name, items]) => {
      const subtotal    = items.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0);
      const deliveryFee = calcDeliveryFee(subtotal);
      const gst         = Math.round(subtotal * GST_RATE);
      return { name, subtotal, deliveryFee, gst, total: subtotal + deliveryFee + gst };
    });
  }, [grouped]);

  const grandItemTotal   = summary.reduce((s, r) => s + r.subtotal, 0);
  const grandDeliveryFee = summary.reduce((s, r) => s + r.deliveryFee, 0);
  const grandGST         = summary.reduce((s, r) => s + r.gst, 0);
  const grandTotal       = summary.reduce((s, r) => s + r.total, 0);
  const totalItems       = Object.values(grouped).flat().reduce((s, i) => s + i.qty, 0);

  return (
    <div className="os-grand-card">
      <h3 className="os-grand-title">💳 Payment Summary</h3>

      {/* Per-restaurant quick summary */}
      <div className="os-per-restaurant-summary">
        {summary.map((r) => (
          <div key={r.name} className="os-summary-restaurant-row">
            <span className="os-summary-restaurant-name">🏪 {r.name}</span>
            <span className="os-summary-restaurant-total">Rs.{r.total.toFixed(0)}</span>
          </div>
        ))}
      </div>

      <div className="os-grand-divider" />

      {/* Totals breakdown */}
      <div className="os-grand-breakdown">
        <div className="os-grand-row">
          <span>Item Total ({totalItems} items)</span>
          <span>Rs.{grandItemTotal.toFixed(0)}</span>
        </div>
        <div className="os-grand-row">
          <span>Total Delivery Fees</span>
          {/* Runtime conditional: free (green) vs charged (dark) — kept as inline style */}
          <span style={{ color: grandDeliveryFee === 0 ? "#27ae60" : "#333" }}>
            {grandDeliveryFee === 0 ? "FREE" : `Rs.${grandDeliveryFee}`}
          </span>
        </div>
        <div className="os-grand-row">
          <span>Total GST</span>
          <span>Rs.{grandGST}</span>
        </div>
      </div>

      <div className="os-grand-total-row">
        <span className="os-grand-total-label">Grand Total</span>
        <span className="os-grand-total-amount">Rs.{grandTotal.toFixed(0)}</span>
      </div>

      {grandDeliveryFee > 0 && (
        <p className="os-delivery-note">
          💡 Add more items to reach Rs.{FREE_DELIVERY_THRESHOLD} per restaurant for free delivery
        </p>
      )}

      <button
        className="os-proceed-btn"
        onClick={() => onProceed({ summary, grandTotal })}
      >
        Proceed to Delivery Address →
      </button>

      <p className="os-secure-note">🔒 Secured &amp; encrypted checkout</p>
    </div>
  );
};


// ============================================
// MAIN ORDER SUMMARY PAGE
// ============================================
const OrderSummary = ({ cartItems: cartItemsProp, onBack, onProceed }) => {
  // Accept cartItems as a prop (from Home.js internal state)
  // OR fall back to CartContext if used standalone
  const cartContext = useCart();
  const cartItems   = cartItemsProp ?? cartContext.cartItems;

  // Group cart items by restaurant
  const grouped = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (!acc[item.restaurantName]) acc[item.restaurantName] = [];
      acc[item.restaurantName].push(item);
      return acc;
    }, {});
  }, [cartItems]);

  const restaurantCount = Object.keys(grouped).length;

  if (cartItems.length === 0) {
    return (
      <div className="os-empty-state">
        <div className="os-empty-icon">🛒</div>
        <h2 className="os-empty-heading">Your cart is empty</h2>
        <button className="os-back-btn-empty" onClick={onBack}>
          ← Back to Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="os-page-wrapper">

      {/* ── Page Header ── */}
      <div className="os-page-header">
        <button className="os-back-btn" onClick={onBack}>
          ← Back to Cart
        </button>
        <div>
          <h1 className="os-page-title">Order Summary</h1>
          <p className="os-page-subtitle">
            {restaurantCount} restaurant{restaurantCount > 1 ? "s" : ""} ·{" "}
            {cartItems.reduce((s, i) => s + i.qty, 0)} items
          </p>
        </div>
      </div>

      {/* ── Step Indicator ── */}
      <StepIndicator current={2} />

      {/* ── Multi-restaurant warning ── */}
      {restaurantCount > 1 && (
        <div className="os-multi-warning">
          <span className="os-warning-icon">⚠️</span>
          <p className="os-warning-text">
            You have items from <strong>{restaurantCount} restaurants</strong>.
            Each will be placed as a <strong>separate order</strong> with its own
            delivery fee and estimated arrival time.
          </p>
        </div>
      )}

      {/* ── Main Layout ── */}
      <div className="os-main-layout">

        {/* Left — Per-restaurant cards */}
        <div>
          <h2 className="os-section-title">📋 Order Details</h2>
          {Object.entries(grouped).map(([restaurantName, items]) => (
            <RestaurantOrderCard
              key={restaurantName}
              restaurantName={restaurantName}
              items={items}
            />
          ))}
        </div>

        {/* Right — Grand total sticky card */}
        <div className="os-right-col">
          <GrandTotalCard grouped={grouped} onProceed={onProceed} />
        </div>

      </div>
    </div>
  );
};

export default OrderSummary;
