import React from "react";
import "./RestaurantCard.css";

// 👇 Removed Link import — we use modal instead of routing
function RestaurantCard({ restaurant, onViewDetails }) {

  return (
    <div className="rc-card">

      {/* Restaurant Image */}
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="rc-card__image"
        onError={(e) => {
          e.target.src =
            "https://placehold.co/300x160/e74c3c/white?text=Restaurant";
        }}
      />

      {/* Card Content */}
      <div className="rc-card__content">

        {/* Top Section — Name, Rating, Cuisine */}
        <div>

          {/* Restaurant Name — clamped to 2 lines */}
          <h3 className="rc-card__name">
            {restaurant.name}
          </h3>

          {/* Rating */}
          <p className="rc-card__rating">
            ⭐{" "}
            {restaurant.rating && restaurant.rating !== "N/A"
              ? restaurant.rating
              : "Not rated"}
          </p>

          {/* Cuisine — single line with ellipsis */}
          <p className="rc-card__cuisine">
            🍽️ {restaurant.cuisine || "Not specified"}
          </p>

        </div>

        {/* Bottom Section — Button always pinned to bottom */}
        <button
          className="rc-card__btn"
          onClick={() => onViewDetails && onViewDetails(restaurant)}
        >
          View Details
        </button>

      </div>
    </div>
  );
}

export default RestaurantCard;
