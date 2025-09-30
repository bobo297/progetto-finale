// WarehousesPage.jsx
import React, { useEffect, useState } from "react";
import WarehouseList from "../components/WarehouseList";
import WarehouseForm from "../components/WarehouseForm";
import * as warehouseService from "../services/warehouseService";

const WarehousesPage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Get user role and convert it to uppercase for consistency
  const userRole = (
    localStorage.getItem("userRole") || "OPERATOR"
  ).toUpperCase();

  // Permissions and label configuration based on role
  const getRoleInfo = () => {
    const roleConfig = {
      ADMIN: {
        label: "Administrator",
        color: "#28a745",
        canCreate: true,
        canEdit: true,
        canDelete: true,
        canView: true,
      },
      MANAGER: {
        label: "Manager",
        color: "#fd7e14",
        canCreate: false,
        canEdit: true,
        canDelete: false,
        canView: true,
      },
      OPERATOR: {
        label: "Operator",
        color: "#0e53e9ff",
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canView: true,
      },
    };
    return roleConfig[userRole] || roleConfig["OPERATOR"];
  };

  const roleInfo = getRoleInfo();

  // Fetch warehouses data
  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!roleInfo.canView) {
        setError("You do not have permission to view warehouses.");
        setWarehouses([]);
        return;
      }
      const data = await warehouseService.getAllWarehouses();
      setWarehouses(data);
    } catch (error) {
      setError("Error loading warehouses: " + error.message);
      console.error("Error fetching warehouses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  // Temporary messages (alert or toast later)
  const showSuccessMessage = (message) => {
    setError(null);
    alert(message);
  };

  const showErrorMessage = (message) => {
    setError(message);
  };

  // Create or update warehouse
  const handleCreateOrUpdate = async (warehouse) => {
    if (userRole === "OPERATOR") {
      showErrorMessage("You do not have permission to modify warehouses");
      return;
    }
    if (userRole === "MANAGER" && !warehouse.id) {
      showErrorMessage("Managers cannot create new warehouses");
      return;
    }
    try {
      if (warehouse.id) {
        await warehouseService.updateWarehouse(warehouse.id, warehouse);
        showSuccessMessage("Warehouse updated successfully");
      } else {
        if (!roleInfo.canCreate) {
          showErrorMessage("You do not have permission to create a warehouse");
          return;
        }
        await warehouseService.createWarehouse(warehouse);
        showSuccessMessage("Warehouse created successfully");
      }
      fetchWarehouses();
      setEditingWarehouse(null);
      setShowForm(false);
    } catch (error) {
      showErrorMessage("Error during the operation: " + error.message);
    }
  };

  // Delete warehouse
  const handleDelete = async (id) => {
    if (!roleInfo.canDelete) {
      showErrorMessage("You do not have permission to delete warehouses");
      return;
    }
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      try {
        await warehouseService.deleteWarehouse(id);
        showSuccessMessage("Warehouse deleted successfully");
        fetchWarehouses();
      } catch (error) {
        showErrorMessage("Error during deletion: " + error.message);
      }
    }
  };

  // Edit warehouse (open form)
  const handleEdit = (warehouse) => {
    if (!roleInfo.canEdit) {
      showErrorMessage("You do not have permission to modify warehouses");
      return;
    }
    setEditingWarehouse(warehouse);
    setShowForm(true);
    setError(null);
  };

  // Cancel editing/creating
  const handleCancelEdit = () => {
    setEditingWarehouse(null);
    setShowForm(false);
    setError(null);
  };

  // Add new warehouse
  const handleAddNew = () => {
    if (!roleInfo.canCreate) {
      showErrorMessage("Only administrators can add new warehouses");
      return;
    }
    setEditingWarehouse(null);
    setShowForm(true);
    setError(null);
  };

  if (!roleInfo.canView) {
    return (
      <div className="warehouses-page">
        <p className="no-permission-msg">
          You do not have permission to view this page.
        </p>
        <style>{pageStyles}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="warehouses-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading warehouses...</p>
        </div>
        <style>{pageStyles}</style>
      </div>
    );
  }

  return (
    <div className="warehouses-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">
              <i className="icon-warehouse"></i>
              Warehouse Management
            </h1>
            <p className="page-subtitle">
              {warehouses.length} warehouses registered • Access:{" "}
              <span style={{ color: roleInfo.color }}>{roleInfo.label}</span>
            </p>
          </div>
          {roleInfo.canCreate && !showForm && (
            <button className="btn btn-primary" onClick={handleAddNew}>
              <i className="icon-plus"></i>+ Add Warehouse
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

      {/* Form */}
      {showForm && (
        <div className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">
                {editingWarehouse ? "Edit Warehouse" : "New Warehouse"}
              </h2>
              <button className="btn-close" onClick={handleCancelEdit}>
                <i className="icon-close"></i>
              </button>
            </div>
            <WarehouseForm
              onSubmit={handleCreateOrUpdate}
              onCancel={handleCancelEdit}
              initialData={editingWarehouse}
              userRole={userRole}
            />
          </div>
        </div>
      )}

      {/* List */}
      <div className="list-section">
        <WarehouseList
          warehouses={warehouses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canEdit={roleInfo.canEdit}
          canDelete={roleInfo.canDelete}
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

  .warehouses-page {
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
    color: #264653;
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
    background: rgba(0,0,0,0.1);
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
    color: #264653;
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

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    color: #718096;
  }

  .loading-spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #28a745;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 12px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
  }

  .no-permission-msg {
    color: #b91c1c;
    font-size: 18px;
    text-align: center;
    margin-top: 80px;
    font-weight: 600;
  }
`;

export default WarehousesPage;
