import React from "react";
import {
  FaHamburger,
  FaCoffee,
  FaUtensils,
  FaIceCream,
  FaLeaf,
  FaPepperHot,
  FaPizzaSlice
} from "react-icons/fa";
import { GiChopsticks } from "react-icons/gi";
import "./Categories.css";

// 👇 Matching exactly with CATEGORIES in Home.js
const CATEGORIES = [
  {
    name: "All Restaurants",
    value: "",
    icon: <FaUtensils />,
    color: "#e74c3c",
  },
  {
    name: "Indian",
    value: "indian",
    icon: <FaPepperHot />,
    color: "#e67e22",
  },
  {
    name: "Italian",
    value: "italian",
    icon: <FaPizzaSlice />,
    color: "#27ae60",
  },
  {
    name: "Chinese",
    value: "chinese",
    icon: <GiChopsticks />,
    color: "#c0392b",
  },
  {
    name: "Burger",
    value: "burger",
    icon: <FaHamburger />,
    color: "#f39c12",
  },
  {
    name: "Desserts",
    value: "dessert",
    icon: <FaIceCream />,
    color: "#9b59b6",
  },
  {
    name: "Cafes",
    value: "coffee",
    icon: <FaCoffee />,
    color: "#795548",
  },
  {
    name: "Vegetarian",
    value: "vegetarian",
    icon: <FaLeaf />,
    color: "#2ecc71",
  },
  {
    name: "Pizza",
    value: "pizza",
    icon: <FaPizzaSlice />,
    color: "#e74c3c",
  },
];

function Categories({ onCategorySelect }) {
  return (
    <section className="categories">
      <h2 className="cat-heading">Explore Categories</h2>

      <div className="cat-grid">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.value}
            className="cat-item"
            onClick={() => onCategorySelect && onCategorySelect(cat.value)}
            // cat.color is per-category runtime data — passed as a CSS custom
            // property so all visual rules (icon colour, hover background) live in CSS
            style={{ "--cat-color": cat.color }}
          >
            {/* Category Icon */}
            <div className="cat-item__icon">
              {cat.icon}
            </div>

            {/* Category Name */}
            <p className="cat-item__name">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
