import React from "react";
 
function Hero({ city, setCity }) {
  return (
<section className="hero">
<h1>Find the Best Restaurants Near You</h1>
<div className="search-bar">
<input
          type="text"
          placeholder="Enter your city or restaurant name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
</div>
<p>Discover restaurants, cafes, and more in your area.</p>
</section>
  );
}
 
export default Hero;