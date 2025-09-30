import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, onCancel, initialData, userRole, canCreate }) => {
  const [formData, setFormData] = useState({
    id: null,
    productName: "",
    description: "",
    unitPrice: "",
  });

  const isAdmin = userRole === "ADMIN";
  const isManager = userRole === "MANAGER";
  const canEdit = isAdmin || isManager;

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || null,
        productName: initialData.productName || "",
        description: initialData.description || "",
        unitPrice: initialData.unitPrice?.toString() || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canEdit) {
      alert("You do not have the necessary permissions.");
      return;
    }

    if (!formData.id && !canCreate) {
      alert("You do not have permission to create.");
      return;
    }

    if (
      !formData.productName.trim() ||
      !formData.description.trim() ||
      formData.unitPrice === ""
    ) {
      return alert("Please fill in all required fields.");
    }

    const productToSubmit = {
      ...formData,
      unitPrice: parseFloat(formData.unitPrice),
    };

    onSubmit(productToSubmit);
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
            {initialData ? (canEdit ? "Update Product" : "View Product") : "Create Product"}
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
          {[
            {
              label: "Product Name",
              name: "productName",
              type: "text",
              placeholder: "Enter product name",
            },
            {
              label: "Description",
              name: "description",
              type: "text",
              placeholder: "Enter description",
            },
            {
              label: "Price (€/unit)",
              name: "unitPrice",
              type: "number",
              step: "0.01",
              placeholder: "Enter price",
            },
          ].map(({ label, name, type, step, placeholder }) => (
            <div
              key={name}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label
                htmlFor={name}
                style={{
                  fontWeight: "700",
                  color: "#264653",
                  marginBottom: "0.5rem",
                  textTransform: "capitalize",
                }}
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                step={step}
                value={formData[name]}
                onChange={handleChange}
                required
                disabled={!canEdit}
                placeholder={placeholder}
                style={{
                  padding: "0.5rem",
                  borderRadius: 8,
                  border: "2px solid #1E40AF",
                  fontSize: "1rem",
                  backgroundColor: canEdit ? "white" : "#f2f2f2",
                }}
              />
            </div>
          ))}

          {/* Buttons */}
          {canEdit && (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              
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
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#474BC3")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2012B4")}
              >
                {formData.id ? "Update" : "Create"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
