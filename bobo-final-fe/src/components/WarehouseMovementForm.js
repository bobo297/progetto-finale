import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

const colors = {
  primary: "#1E40AF",
  accent: "#FFFFFF",
  accentHover: "#474bc3ff",
  warning: "#F28B82",
  background: "#E0E0E0",
};

const WarehouseMovementForm = ({
  onSubmit,
  initialData,
  onCancel,
  products = [],
  shelves = [],
  employees = [],
}) => {
  const [movement, setMovement] = useState({
    id: null,
    quantity: "",
    movementType: "",
    product: "",
    shelfOrigin: "",
    shelfDestination: "",
    employee: "",
    dateTime: "",
  });

  useEffect(() => {
    if (initialData) {
      setMovement({
        id: initialData.id || null,
        quantity: initialData.quantity?.toString() || "",
        movementType: initialData.movementType || "",
        product: initialData.product?.toString() || "",
        shelfOrigin: initialData.shelfOrigin?.toString() || "",
        shelfDestination: initialData.shelfDestination?.toString() || "",
        employee: initialData.employee?.toString() || "",
        dateTime: initialData.dateTime
          ? format(parseISO(initialData.dateTime), "yyyy-MM-dd'T'HH:mm")
          : "",
      });
    } else {
      setMovement((prev) => ({
        ...prev,
        id: null,
        dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const quantity = parseInt(movement.quantity, 10);
    const productId = parseInt(movement.product, 10);
    const shelfOriginId = movement.shelfOrigin
      ? parseInt(movement.shelfOrigin, 10)
      : null;
    const shelfDestId = parseInt(movement.shelfDestination, 10);
    const employeeId = parseInt(movement.employee, 10);

    if (
      !movement.movementType ||
      isNaN(quantity) ||
      quantity <= 0 ||
      isNaN(productId) ||
      isNaN(shelfDestId) ||
      isNaN(employeeId)
    ) {
      alert("Fill in all of the mandatory fields correctly.");
      return;
    }

    if (!movement.dateTime) {
      alert("Date and Time is required");
      return;
    }

    const [dateStr, timeStr] = movement.dateTime.split("T");
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, day, hour, minute));

    if (isNaN(dateObj.getTime())) {
      alert("Invalid date");
      return;
    }

    const isoDate = dateObj.toISOString();

    onSubmit({
      id: movement.id,
      quantity,
      movementType: movement.movementType,
      product: productId,
      shelfOrigin: shelfOriginId,
      shelfDestination: shelfDestId,
      employee: employeeId,
      dateTime: isoDate,
    });
  };

  const inputStyle = {
    padding: "0.5rem",
    borderRadius: 8,
    border: `2px solid ${colors.primary}`,
    fontSize: "1rem",
    backgroundColor: "white",
  };

  const labelStyle = {
    fontWeight: "700",
    fontSize: "0.95rem",
    color: "#264653",
    marginBottom: "0.4rem",
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
          borderRadius: 12,
          backgroundColor: colors.background,
          boxShadow: "0 4px 10px rgba(242, 139, 130, 0.2)",
        }}
      >
        <div
          style={{
            backgroundColor: colors.primary,
            color: colors.accent,
            padding: "1rem 1.5rem",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <h4 style={{ margin: 0, fontWeight: "700" }}>
            {movement.id ? "Update Movement" : "Create Movement"}
          </h4>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.3rem",
          }}
        >
          {/* Text Inputs */}
          {[
            { id: "quantity", label: "Quantity", type: "number" },
            { id: "movementType", label: "Movement Type", type: "text", placeholder: "Es. IN, OUT" },
            { id: "dateTime", label: "Date and Time", type: "datetime-local" },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor={id} style={labelStyle}>
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={movement[id]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                style={inputStyle}
              />
            </div>
          ))}

          {/* Selects */}
          {[
            {
              label: "Product",
              name: "product",
              value: movement.product,
              options: products,
              getLabel: (p) => p.productName,
              required: true,
            },
            {
              label: "Origin Shelf",
              name: "shelfOrigin",
              value: movement.shelfOrigin,
              options: shelves,
              getLabel: (s) => `${s.description} (ID ${s.id})`,
              required: false,
            },
            {
              label: "Destination Shelf",
              name: "shelfDestination",
              value: movement.shelfDestination,
              options: shelves,
              getLabel: (s) => `${s.description} (ID ${s.id})`,
              required: true,
            },
            {
              label: "Employee",
              name: "employee",
              value: movement.employee,
              options: employees,
              getLabel: (e) => `${e.firstName} ${e.lastName}`,
              required: true,
            },
          ].map(({ label, name, value, options, getLabel, required }, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor={name} style={labelStyle}>
                {label}
              </label>
              <select
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                required={required}
                style={inputStyle}
              >
                <option value="">
                  {required ? "Select..." : "-- No one --"}
                </option>
                {options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {getLabel(opt)}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            
            <button
              type="submit"
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: 8,
                border: "none",
                backgroundColor: colors.primary,
                color: colors.accent,
                fontWeight: "700",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = colors.accentHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = colors.primary)
              }
            >
              {movement.id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseMovementForm;
