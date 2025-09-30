import React from "react";

const WarehouseMovementList = ({
  movements = [],
  onEdit,
  onDelete,
  userRole,
}) => {
  // Definiamo i permessi direttamente nel componente
  const canEdit = userRole === "ADMIN" || userRole === "MANAGER";
  const canDelete = userRole === "ADMIN";

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ color: "#264653", marginBottom: "1.5rem" }}>
        Warehouse Movements
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 10px rgba(242, 139, 130, 0.15)",
          backgroundColor: "#E0E0E0",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#1E40AF", color: "#ffffffff" }}>
          <tr>
            {[
              "ID",
              "Product",
              "Employee",
              "Origin Shelf",
              "Destination Shelf",
              "Quantity",
              "Type",
              "Date",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                style={{
                  padding: "12px 15px",
                  textAlign: "left",
                  fontWeight: "700",
                  borderBottom: "2px solid #059669",
                  whiteSpace: "nowrap",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {movements.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#264653",
                  fontWeight: "600",
                }}
              >
                No movements found.
              </td>
            </tr>
          ) : (
            movements.map((mv) => (
              <tr
                key={mv.id}
                style={{
                  borderBottom: "1px solid #ccc",
                  backgroundColor: "#fff",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#A7FFEB")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <td style={cellStyle}>{mv.id}</td>

                <td
                  style={{ ...cellStyle, fontWeight: "500", color: "#264653" }}
                >
                  {mv.productName || `Product ID: ${mv.product}`}
                </td>

                <td
                  style={{ ...cellStyle, fontWeight: "500", color: "#264653" }}
                >
                  {mv.employeeFirstName && mv.employeeLastName
                    ? `${mv.employeeFirstName} ${mv.employeeLastName}`
                    : `Employee ID: ${mv.employee}`}
                </td>

                <td style={cellStyle}>
                  {mv.shelfOriginDescription || "No origin"}
                </td>

                <td style={cellStyle}>
                  {mv.shelfDestinationDescription ||
                    `Shelf ID: ${mv.shelfDestination}`}
                </td>

                <td
                  style={{
                    ...cellStyle,
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "#264653",
                  }}
                >
                  {mv.quantity}
                </td>

                <td style={cellStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      backgroundColor:
                        mv.movementType === "IN" ? "#A7FFEB33" : "#F28B8233",
                      color: mv.movementType === "IN" ? "#18BC9C" : "#F28B82",
                      borderRadius: 20,
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      display: "inline-block",
                    }}
                  >
                    {mv.movementType}
                  </span>
                </td>

                <td
                  style={{
                    ...cellStyle,
                    color: "#7F8C8D",
                    fontSize: "0.875rem",
                  }}
                >
                  {mv.dateTime ? new Date(mv.dateTime).toLocaleString() : "N/A"}
                </td>

                <td style={{ ...cellStyle, textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {canEdit && (
                      <button
                        onClick={() => onEdit(mv)}
                        style={buttonStyle("#264653", "#A7FFEB")}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#264653";
                          e.currentTarget.style.color = "#A7FFEB";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#264653";
                        }}
                      >
                        Update
                      </button>
                    )}

                    {canDelete && (
                      <button
                        onClick={() => onDelete(mv.id)}
                        style={buttonStyle("#F28B82", "#fff")}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#F28B82";
                          e.currentTarget.style.color = "#fff";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#F28B82";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        Delete
                      </button>
                    )}

                    {!canEdit && !canDelete && (
                      <span
                        style={{
                          color: "#7F8C8D",
                          fontStyle: "italic",
                          fontSize: "0.875rem",
                          alignSelf: "center",
                        }}
                      >
                        View only
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  padding: "10px 15px",
  borderRight: "1px solid #ECF0F1",
  verticalAlign: "middle",
  fontSize: "0.875rem",
};

const buttonStyle = (borderColor, hoverBg) => ({
  padding: "6px 12px",
  borderRadius: 8,
  border: `2px solid ${borderColor}`,
  backgroundColor: "transparent",
  color: borderColor,
  fontWeight: "600",
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  fontSize: "0.75rem",
  transition: "all 0.2s ease",
});

export default WarehouseMovementList;
