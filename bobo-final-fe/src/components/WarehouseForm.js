import React, { useState, useEffect } from "react";
import { getRolePermissions } from "../utils/permissions";

const WarehouseForm = ({ onSubmit, initialData, onCancel }) => {
  const [warehouse, setWarehouse] = useState({
    warehouseName: "",
    address: "",
    description: "",
  });

  const userRole = localStorage.getItem("userRole");
  const { canEdit } = getRolePermissions(userRole);

  useEffect(() => {
    if (initialData) {
      setWarehouse({
        warehouseName: initialData.warehouseName || "",
        address: initialData.address || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    if (!canEdit) return;
    const { name, value } = e.target;
    setWarehouse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canEdit) return;
    onSubmit(warehouse);
    if (!initialData) {
      setWarehouse({ warehouseName: "", address: "", description: "" });
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          boxShadow: "0 4px 10px rgba(242, 139, 130, 0.2)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#1E40AF",
            color: "#FFFFFF",
            padding: "1rem 1.5rem",
          }}
        >
          <h5 style={{ margin: 0, fontWeight: "700" }}>
            {initialData
              ? canEdit
                ? "Update Warehouse"
                : "View Warehouse"
              : "Create Warehouse"}
          </h5>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#E0E0E0",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Warehouse Name */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="warehouseName"
              style={{
                fontWeight: "700",
                color: "#264653",
                marginBottom: "0.5rem",
              }}
            >
              Warehouse Name
            </label>
            <input
              type="text"
              id="warehouseName"
              name="warehouseName"
              value={warehouse.warehouseName}
              onChange={handleChange}
              placeholder="Insert Warehouse Name"
              required
              disabled={!canEdit}
              style={{
                padding: "0.5rem",
                borderRadius: 8,
                border: "2px solid #1E40AF",
                fontSize: "1rem",
                backgroundColor: canEdit ? "white" : "#f2f2f2",
              }}
            />
          </div>

          {/* Address */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="address"
              style={{
                fontWeight: "700",
                color: "#264653",
                marginBottom: "0.5rem",
              }}
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={warehouse.address}
              onChange={handleChange}
              placeholder="Insert Address"
              required
              disabled={!canEdit}
              style={{
                padding: "0.5rem",
                borderRadius: 8,
                border: "2px solid #1E40AF",
                fontSize: "1rem",
                backgroundColor: canEdit ? "white" : "#f2f2f2",
              }}
            />
          </div>

          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="description"
              style={{
                fontWeight: "700",
                color: "#264653",
                marginBottom: "0.5rem",
              }}
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={warehouse.description}
              onChange={handleChange}
              placeholder="Insert description (optional)"
              disabled={!canEdit}
              style={{
                padding: "0.5rem",
                borderRadius: 8,
                border: "2px solid #1E40AF",
                fontSize: "1rem",
                backgroundColor: canEdit ? "white" : "#f2f2f2",
              }}
            />
          </div>

          {/* Buttons */}
          {canEdit && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
            
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "#1E40AF",
                  color: "#FFFFFF",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#474bc3ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1E40AF")
                }
              >
                {initialData ? "Update" : "Create"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WarehouseForm;
