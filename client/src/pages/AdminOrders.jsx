import React from "react";

const AdminOrders = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Orders</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1001</td>
            <td>Mani</td>
            <td>Preparing</td>
          </tr>

          <tr>
            <td>1002</td>
            <td>Rahul</td>
            <td>Delivered</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;