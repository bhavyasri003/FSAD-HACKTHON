import React, { useState } from "react";

function App() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editId, setEditId] = useState(null);

  // ADD / UPDATE
  const addAsset = () => {
    if (!name || !type || !status || !user) {
      alert("Please fill all fields");
      return;
    }

    if (editId !== null) {
      setAssets(
        assets.map((asset) =>
          asset.id === editId
            ? { ...asset, name, type, status, user }
            : asset
        )
      );
      setEditId(null);
    } else {
      const newAsset = {
        id: assets.length + 1,
        name,
        type,
        status,
        user
      };
      setAssets([...assets, newAsset]);
    }

    setName("");
    setType("");
    setStatus("");
    setUser("");
  };

  // DELETE
  const deleteAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  // EDIT
  const editAsset = (asset) => {
    setName(asset.name);
    setType(asset.type);
    setStatus(asset.status);
    setUser(asset.user);
    setEditId(asset.id);
  };

  // FILTER LOGIC
  const filteredAssets = assets
    .filter((asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((asset) =>
      filterStatus ? asset.status === filterStatus : true
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #667eea, #764ba2)",
        padding: "20px",
        color: "white"
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Asset Tracking Management System
      </h1>

      {/* FORM */}
      <div
        style={{
          background: "white",
          color: "black",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      >
        <input
          placeholder="Asset Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "5px", padding: "8px" }}
        />

        <input
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ margin: "5px", padding: "8px" }}
        />

        <input
          placeholder="Assigned User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ margin: "5px", padding: "8px" }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ margin: "5px", padding: "8px" }}
        >
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="In Maintenance">In Maintenance</option>
        </select>

        <button
          onClick={addAsset}
          style={{
            margin: "5px",
            padding: "8px 15px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "none"
        }}
      />

      {/* FILTER */}
      <select
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px" }}
      >
        <option value="">All Status</option>
        <option value="Available">Available</option>
        <option value="Assigned">Assigned</option>
        <option value="In Maintenance">In Maintenance</option>
      </select>

      {/* ANALYTICS */}
      <div style={{ marginBottom: "10px" }}>
        <p>Total Assets: {assets.length}</p>
        <p>
          Available:{" "}
          {assets.filter((a) => a.status === "Available").length}
        </p>
        <p>
          Assigned:{" "}
          {assets.filter((a) => a.status === "Assigned").length}
        </p>
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          color: "black"
        }}
      >
        <thead style={{ background: "#667eea", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>User</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAssets.map((asset) => (
            <tr key={asset.id} style={{ textAlign: "center" }}>
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.type}</td>
              <td>{asset.user}</td>
              <td>{asset.status}</td>
              <td>
                <button
                  onClick={() => editAsset(asset)}
                  style={{
                    margin: "5px",
                    padding: "5px 10px",
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteAsset(asset.id)}
                  style={{
                    margin: "5px",
                    padding: "5px 10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px"
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


