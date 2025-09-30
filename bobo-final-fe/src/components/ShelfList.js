import React from "react";

const ShelfList = ({ shelves, onEdit, onDelete, userRole }) => {
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
        Shelf Management
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
            {["ID", "Description", "Warehouse", "Actions"].map((header) => (
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
          {shelves.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: "15px",
                  textAlign: "center",
                  color: "#264653",
                  fontWeight: "600",
                }}
              >
                No shelves found.
              </td>
            </tr>
          ) : (
            shelves.map((shelf) => (
              <tr
                key={shelf.id}
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
                <td style={{ padding: "10px 15px" }}>{shelf.id}</td>
                <td style={{ padding: "10px 15px" }}>{shelf.description}</td>
                <td style={{ padding: "10px 15px" }}>
                  {shelf.warehouseName || `Warehouse ID: ${shelf.warehouseId}`}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  {canEdit && (
                    <button
                      onClick={() => onEdit(shelf)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "2px solid #264653",
                        backgroundColor: "transparent",
                        color: "#264653",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
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
                      onClick={() => onDelete(shelf.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "2px solid #F28B82",
                        backgroundColor: "transparent",
                        color: "#F28B82",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F28B82";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#F28B82";
                      }}
                    >
                      Delete
                    </button>
                  )}
                  {!canEdit && !canDelete && (
                    <span
                      style={{
                        color: "#264653",
                        fontStyle: "italic",
                        fontWeight: "600",
                      }}
                    >
                      View only
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShelfList;
