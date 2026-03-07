import React, { useState } from "react";

const AdminMenu = () => {

  const [items, setItems] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");

  const addItem = () => {
    const newItem = {
      name: foodName,
      price: price
    };

    setItems([...items, newItem]);
    setFoodName("");
    setPrice("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Menu Management</h2>

      <div>
        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addItem}>Add Item</button>
      </div>

      <h3>Menu Items</h3>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenu;