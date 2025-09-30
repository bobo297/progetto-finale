import React, { useEffect, useState } from "react";
import ShelfList from "../components/ShelfList";
import ShelfForm from "../components/ShelfForm";
import * as shelfService from "../services/shelfService";

const ShelvesPage = () => {
  const [shelves, setShelves] = useState([]);
  const [editingShelf, setEditingShelf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const getRoleInfo = (role) => {
    const roleConfig = {
      ADMIN: {
        label: "Administrator",
        color: "#28a745", // Verde
      },
      MANAGER: {
        label: "Manager",
        color: "#fd7e14", // Arancione
      },
      OPERATOR: {
        label: "Operator",
        color: "#0e53e9ff", // Verde acqua
      },
    };
    return roleConfig[role] || roleConfig["OPERATOR"];
  };

  const userRole = (
    localStorage.getItem("userRole") || "OPERATOR"
  ).toUpperCase();

  const roleInfo = getRoleInfo(userRole);

  useEffect(() => {
    fetchShelves();
  }, []);

  const fetchShelves = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shelfService.getAllShelves();
      setShelves(data);
    } catch (err) {
      setError("Error loading shelves: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const showSuccessMessage = (msg) => {
    setError(null);
    alert(msg);
  };

  const showErrorMessage = (msg) => {
    setError(msg);
  };

  const handleCreateOrUpdate = async (shelf) => {
    if (userRole === "OPERATOR") {
      showErrorMessage("You do not have permissions to modify shelves");
      return;
    }
    if (userRole === "MANAGER" && !shelf.id) {
      showErrorMessage("Managers cannot create shelves");
      return;
    }
    try {
      if (shelf.id) {
        await shelfService.updateShelf(shelf.id, shelf);
        showSuccessMessage("Shelf updated successfully");
      } else {
        if (userRole !== "ADMIN") {
          showErrorMessage("Only the administrator can create new shelves");
          return;
        }
        await shelfService.createShelf(shelf);
        showSuccessMessage("Shelf created successfully");
      }
      fetchShelves();
      setEditingShelf(null);
      setShowForm(false);
    } catch (err) {
      showErrorMessage("Error during creation/update: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (userRole !== "ADMIN") {
      showErrorMessage("Only the administrator can delete shelves");
      return;
    }
    if (window.confirm("Are you sure you want to delete this shelf?")) {
      try {
        await shelfService.deleteShelf(id);
        showSuccessMessage("Shelf deleted");
        fetchShelves();
      } catch (err) {
        showErrorMessage("Error during deletion: " + err.message);
      }
    }
  };

  const handleEdit = (shelf) => {
    if (userRole === "OPERATOR") {
      showErrorMessage("You do not have permissions to modify shelves");
      return;
    }
    setEditingShelf(shelf);
    setShowForm(true);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingShelf(null);
    setShowForm(false);
    setError(null);
  };

  const handleAddNew = () => {
    if (userRole !== "ADMIN") {
      showErrorMessage("Only the administrator can add new shelves");
      return;
    }
    setEditingShelf(null);
    setShowForm(true);
    setError(null);
  };

  if (loading) {
    return (
      <div className="shelves-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading shelves...</p>
        </div>
        <style>{pageStyles}</style>
      </div>
    );
  }

  return (
    <div className="shelves-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">
              <i className="icon-shelf"></i>
              Shelves Management
            </h1>
            <p className="page-subtitle">
              {shelves.length} shelves registered • Access:{" "}
              <span style={{ color: roleInfo.color }}>{roleInfo.label}</span>
            </p>
          </div>
          {userRole === "ADMIN" && !showForm && (
            <button className="btn btn-primary" onClick={handleAddNew}>
              <i className="icon-plus"></i>+ Add Shelf
            </button>
          )}
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="alert alert-error">
          <i className="icon-alert"></i>
          <span>{error}</span>
          <button className="alert-close" onClick={() => setError(null)}>
            <i className="icon-close"></i>
          </button>
        </div>
      )}

      {/* Form if visible */}
      {showForm && (
        <div className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">
                {editingShelf ? "Edit Shelf" : "New Shelf"}
              </h2>
              <button className="btn-close" onClick={handleCancelEdit}>
                <i className="icon-close"></i>
              </button>
            </div>
            <ShelfForm
              onSubmit={handleCreateOrUpdate}
              onCancel={handleCancelEdit}
              initialData={editingShelf}
              userRole={userRole}
            />
          </div>
        </div>
      )}

      {/* List */}
      <div className="list-section">
        <ShelfList
          shelves={shelves}
          onEdit={handleEdit}
          onDelete={handleDelete}
          userRole={userRole}
        />
      </div>

      <style>{pageStyles}</style>
    </div>
  );
};

const pageStyles = `

.icon-close::before {
  content: "✕";
}

  .shelves-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .page-header {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    margin-bottom: 24px;
    border-left: 5px solid #4a90e2;
  }

  .header-content {
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-section {
    flex: 1;
  }

  .page-title {
    color: #2c3e50;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .page-subtitle {
    color: #718096;
    font-size: 15px;
    margin: 0;
    font-weight: 500;
  }

  .btn {
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    text-decoration: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, #4a90e2, #357abd);
    color: white;
    box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, #357abd, #2968a3);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
  }

  .alert {
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
  }

  .alert-error {
    background: #fee2e2;
    border: 1px solid #fecaca;
    color: #b91c1c;
  }

  .alert-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    margin-left: auto;
    padding: 4px;
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .alert-close:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  .form-section {
    margin-bottom: 24px;
  }

  .form-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    overflow: hidden;
    border-left: 5px solid #28a745;
  }

  .form-header {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 20px 24px;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-title {
    color: #2c3e50;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .btn-close {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #6c757d;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-close:hover {
    background: #e9ecef;
    color: #495057;
  }

  .list-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    overflow: hidden;
    border-left: 5px solid #ffc107;
  }

  /* Loading spinner */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    color: #4a90e2;
  }

  .loading-spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #4a90e2;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
    margin-bottom: 12px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default ShelvesPage;
