import React from "react";
import F1 from "../images/F1.jpg";
import F2 from "../images/F2.png";
import F3 from "../images/F3.jpg";
import F4 from "../images/F4.png";

//Burger
import B1 from "../images/B1.jpg";
import B2 from "../images/B2.jpg";
import B3 from "../images/B3.webp";
import B4 from "../images/B4.jpg";

const Menu = () => {

  const friesItems = [
    { name: "Regular French Fries", price: "₹99", image: F1 },
    { name: "Large French Fries", price: "₹129", image: F2 },
    { name: "Cheese Fries", price: "₹149", image: F3 },
    { name: "Peri Peri Fries", price: "₹159", image: F4 }
  ];

  const burgerItems = [
    { name: "Zinger Burger", price: "₹199", image: B1 },
    { name: "Chicken Burger", price: "₹179", image: B2 },
    { name: "Cheese Burger", price: "₹189", image: B3 },
    { name: "Double Chicken Burger", price: "₹229", image: B4 }
  ];

  return (
    <div className="menu-container">
      <h1>Menu</h1>

      {/* Fries Section */}
      <h2>French Fries</h2>
      <div className="menu-grid">
        {friesItems.map((item, index) => (
          <div className="menu-card" key={index}>
           <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Burger Section */}
      <h2>Burgers</h2>
      <div className="menu-grid">
        {burgerItems.map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;