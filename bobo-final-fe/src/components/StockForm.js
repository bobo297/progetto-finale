import React, { useEffect, useState } from "react";
import * as productService from "../services/productService";
import * as shelfService from "../services/shelfService";

const StockForm = ({
  onSubmit,
  initialData,
  onCancel,
  userRole,
  canCreate,
}) => {
  const [stock, setStock] = useState({
    quantity: "",
    product: "",
    shelf: "",
  });

  const [products, setProducts] = useState([]);
  const [shelves, setShelves] = useState([]);

  const isAdmin = userRole === "ADMIN";
  const isManager = userRole === "MANAGER";
  const canEdit = isAdmin || isManager;

  useEffect(() => {
    if (initialData) {
      setStock({
        quantity: initialData.quantity.toString(),
        product: initialData.product.toString(),
        shelf: initialData.shelf.toString(),
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, shelfData] = await Promise.all([
          productService.getAllProducts(),
          shelfService.getAllShelves(),
        ]);
        setProducts(productData);
        setShelves(shelfData);
      } catch (error) {
        alert("Error loading products or shelves: " + error.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    if (!canEdit) return;

    const { name, value } = e.target;
    setStock((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canEdit) {
      alert("You do not have the necessary permissions.");
      return;
    }

    if (!initialData && !canCreate) {
      alert("You do not have permission to create.");
      return;
    }

    if (
      stock.quantity.trim() === "" ||
      stock.product.trim() === "" ||
      stock.shelf.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit({
      ...initialData,
      quantity: parseInt(stock.quantity, 10),
      product: parseInt(stock.product, 10),
      shelf: parseInt(stock.shelf, 10),
    });
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
                ? "Update Stock"
                : "View Stock"
              : "Create Stock"}
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
          {/* Quantity */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="quantity"
              style={{
                fontWeight: "700",
                color: "#264653",
                marginBottom: "0.5rem",
                textTransform: "capitalize",
              }}
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={stock.quantity}
              onChange={handleChange}
              required
              disabled={!canEdit}
              placeholder="Enter quantity"
              style={{
                padding: "0.5rem",
                borderRadius: 8,
                border: "2px solid #1E40AF",
                fontSize: "1rem",
                backgroundColor: canEdit ? "white" : "#f2f2f2",
                cursor: canEdit ? "text" : "not-allowed",
              }}
            />
          </div>

          {/* Product */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="product"
              style={{
                fontWeight: "700",
                color: "#264653",
                marginBottom: "0.5rem",
                textTransform: "capitalize",
              }}
            >
              Product
            </label>
            <select
              id="product"
              name="product"
              value={stock.product}
              onChange={handleChange}
              required
              disabled={!canEdit}
              style={{
                padding: "0.5rem",
                borderRadius: 8,
                border: "2px solid #1E40AF",
                fontSize: "1rem",
                backgroundColor: canEdit ? "white" : "#f2f2f2",
                cursor: canEdit ? "pointer" : "not-allowed",
              }}
            >
              <option value="">-- Select a product --</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.productName}
                </option>
              ))}
            </select>
          </div>

          {/* Shelf */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="shelf"
              style={{
                fontWeight: "700",
                color: "#264653",
                marginBottom: "0.5rem",
                textTransform: "capitalize",
              }}
            >
              Shelf
            </label>
            <select
              id="shelf"
              name="shelf"
              value={stock.shelf}
              onChange={handleChange}
              required
              disabled={!canEdit}
              style={{
                padding: "0.5rem",
                borderRadius: 8,
                border: "2px solid #1E40AF",
                fontSize: "1rem",
                backgroundColor: canEdit ? "white" : "#f2f2f2",
                cursor: canEdit ? "pointer" : "not-allowed",
              }}
            >
              <option value="">-- Select a shelf --</option>
              {shelves.map((sh) => (
                <option key={sh.id} value={sh.id}>
                  {sh.description}
                </option>
              ))}
            </select>
          </div>

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

export default StockForm;
