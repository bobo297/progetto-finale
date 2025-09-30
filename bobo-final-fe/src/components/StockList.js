import React from "react";

const StockList = ({ stocks, onEdit, onDelete, userRole }) => {
  const canEdit = userRole === "ADMIN" || userRole === "MANAGER";
  const canDelete = userRole === "ADMIN";

  // Normal cell style for consistency
  const cellStyle = {
    padding: "10px 15px",
    fontSize: "0.875rem",
    color: "#264653",
    fontWeight: "400",
  };

  const textBoldStyle = {
    padding: "10px 15px",
    fontWeight: "500",
    color: "#264653",
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ color: "#264653", marginBottom: "1.5rem" }}>
        Stock Inventory
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
              "Shelf",
              "Quantity",
              userRole !== "OPERATOR" ? "Actions" : "",
            ]
              .filter(Boolean)
              .map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "12px 15px",
                    textAlign: "left",
                    fontWeight: "700",
                    borderBottom: "2px solid #059669",
                  }}
                >
                  {header}
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td
                colSpan={userRole !== "OPERATOR" ? 5 : 4}
                style={{
                  padding: "15px",
                  textAlign: "center",
                  color: "#264653",
                  fontWeight: "600",
                }}
              >
                No stock entries found.
              </td>
            </tr>
          ) : (
            stocks.map((stock, index) => (
              <tr
                key={stock.id}
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
                <td style={cellStyle}>{stock.id}</td>
                <td style={textBoldStyle}>
                  {stock.productName || `Product ID: ${stock.product}`}
                </td>
                <td style={textBoldStyle}>
                  {stock.shelfDescription || `Shelf ID: ${stock.shelf}`}
                </td>
                {/* Quantity with normal style, no color or bold */}
                <td style={cellStyle}>{stock.quantity} units</td>

                {userRole !== "OPERATOR" && (
                  <td
                    style={{
                      padding: "10px 15px",
                      display: "flex",
                      gap: "0.5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {canEdit && (
                      <button
                        onClick={() => onEdit(stock)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 8,
                          border: "2px solid #264653",
                          backgroundColor: "transparent",
                          color: "#264653",
                          fontWeight: "600",
                          cursor: "pointer",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontSize: "0.75rem",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#264653";
                          e.currentTarget.style.color = "#A7FFEB";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#264653";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        Update
                      </button>
                    )}

                    {canDelete && (
                      <button
                        onClick={() => onDelete(stock.id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 8,
                          border: "2px solid #F28B82",
                          backgroundColor: "transparent",
                          color: "#F28B82",
                          fontWeight: "600",
                          cursor: "pointer",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontSize: "0.75rem",
                          transition: "all 0.2s ease",
                        }}
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
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
