import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedRestaurant from "../components/FeaturedRestaurant";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import OrderSummary from "./OrderSummary";
import AddressPage from "./AddressPage";
import OrderConfirmation from "./OrderConfirmation";
import { CATEGORIES, OVERPASS_SERVERS, CUISINE_IMAGES, getFoodImage, getMenuByCuisine } from "./sampleData";
import "./Home.css";

// ============================================
// PRICE PARSER UTILITY
// Handles: "Rs.80", "Rs. 80", "Rs 80", "₹80", "80"
// ============================================
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  if (typeof priceStr === "number") return isNaN(priceStr) ? 0 : priceStr;
  // Remove "Rs." prefix FIRST, then strip remaining non-numeric characters.
  // Without this, "Rs.150" → ".150" → 0.15 (wrong).
  const num = parseFloat(priceStr.toString().replace(/Rs\.?\s*/i, "").replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
};


// ============================================
// CART MODAL COMPONENT
// Columns: Restaurant | Item Name | Qty | Cost
// Footer : Per-restaurant subtotal + Grand Total
// ============================================
const CartModal = ({ cartItems, onClose, onUpdateQty, onRemoveItem, onClearCart, onProceedToCheckout }) => {

  // Group items by restaurantId
  const grouped = cartItems.reduce((acc, item) => {
    const key = item.restaurantId;
    if (!acc[key]) acc[key] = { restaurantName: item.restaurantName, items: [] };
    acc[key].items.push(item);
    return acc;
  }, {});

  const grandTotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div
      onClick={onClose}
      className="cart-overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="cart-box"
      >
        {/* ── HEADER ── */}
        <div
          className="cart-header"
        >
          <div className="cart-header-left">
            <span className="cart-icon-emoji">🛒</span>
            <h2 className="cart-title">
              Your Cart
            </h2>
            <span className="cart-badge">
              {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="cart-header-right">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="cart-clear-btn"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="cart-close-btn"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── EMPTY STATE ── */}
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🍽️</div>
            <p className="cart-empty-title">
              Your cart is empty
            </p>
            <p className="cart-empty-subtitle">
              Browse restaurants and add items to get started!
            </p>
          </div>
        ) : (
          <div className="cart-body">

            {/* ── TABLE HEADER ── */}
            <div
              className="cart-table-header"
            >
              <span>Restaurant</span>
              <span>Item Name</span>
              <span className="cart-col-center">No. of Items</span>
              <span className="cart-col-right">Cost</span>
            </div>

            {/* ── GROUPED ROWS ── */}
            {Object.entries(grouped).map(([restaurantId, group], groupIdx) => {
              const restaurantSubtotal = group.items.reduce(
                (s, i) => s + parsePrice(i.price) * i.qty, 0
              );
              const rowBg = groupIdx % 2 === 0 ? "#fff9f9" : "#ffffff";

              return (
                <div key={restaurantId}>

                  {/* Restaurant label row */}
                  <div
                    className="cart-restaurant-label" style={{ backgroundColor: rowBg, marginTop: groupIdx === 0 ? 0 : "6px" }}
                  >
                    <span className="cart-restaurant-name">
                      🍴 {group.restaurantName}
                    </span>
                  </div>

                  {/* Items */}
                  {group.items.map((item) => {
                    const unitPrice = parsePrice(item.price);
                    const rowTotal = unitPrice * item.qty;

                    return (
                      <div
                        key={item.cartKey}
                        className="cart-item-row" style={{ backgroundColor: rowBg }}
                      >
                        {/* Column 1: Restaurant name (repeated per row for clarity) */}
                        <span className="cart-item-restaurant-col">
                          {group.restaurantName}
                        </span>

                        {/* Column 2: Item name + desc */}
                        <div>
                          <p className="cart-item-name">
                            {item.name}
                          </p>
                          <p className="cart-item-desc">
                            {item.desc}
                          </p>
                          <p className="cart-item-unit-price">
                            ₹{unitPrice} / item
                          </p>
                        </div>

                        {/* Column 3: Qty stepper (No. of Items) */}
                        <div
                          className="cart-qty-stepper"
                        >
                          <button
                            onClick={() => onUpdateQty(item.cartKey, item.qty - 1)}
                            className="cart-qty-btn"
                          >
                            −
                          </button>
                          <span className="cart-qty-value">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.cartKey, item.qty + 1)}
                            className="cart-qty-btn"
                          >
                            +
                          </button>
                        </div>

                        {/* Column 4: Row Cost + remove */}
                        <div className="cart-item-cost-col">
                          <p className="cart-item-total" style={{ fontWeight: 700, color: "#222" }}>
                          ₹{rowTotal}
                        </p>
                        <button
                          onClick={() => onRemoveItem(item.cartKey)}
                          className="cart-remove-btn"
                        >
                          🗑 Remove
                        </button>
                      </div>
                      </div>
              );
            })}

            {/* Per-restaurant subtotal */}
            <div
              className="cart-subtotal-row" style={{ backgroundColor: rowBg }}
            >
              <span className="cart-subtotal-label">
                Subtotal for {group.restaurantName}:
              </span>
              <span className="cart-subtotal-value">
                ₹{restaurantSubtotal}
              </span>
            </div>
          </div>
        );
            })}

        {/* ── GRAND TOTAL ── */}
        <div
          className="cart-grand-total-row"
        >
          <div>
            <p className="cart-grand-total-meta">
              {totalItemCount} item(s) from {Object.keys(grouped).length} restaurant(s)
            </p>
            <p className="cart-grand-total-disclaimer">
              * Sample menu prices. Actual charges may vary.
            </p>
          </div>
          <div className="cart-grand-total-right">
            <p className="cart-grand-total-label">Total Cost</p>
            <p className="cart-grand-total-amount">
              ₹{grandTotal}
            </p>
          </div>
        </div>

        {/* ── CHECKOUT CTA ── */}
        <div className="cart-checkout-wrapper">
          <button
            onClick={onProceedToCheckout}
            className="cart-checkout-btn"
          >
            Proceed to Checkout — ₹{grandTotal}
          </button>
        </div>

      </div>
        )}
    </div>
    </div >
  );
};

