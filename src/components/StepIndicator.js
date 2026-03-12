import React from "react";
import "./StepIndicator.css";

// ============================================
// SHARED STEP INDICATOR
// Used across all checkout pages
// Steps: Cart(1) → Order Summary(2) → Address(3) → Payment(4) → Confirmation(5)
// ============================================
const StepIndicator = ({ current }) => {
  const steps = ["Cart", "Order Summary", "Address", "Payment", "Confirmation"];

  return (
    <div className="si-wrapper">
      {steps.map((label, idx) => {
        const stepNum  = idx + 1;
        const isActive = stepNum === current;
        const isDone   = stepNum < current;

        return (
          <React.Fragment key={label}>

            <div className="si-item">

              {/* Step circle — BEM modifiers drive colour/shadow per state */}
              <div
                className={[
                  "si-circle",
                  isActive ? "si-circle--active" : "",
                  isDone   ? "si-circle--done"   : "",
                ].filter(Boolean).join(" ")}
              >
                {isDone ? "✓" : stepNum}
              </div>

              {/* Step label — BEM modifiers drive colour/weight per state */}
              <span
                className={[
                  "si-label",
                  isActive ? "si-label--active" : "",
                  isDone   ? "si-label--done"   : "",
                ].filter(Boolean).join(" ")}
              >
                {label}
              </span>

            </div>

            {/* Connector line between steps */}
            {idx < steps.length - 1 && (
              <div
                className={[
                  "si-line",
                  isDone ? "si-line--done" : "",
                ].filter(Boolean).join(" ")}
              />
            )}

          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
