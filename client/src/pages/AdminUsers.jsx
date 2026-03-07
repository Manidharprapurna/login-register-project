import React from "react";

const AdminUsers = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Mani</td>
            <td>Admin</td>
          </tr>

          <tr>
            <td>John</td>
            <td>User</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;