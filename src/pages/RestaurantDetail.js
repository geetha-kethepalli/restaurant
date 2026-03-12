import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RestaurantDetail() {

  const { id } = useParams();

  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchrestaurant();
  }, []);

  const fetchrestaurant = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://fakerestaurantapi.runasp.net/api/Restaurant"
      );

      const data = await response.json();

      setRestaurant(data);
      setLoading(false);

    } catch (err) {
      setError("Failed to fetch restaurants");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <Header />

      <h2>Restaurant Details</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {restaurant.map((res) => (
        <div
          key={res.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>ID: {res.id}</h3>
          <p>Name: {res.name}</p>
          <p>City: {res.address.city}</p>
        </div>
      ))}

      <Link to="/">
        <button style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>
          Back to Home
        </button>
      </Link>

      <Footer />

    </div>
  );
}

export default RestaurantDetail;