import React, { useEffect, useState } from "react";
import StepIndicator from "../components/StepIndicator";
import "./OrderConfirmation.css";

// ============================================
// GENERATE ORDER ID  e.g. FD-2024-00123
// ============================================
const generateOrderId = () => {
  const year   = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `FD-${year}-${random}`;
};

// ============================================
// ORDER CONFIRMATION PAGE
// ============================================
const OrderConfirmation = ({ orderData, onBackToHome }) => {
  const [orderIds, setOrderIds] = useState([]);
  const [show,     setShow]     = useState(false); // triggers CSS fade-in

  const { summary, grandTotal, deliveryAddress } = orderData;
  const restaurantCount = summary.length;

  // Generate one order ID per restaurant on mount
  useEffect(() => {
    setOrderIds(summary.map(() => generateOrderId()));
    // Slight delay so the initial opacity:0 is painted before we add --visible
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, [summary]);

  return (
    <div className="oc-page-wrapper">

      <StepIndicator current={5} />

      {/* ── Confirmation Card — .oc-card--visible triggers CSS fade-in ── */}
      <div className={`oc-card${show ? " oc-card--visible" : ""}`}>

        {/* ── Tick icon ── */}
        <div className="oc-tick-wrapper">
          <div className="oc-tick-circle">✓</div>
        </div>

        {/* ── Thank you heading ── */}
        <h1 className="oc-thank-you-title">Thank You!</h1>

        {/* ── Main message ── */}
        <p className="oc-main-message">
          Your order{restaurantCount > 1 ? "s" : ""} from{" "}
          <strong>{restaurantCount} restaurant{restaurantCount > 1 ? "s" : ""}</strong>{" "}
          will be delivered shortly.
        </p>

        {/* ── Payment message ── */}
        <p className="oc-payment-message">
          You need to pay a total amount of{" "}
          <strong className="oc-highlight-amount">Rs.{grandTotal.toFixed(0)}</strong>{" "}
          to{" "}
          <strong>{restaurantCount} restaurant{restaurantCount > 1 ? "s" : ""}</strong>.
        </p>

        {/* ── Per-restaurant order IDs ── */}
        <div className="oc-orders-wrapper">
          {summary.map((r, idx) => (
            <div key={r.name} className="oc-order-row">

              <div className="oc-order-left">
                <span className="oc-restaurant-icon">🏪</span>
                <div>
                  <p className="oc-restaurant-name">{r.name}</p>
                  <p className="oc-order-id">
                    Order ID: <strong>{orderIds[idx] || "—"}</strong>
                  </p>
                </div>
              </div>

              <div className="oc-order-right">
                <p className="oc-order-amount">Rs.{r.total.toFixed(0)}</p>
                <span className="oc-cod-badge">💵 Pay on Delivery</span>
              </div>

            </div>
          ))}
        </div>

        {/* ── Delivery address recap ── */}
        <div className="oc-address-recap-box">
          <p className="oc-address-recap-title">📍 Delivering To</p>
          <p className="oc-address-recap-text">
            <strong>{deliveryAddress.fullName}</strong> · +91 {deliveryAddress.phone}<br />
            {deliveryAddress.addressLine1}
            {deliveryAddress.addressLine2 ? `, ${deliveryAddress.addressLine2}` : ""}
            {deliveryAddress.landmark ? ` (${deliveryAddress.landmark})` : ""}<br />
            {deliveryAddress.city}, {deliveryAddress.state} — {deliveryAddress.pincode}
          </p>
          {deliveryAddress.instructions && (
            <p className="oc-instructions-text">
              📝 "{deliveryAddress.instructions}"
            </p>
          )}
        </div>

        {/* ── ETA banner ── */}
        <div className="oc-eta-banner">
          <span className="oc-eta-icon">⏱</span>
          <p className="oc-eta-text">
            Estimated delivery time: <strong>30 – 45 minutes</strong>
          </p>
        </div>

        {/* ── Happy Eating ── */}
        <p className="oc-happy-eating">🎉 Happy Eating!</p>

        {/* ── Close — clears cart and returns to homepage ── */}
        <button
          className="oc-back-home-btn"
          onClick={onBackToHome}
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default OrderConfirmation;
