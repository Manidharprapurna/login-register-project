import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {

  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));

  // FETCH MENU ITEMS
  useEffect(() => {

    const fetchMenu = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
        ("http://localhost:3000/api/products/products"),
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setItems(res.data);

      } catch (error) {

        console.log("Error fetching menu:", error);

      }

    };

    fetchMenu();

  }, []);

  // DELETE ITEM (ADMIN)
  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/products/admin/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Item deleted successfully");

      // Remove item from UI
      setItems(items.filter(item => item._id !== id));

    } catch (error) {

      console.log("Delete error:", error);

    }

  };

  return (

    <div className="menu-container">

      <h1>Menu</h1>

      {/* ADMIN ADD BUTTON */}
      {admin && (
        <button
          onClick={() => navigate("/add-product")}
          style={{ marginBottom: "20px" }}
        >
          Add Item
        </button>
      )}

      <div className="menu-grid">

        {items.length === 0 && (
          <p>No food items available</p>
        )}

        {items.map((item) => (

          <div className="menu-card" key={item._id}>

            <img
              src={`http://localhost:3000/uploads/products/${item.image}`}
              alt={item.title}
            />

            <h3>{item.title}</h3>

            <p>₹{item.price}</p>

            {/* USER BUTTON */}
            {!admin && (
              <button>Add to Cart</button>
            )}

            {/* ADMIN CONTROLS */}
            {admin && (
              <div style={{ marginTop: "10px" }}>

                <button
                  onClick={() =>
                    navigate(`/edit-product/${item._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>

              </div>
            )}

          </div>

        ))}

      </div>

    </div>

  );

};

export default Menu;