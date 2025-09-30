import React, { useState, useEffect } from "react";

const ShelfForm = ({ onSubmit, initialData, onCancel, userRole }) => {
  const [shelf, setShelf] = useState({
    description: "",
    warehouseId: "",
  });

  const isAdmin = userRole === "ADMIN";
  const isManager = userRole === "MANAGER";
  const canEdit = isAdmin || isManager;

  useEffect(() => {
    if (initialData) {
      setShelf({
        ...initialData,
        warehouseId: initialData.warehouseId || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShelf((prev) => ({
      ...prev,
      [name]: name === "warehouseId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canEdit) {
      alert(
        userRole === "operator"
          ? "You do not have permission to perform this action."
          : "You do not have the necessary permissions."
      );
      return;
    }

    if (isManager && !initialData) {
      alert("Managers cannot create shelves.");
      return;
    }

    if (!shelf.description.trim() || shelf.warehouseId === "") {
      return alert("Please fill in all required fields.");
    }

    onSubmit(shelf);

    if (!initialData) {
      setShelf({ description: "", warehouseId: "" });
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
        {/* Header */}
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
                ? "Update Shelf"
                : "View Shelf"
              : "Create Shelf"}
          </h5>
        </div>

        {/* Form */}
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
              value={shelf.description}
              onChange={handleChange}
              placeholder="Insert shelf description"
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

          {/* Warehouse ID */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="warehouseId"
              style={{
                fontWeight: "700",
                color: "#264653",
                marginBottom: "0.5rem",
              }}
            >
              Warehouse ID
            </label>
            <input
              type="number"
              id="warehouseId"
              name="warehouseId"
              value={shelf.warehouseId}
              onChange={handleChange}
              placeholder="Insert warehouse ID"
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

export default ShelfForm;
