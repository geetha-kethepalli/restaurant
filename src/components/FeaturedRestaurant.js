import React from "react";
import RestaurantCard from "./RestaurantCard";
import "./FeaturedRestaurant.css";

function FeaturedRestaurant({ restaurants, onViewDetails }) {
  if (!restaurants || restaurants.length === 0) {
    return <p className="fr-empty">No restaurants found.</p>;
  }

  return (
    <section className="featured">
      <h2 className="fr-heading">Featured Restaurants</h2>

      <div className="fr-grid">
        {restaurants.map((res) => (
          <RestaurantCard
            key={res.id}
            restaurant={res}
            onViewDetails={onViewDetails}  // 👈 Passed down from Home.js
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedRestaurant;
