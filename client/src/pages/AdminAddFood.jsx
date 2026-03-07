import React, { useState } from "react";

const AdminAddFood = () => {

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const foodData = {
      name: foodName,
      price: price,
      category: category,
      image: image
    };

    console.log("Food Added:", foodData);

    alert("Food item added successfully!");

    setFoodName("");
    setPrice("");
    setCategory("");
    setImage("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Food Item</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Food Name</label>
          <br />
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <br />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label>Image URL</label>
          <br />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Add Food</button>

      </form>
    </div>
  );
};

export default AdminAddFood;