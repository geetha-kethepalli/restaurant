import React, { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import { ADDRESS_TYPES, INDIAN_STATES } from "./addressData";
import "./AddressPage.css";

// ============================================
// INITIAL FORM STATE
// ============================================
const EMPTY_FORM = {
  fullName:     "",
  phone:        "",
  addressLine1: "",
  addressLine2: "",
  landmark:     "",
  city:         "",
  state:        "",
  pincode:      "",
  addressType:  "Home",
  instructions: "",
};

// ============================================
// VALIDATION RULES
// ============================================
const validate = (form) => {
  const errors = {};

  if (!form.fullName.trim())
    errors.fullName = "Full name is required";
  else if (form.fullName.trim().length < 3)
    errors.fullName = "Name must be at least 3 characters";

  if (!form.phone.trim())
    errors.phone = "Phone number is required";
  else if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
    errors.phone = "Enter a valid 10-digit Indian mobile number";

  if (!form.addressLine1.trim())
    errors.addressLine1 = "Address is required";
  else if (form.addressLine1.trim().length < 10)
    errors.addressLine1 = "Please enter a more complete address";

  if (!form.city.trim())
    errors.city = "City is required";

  if (!form.state)
    errors.state = "Please select a state";

  if (!form.pincode.trim())
    errors.pincode = "Pincode is required";
  else if (!/^\d{6}$/.test(form.pincode.trim()))
    errors.pincode = "Enter a valid 6-digit pincode";

  return errors;
};

// ============================================
// FIELD COMPONENT
// ============================================
const Field = ({ label, required, error, children }) => (
  <div className="addr-field-wrapper">
    <label className="addr-label">
      {label}
      {required && <span className="addr-required-star"> *</span>}
    </label>
    {children}
    {error && <span className="addr-error-text">⚠ {error}</span>}
  </div>
);

// ============================================
// ORDER MINI SUMMARY (right sidebar)
// ============================================
const OrderMiniSummary = ({ orderData }) => {
  if (!orderData) return null;
  const { summary, grandTotal } = orderData;

  return (
    <div className="addr-mini-summary-card">
      <h3 className="addr-mini-summary-title">🧾 Order Summary</h3>

      {summary.map((r) => (
        <div key={r.name} className="addr-mini-restaurant-row">
          <div className="addr-mini-restaurant-name">🏪 {r.name}</div>

          <div className="addr-mini-breakdown">
            <span>Items</span>
            <span>Rs.{r.subtotal.toFixed(0)}</span>
          </div>

          <div className="addr-mini-breakdown">
            <span>Delivery</span>
            {/* Runtime conditional: stays as inline style */}
            <span style={{ color: r.deliveryFee === 0 ? "#27ae60" : "#333" }}>
              {r.deliveryFee === 0 ? "FREE" : `Rs.${r.deliveryFee}`}
            </span>
          </div>

          <div className="addr-mini-breakdown">
            <span>GST</span>
            <span>Rs.{r.gst}</span>
          </div>
        </div>
      ))}

      <div className="addr-mini-divider" />

      <div className="addr-mini-grand-total">
        <span>Grand Total</span>
        {/* One-off brand color + weight: stays as inline style */}
        <span style={{ color: "#e74c3c", fontWeight: 800 }}>
          Rs.{grandTotal.toFixed(0)}
        </span>
      </div>
    </div>
  );
};

// ============================================
// MAIN ADDRESS PAGE
// ============================================
const AddressPage = ({ orderData, onBack, onProceed }) => {
  const [form, setForm]           = useState(EMPTY_FORM);
  const [errors, setErrors]       = useState({});
  const [touched, setTouched]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ── Field change handler ──
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validate({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  // ── Blur handler — mark field as touched ──
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  // ── Submit ──
  const handleSubmit = () => {
    setSubmitted(true);
    const allTouched = Object.keys(EMPTY_FORM).reduce(
      (acc, key) => ({ ...acc, [key]: true }), {}
    );
    setTouched(allTouched);

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = document.querySelector("[data-error='true']");
      if (firstErrorField)
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    onProceed({ ...orderData, deliveryAddress: form });
  };

  // ── Dynamic input style: only borderColor + backgroundColor are runtime values ──
  // All other input styles live in .addr-input CSS class
  const inputStyle = (field) => ({
    borderColor:     errors[field] && touched[field] ? "#e74c3c" : "#ddd",
    backgroundColor: errors[field] && touched[field] ? "#fff8f8" : "#fff",
  });

  return (
    <div className="addr-page-wrapper">

      {/* ── Page Header ── */}
      <div className="addr-page-header">
        <button className="addr-back-btn" onClick={onBack}>
          ← Back to Order Summary
        </button>
        <div>
          <h1 className="addr-page-title">Delivery Address</h1>
          <p className="addr-page-subtitle">Where should we deliver your order?</p>
        </div>
      </div>

      {/* ── Step Indicator ── */}
      <StepIndicator current={3} />

      {/* ── Main Layout ── */}
      <div className="addr-main-layout">

        {/* ── LEFT: Address Form ── */}
        <div className="addr-form-card">

          {/* Address Type selector */}
          <div className="addr-type-row">
            {ADDRESS_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => handleChange("addressType", type)}
                className={`addr-type-btn${form.addressType === type ? " addr-type-btn--active" : ""}`}
              >
                {type === "Home" ? "🏠" : type === "Work" ? "🏢" : "📍"} {type}
              </button>
            ))}
          </div>

          <div className="addr-divider" />

          {/* ── Row 1: Full Name + Phone ── */}
          <div className="addr-row">
            <Field label="Full Name" required error={touched.fullName && errors.fullName}>
              <input
                data-error={!!(touched.fullName && errors.fullName)}
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                className="addr-input"
                style={inputStyle("fullName")}
              />
            </Field>

            <Field label="Mobile Number" required error={touched.phone && errors.phone}>
              <div className="addr-phone-wrapper">
                <span className="addr-phone-prefix">+91</span>
                <input
                  data-error={!!(touched.phone && errors.phone)}
                  type="tel"
                  placeholder="9876543210"
                  value={form.phone}
                  maxLength={10}
                  onChange={(e) => handleChange("phone", e.target.value.replace(/\D/, ""))}
                  onBlur={() => handleBlur("phone")}
                  className="addr-input addr-input--phone"
                  style={inputStyle("phone")}
                />
              </div>
            </Field>
          </div>

          {/* ── Address Line 1 ── */}
          <Field
            label="Flat / House No. / Building / Street"
            required
            error={touched.addressLine1 && errors.addressLine1}
          >
            <input
              data-error={!!(touched.addressLine1 && errors.addressLine1)}
              type="text"
              placeholder="e.g. Flat 4B, Sunrise Apartments, MG Road"
              value={form.addressLine1}
              onChange={(e) => handleChange("addressLine1", e.target.value)}
              onBlur={() => handleBlur("addressLine1")}
              className="addr-input"
              style={inputStyle("addressLine1")}
            />
          </Field>

          {/* ── Address Line 2 ── */}
          <Field label="Area / Locality / Colony" error={null}>
            <input
              type="text"
              placeholder="e.g. Koramangala (optional)"
              value={form.addressLine2}
              onChange={(e) => handleChange("addressLine2", e.target.value)}
              className="addr-input"
            />
          </Field>

          {/* ── Landmark ── */}
          <Field label="Landmark" error={null}>
            <input
              type="text"
              placeholder="e.g. Near State Bank, Opposite City Mall (optional)"
              value={form.landmark}
              onChange={(e) => handleChange("landmark", e.target.value)}
              className="addr-input"
            />
          </Field>

          {/* ── Row 2: City + Pincode ── */}
          <div className="addr-row">
            <Field label="City" required error={touched.city && errors.city}>
              <input
                data-error={!!(touched.city && errors.city)}
                type="text"
                placeholder="e.g. Bengaluru"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                onBlur={() => handleBlur("city")}
                className="addr-input"
                style={inputStyle("city")}
              />
            </Field>

            <Field label="Pincode" required error={touched.pincode && errors.pincode}>
              <input
                data-error={!!(touched.pincode && errors.pincode)}
                type="text"
                placeholder="e.g. 560034"
                value={form.pincode}
                maxLength={6}
                onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/, ""))}
                onBlur={() => handleBlur("pincode")}
                className="addr-input"
                style={inputStyle("pincode")}
              />
            </Field>
          </div>

          {/* ── State ── */}
          <Field label="State" required error={touched.state && errors.state}>
            <select
              data-error={!!(touched.state && errors.state)}
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              onBlur={() => handleBlur("state")}
              className="addr-input"
              style={{
                ...inputStyle("state"),
                // Placeholder colour: grey when unselected, dark when selected
                color: form.state ? "#333" : "#aaa",
              }}
            >
              <option value="" disabled>Select your state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          {/* ── Delivery Instructions ── */}
          <Field label="Delivery Instructions" error={null}>
            <textarea
              placeholder="e.g. Please ring the bell twice. Leave at door if no response."
              value={form.instructions || ""}
              onChange={(e) => handleChange("instructions", e.target.value)}
              rows={3}
              className="addr-input addr-input--textarea"
            />
          </Field>

          {/* ── Validation error summary ── */}
          {submitted && Object.keys(errors).length > 0 && (
            <div className="addr-error-banner">
              ⚠️ Please fix {Object.keys(errors).length} error(s) above before proceeding.
            </div>
          )}

          {/* ── Submit Button ── */}
          <button
            className="addr-proceed-btn"
            onClick={handleSubmit}
          >
            Proceed to Place Order →
          </button>

          <p className="addr-secure-note">
            🔒 Your address is securely stored and only used for delivery
          </p>
        </div>

        {/* ── RIGHT: Order mini summary ── */}
        <div className="addr-right-col">
          <OrderMiniSummary orderData={orderData} />

          {/* Delivery promise card */}
          <div className="addr-promise-card">
            <h4 className="addr-promise-title">📦 Delivery Promise</h4>
            <div className="addr-promise-row">
              <span>⏱</span>
              <span>Estimated delivery: <strong>30–45 mins</strong></span>
            </div>
            <div className="addr-promise-row">
              <span>🛵</span>
              <span>Live tracking once order is confirmed</span>
            </div>
            <div className="addr-promise-row">
              <span>📞</span>
              <span>Rider will call before delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