// ============================================
// RESTAURANT MODAL COMPONENT
// Receives cartItems + onAddToCart from Home
// ============================================
const RestaurantModal = ({ restaurant, onClose, cartItems, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!restaurant) return null;

  const menu = getMenuByCuisine(restaurant.cuisine);

  // Fast lookup: cartKey → current qty
  const cartLookup = cartItems.reduce((acc, ci) => {
    acc[ci.cartKey] = ci.qty;
    return acc;
  }, {});

  const getTabStyle = (tab) => ({
    flex: 1,
    padding: "10px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: activeTab === tab ? "bold" : "normal",
    color: activeTab === tab ? "#e74c3c" : "#888",
    borderBottom: activeTab === tab ? "3px solid #e74c3c" : "3px solid transparent",
    marginBottom: "-2px",
  });

  const mapsUrl =
    "https://www.google.com/maps/search/" +
    encodeURIComponent(restaurant.name + " " + restaurant.location);

  return (
    <div
      onClick={onClose}
      className="restaurant-overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="restaurant-box"
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-hero-img"
          onError={(e) => { e.target.src = CUISINE_IMAGES.default; }}
        />

        <button
          onClick={onClose}
          className="restaurant-close-btn"
        >
          ✕
        </button>

        <div className="restaurant-body">
          <h2 className="restaurant-name">
            {restaurant.name}
          </h2>
          <p className="restaurant-meta">
            {restaurant.cuisine} | {restaurant.location}
          </p>

          <div className="restaurant-tabs">
            <button onClick={() => setActiveTab("details")} style={getTabStyle("details")}>Details</button>
            <button onClick={() => setActiveTab("menu")} style={getTabStyle("menu")}>Menu</button>
          </div>

          {/* DETAILS TAB */}
          {activeTab === "details" && (
            <div className="restaurant-details-body">
              {restaurant.distance && restaurant.distance !== "N/A" && (
                <p>Distance: {restaurant.distance}</p>
              )}
              {restaurant.phone && restaurant.phone !== "N/A" && (
                <p>Phone: <a href={"tel:" + restaurant.phone} className="link-red">{restaurant.phone}</a></p>
              )}
              {restaurant.hours && restaurant.hours !== "Hours not available" && (
                <p>Hours: {restaurant.hours}</p>
              )}
              {restaurant.website && restaurant.website !== "#" && (
                <p>
                  Website:{" "}
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="link-red">
                    Visit Website
                  </a>
                </p>
              )}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="restaurant-maps-link"
              >
                View on Google Maps
              </a>
            </div>
          )}

          {/* MENU TAB */}
          {activeTab === "menu" && (
            <div>
              <div
                className="restaurant-menu-disclaimer"
              >
                <p className="restaurant-disclaimer-text">
                  Sample Menu based on {restaurant.cuisine} cuisine.
                  Prices and items may vary. Contact restaurant for actual menu.
                </p>
              </div>

              {menu.map((section) => (
                <div key={section.category} className="menu-section-wrapper">

                  <h4
                    className="menu-section-title"
                  >
                    {section.category}
                  </h4>

                  {section.items.map((item) => {
                    // cartKey is unique per restaurant + item
                    const cartKey = `${restaurant.id}__${item.name}`;
                    const qtyInCart = cartLookup[cartKey] || 0;

                    return (
                      <div
                        key={item.name}
                        className="menu-item-row"
                      >
                        {/* Item info */}
                        <div className="menu-item-info">
                          <p className="menu-item-name">
                            {item.name}
                          </p>
                          <p className="menu-item-desc">
                            {item.desc}
                          </p>
                        </div>

                        {/* Price */}
                        <span className="menu-item-price">
                          {item.price}
                        </span>

                        {/* Add / Qty stepper */}
                        {qtyInCart === 0 ? (
                          <button
                            onClick={() =>
                              onAddToCart({
                                cartKey,
                                restaurantId: restaurant.id,
                                restaurantName: restaurant.name,
                                name: item.name,
                                desc: item.desc,
                                price: item.price,
                                qty: 1,
                              })
                            }
                            className="menu-add-btn"
                          >
                            + Add
                          </button>
                        ) : (
                          <div
                            className="menu-qty-stepper"
                          >
                            <button
                              onClick={() =>
                                onAddToCart({
                                  cartKey,
                                  restaurantId: restaurant.id,
                                  restaurantName: restaurant.name,
                                  name: item.name,
                                  desc: item.desc,
                                  price: item.price,
                                  qty: qtyInCart - 1,
                                })
                              }
                              className="menu-qty-btn"
                            >
                              −
                            </button>
                            <span className="menu-qty-value">
                              {qtyInCart}
                            </span>
                            <button
                              onClick={() =>
                                onAddToCart({
                                  cartKey,
                                  restaurantId: restaurant.id,
                                  restaurantName: restaurant.name,
                                  name: item.name,
                                  desc: item.desc,
                                  price: item.price,
                                  qty: qtyInCart + 1,
                                })
                              }
                              className="menu-qty-btn"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// FLOATING CART BUTTON
// Appears only when cart has items
// ============================================
const FloatingCartButton = ({ count, total, onClick }) => {
  if (count === 0) return null;
  return (
    <div
      onClick={onClick}
      className="floating-cart"
    >
      <span className="floating-cart-icon">🛒</span>
      <span>{count} {count === 1 ? "item" : "items"}</span>
      <span className="floating-cart-total">
        ₹{total}
      </span>
    </div>
  );
};

// ============================================
// MAIN HOME COMPONENT
// ============================================
function Home() {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // ── CART STATE ──────────────────────────────────────────────────────────────
  // Shape of each cart item:
  // { cartKey, restaurantId, restaurantName, name, desc, price (string), qty }
  //
  // cartKey = `${restaurantId}__${itemName}`  ← guarantees uniqueness across
  //            restaurants (same dish name at two restaurants = two cart entries)
  // ───────────────────────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("home"); // "home" | "order-summary" | "address" | "confirmation"
  const [orderData, setOrderData] = useState(null);   // data passed between checkout steps

  // ── CART HANDLERS ──────────────────────────────────────────────────────────

  /**
   * Called from RestaurantModal with the full item payload.
   * qty === 0 → remove; existing key → update qty; new key → insert.
   */
  const handleAddToCart = (itemData) => {
    setCartItems((prev) => {
      if (itemData.qty <= 0) {
        return prev.filter((ci) => ci.cartKey !== itemData.cartKey);
      }
      const exists = prev.find((ci) => ci.cartKey === itemData.cartKey);
      if (exists) {
        return prev.map((ci) =>
          ci.cartKey === itemData.cartKey ? { ...ci, qty: itemData.qty } : ci
        );
      }
      return [...prev, { ...itemData }];
    });
  };

  /** Called from CartModal qty stepper */
  const handleUpdateQty = (cartKey, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((ci) => ci.cartKey !== cartKey));
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => ci.cartKey === cartKey ? { ...ci, qty: newQty } : ci)
    );
  };

  /** Called from CartModal remove button */
  const handleRemoveItem = (cartKey) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartKey !== cartKey));
  };

  /** Wipe the entire cart */
  const handleClearCart = () => setCartItems([]);

  // Derived totals for FloatingCartButton
  const totalCartCount = cartItems.reduce((s, ci) => s + ci.qty, 0);
  const totalCartCost = cartItems.reduce((s, ci) => s + parsePrice(ci.price) * ci.qty, 0);

  // ── DATA FETCH ─────────────────────────────────────────────────────────────

  const tryFetch = async (query) => {
    for (let server of OVERPASS_SERVERS) {
      try {
        const response = await fetch(server, {
          method: "POST",
          body: "data=" + encodeURIComponent(query),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        if (response.ok) return response;
      } catch {
        console.warn("Server failed: " + server);
      }
    }
    throw new Error("All servers are currently busy. Please try again!");
  };

  const fetchRestaurants = async () => {
    if (!city.trim()) { setError("Please enter a city name!"); return; }

    setLoading(true);
    setError("");
    setSearched(true);
    setRestaurants([]);

    try {
      const geoResponse = await fetch(
        "https://nominatim.openstreetmap.org/search?q=" +
        encodeURIComponent(city.trim()) +
        "&format=json&limit=1",
        { headers: { "Accept-Language": "en", "User-Agent": "FoodieRestaurantsApp" } }
      );
      const geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        setError("City not found. Please check spelling!");
        setLoading(false);
        return;
      }

      const lat = parseFloat(geoData[0].lat);
      const lng = parseFloat(geoData[0].lon);

      const cuisineFilter = category ? '["cuisine"="' + category + '"]' : "";
      const overpassQuery = `
        [out:json][timeout:25];
        node["amenity"="restaurant"]${cuisineFilter}
          (around:5000,${lat},${lng});
        out body 10;
      `;

      const overpassResponse = await tryFetch(overpassQuery);
      const data = await overpassResponse.json();

      if (!data.elements || data.elements.length === 0) {
        setError("No restaurants found. Try another city or category!");
        setLoading(false);
        return;
      }

      const mapped = data.elements.map((place) => {
        const rawCuisine = place.tags?.cuisine || "";
        const cuisine = rawCuisine
          ? rawCuisine.split(";").map((c) => c.trim().charAt(0).toUpperCase() + c.trim().slice(1)).join(", ")
          : category
            ? CATEGORIES.find((cat) => cat.value === category)?.label || "Not specified"
            : "Not specified";

        return {
          id: place.id,
          name: place.tags?.name || "Unnamed Restaurant",
          cuisine,
          image: getFoodImage(rawCuisine || category),
          location: [
            place.tags?.["addr:housenumber"],
            place.tags?.["addr:street"],
            place.tags?.["addr:city"] || city,
          ].filter(Boolean).join(", ") || city,
          distance: place.distance ? (place.distance / 1000).toFixed(1) + " km away" : "N/A",
          phone: place.tags?.phone || place.tags?.["contact:phone"] || "N/A",
          website: place.tags?.website || place.tags?.["contact:website"] || "#",
          hours: place.tags?.opening_hours || "Hours not available",
          rating: "N/A",
          price: "N/A",
        };
      });

      setRestaurants(mapped);

    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => { if (e.key === "Enter") fetchRestaurants(); };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  // ── RENDER: Order Summary page takes over the whole screen ──
  if (checkoutStep === "confirmation") {
    return (
      <OrderConfirmation
        orderData={orderData}
        onBackToHome={() => {
          window.location.reload()   // Reload the full page to clear all data 
        }}
      />
    );
  }

  if (checkoutStep === "address") {
    return (
      <AddressPage
        orderData={orderData}
        onBack={() => setCheckoutStep("order-summary")}
        onProceed={(data) => {
          setOrderData(data);
          setCheckoutStep("confirmation");
        }}
      />
    );
  }

  if (checkoutStep === "order-summary") {
    return (
      <OrderSummary
        cartItems={cartItems}
        onBack={() => setCheckoutStep("home")}
        onProceed={(data) => {
          setOrderData(data);
          setCheckoutStep("address");
        }}
      />
    );
  }

  return (
    <div>
      <Header />
      <Hero city={city} setCity={setCity} onKeyPress={handleKeyPress} />

      <div className="search-bar">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="search-select"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        <button
          onClick={fetchRestaurants}
          disabled={loading}
          className={`search-btn ${loading ? "search-btn-disabled" : "search-btn-active"}`}
        >
          {loading ? "Searching..." : "Search Restaurants"}
        </button>
      </div>

      {error && (
        <p className="search-error">{error}</p>
      )}

      {!loading && searched && restaurants.length > 0 && (
        <p className="search-success">
          Found {restaurants.length} restaurant(s) in {city}!
        </p>
      )}

      {loading ? (
        <p className="search-loading">Fetching restaurants...</p>
      ) : (
        <FeaturedRestaurant
          restaurants={restaurants}
          onViewDetails={(restaurant) => setSelectedRestaurant(restaurant)}
        />
      )}

      {/* Restaurant Details / Menu Modal */}
      {selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onProceedToCheckout={() => { setShowCart(false); setCheckoutStep("order-summary"); }}
        />
      )}

      {/* Floating Cart Button — visible only when cart has items */}
      <FloatingCartButton
        count={totalCartCount}
        total={totalCartCost}
        onClick={() => setShowCart(true)}
      />

      <Categories
        onCategorySelect={(value) => {
          setCategory(value);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <Footer />
    </div>
  );
}

export default Home;
