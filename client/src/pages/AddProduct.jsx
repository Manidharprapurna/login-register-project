import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/products/admin/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Product added successfully");

      navigate("/menu");

    } catch (error) {

      console.log(error);
      alert("Error adding product");

    }

  };

  return (
    <div style={{ padding: "30px" }}>

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <br /><br />

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  );
};

export default AddProduct;