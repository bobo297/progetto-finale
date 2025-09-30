import React, { useEffect, useState } from "react";
import WarehouseMovementList from "../components/WarehouseMovementList";
import WarehouseMovementForm from "../components/WarehouseMovementForm";

import * as warehouseMovementService from "../services/warehouseMovementService";
import * as productService from "../services/productService";
import * as shelfService from "../services/shelfService";
import * as employeeService from "../services/employeeService";

const WarehouseMovementsPage = () => {
  const [movements, setMovements] = useState([]);
  const [editingMovement, setEditingMovement] = useState(null);

  const [products, setProducts] = useState([]);
  const [shelves, setShelves] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const userRole = (
    localStorage.getItem("userRole") || "OPERATOR"
  ).toUpperCase();

  // Defines permissions based on role
  const getRoleInfo = () => {
    const roleConfig = {
      ADMIN: {
        label: "Administrator",
        color: "#28a745", // Verde
        canCreate: true,
        canEdit: true,
        canDelete: true,
      },
      MANAGER: {
        label: "Manager",
        color: "#fd7e14", // Arancione
        canCreate: false,
        canEdit: true,
        canDelete: false,
      },
      OPERATOR: {
        label: "Operator",
        color: "#0e53e9ff", // Verde acqua
        canCreate: false,
        canEdit: false,
        canDelete: false,
      },
    };
    return roleConfig[userRole] || roleConfig["OPERATOR"];
  };

  const roleInfo = getRoleInfo();

  const fetchDependencies = async () => {
    try {
      const prods = await productService.getAllProducts();
      const shs = await shelfService.getAllShelves();
      const emps = await employeeService.getAllEmployees();
      setProducts(prods);
      setShelves(shs);
      setEmployees(emps);
    } catch (err) {
      setError("Error loading auxiliary data: " + err.message);
      console.error(err);
    }
  };

  const fetchMovements = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await warehouseMovementService.getAllMovements();
      setMovements(data);
    } catch (err) {
      setError("Error loading movements: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchDependencies();
      await fetchMovements();
    })();
  }, []);

  const showSuccessMessage = (msg) => {
    setError(null);
    alert(msg); // Temporary, replace with toast
  };

  const showErrorMessage = (msg) => {
    setError(msg);
  };

  const handleCreateOrUpdate = async (movement) => {
    if (userRole === "OPERATOR") {
      showErrorMessage("You do not have permission to modify movements");
      return;
    }
    if (userRole === "MANAGER" && !movement.id) {
      showErrorMessage("Managers cannot create new movements");
      return;
    }

    try {
      if (movement.id) {
        await warehouseMovementService.updateMovement(movement.id, movement);
        showSuccessMessage("Movement updated successfully");
      } else {
        await warehouseMovementService.createMovement(movement);
        showSuccessMessage("Movement created successfully");
      }
      fetchMovements();
      setEditingMovement(null);
      setShowForm(false);
    } catch (err) {
      showErrorMessage("Error during the operation: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (userRole !== "ADMIN") {
      showErrorMessage("You do not have permission to delete movements");
      return;
    }
    if (window.confirm("Are you sure you want to delete this movement?")) {
      try {
        await warehouseMovementService.deleteMovement(id);
        showSuccessMessage("Movement deleted successfully");
        fetchMovements();
      } catch (err) {
        showErrorMessage("Error during deletion: " + err.message);
      }
    }
  };

  const handleEdit = (movement) => {
    if (userRole === "OPERATOR") {
      showErrorMessage("You do not have permission to modify movements");
      return;
    }
    setEditingMovement(movement);
    setShowForm(true);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingMovement(null);
    setShowForm(false);
    setError(null);
  };

  const handleAddNew = () => {
    if (userRole !== "ADMIN") {
      showErrorMessage("Only administrators can add new movements");
      return;
    }
    setEditingMovement(null);
    setShowForm(true);
    setError(null);
  };

  if (loading) {
    return (
      <div className="employees-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading movements...</p>
        </div>
        <style>{pageStyles}</style>
      </div>
    );
  }

  return (
    <div className="employees-page">
      {/* Header */}
      <div className="page-header" style={{ borderLeftColor: '#4a90e2' }}>
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">
              <i className="icon-users"></i> Movements Management
            </h1>
            <p className="page-subtitle">
              {movements.length} movements recorded • Access:{" "}
              <span style={{ color: roleInfo.color }}>{roleInfo.label}</span>
            </p>
          </div>

          {roleInfo.canCreate && !showForm && (
            <button className="btn btn-primary" onClick={handleAddNew}>
              <i className="icon-plus"></i> Add Movement
            </button>
          )}
        </div>
      </div>

      {/* Error alerts */}
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
          <div
            className="form-container"
            style={{ borderLeftColor: '#28a745' }}
          >
            <div className="form-header">
              <h2 className="form-title">
                {editingMovement ? "Edit Movement" : "New Movement"}
              </h2>
              <button className="btn-close" onClick={handleCancelEdit}>
                <i className="icon-close"></i>
              </button>
            </div>

            <WarehouseMovementForm
              onSubmit={handleCreateOrUpdate}
              onCancel={handleCancelEdit}
              initialData={editingMovement}
              products={products}
              shelves={shelves}
              employees={employees}
              userRole={userRole}
            />
          </div>
        </div>
      )}

      {/* Movements list */}
      <div className="list-section" style={{ borderLeftColor: "#ffc107" }}>
        <WarehouseMovementList
          movements={Array.isArray(movements) ? movements : []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          userRole={userRole}
          roleInfo={roleInfo}
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

  .employees-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .page-header {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(214, 45, 45, 0.08);
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    border-left: 5px solid #4a90e2;
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    border-left: 5px solid #ffc107;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f4f6;
    border-top: 4px solid #4a90e2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-container p {
    color: #718096;
    font-size: 16px;
    margin: 0;
  }

  /* Icone usando caratteri Unicode */
  .icon-users::before { content: "👥"; margin-right: 8px; }
  .icon-plus::before { content: "+"; }
  .icon-alert::before { content: "⚠️"; }
  .icon-close::before { content: "✕"; }

  /* Responsive Design */
  @media (max-width: 768px) {
    .employees-page {
      padding: 12px;
    }

    .header-content {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }

    .page-title {
      font-size: 24px;
    }

    .btn {
      justify-content: center;
    }
  }

  /* Colori per gestionale magazzino */
  :root {
    --primary-blue: #4a90e2;
    --success-green: #28a745;
    --warning-orange: #fd7e14;
    --danger-red: #dc3545;
    --info-teal: #20c997;
    --gray-light: #f8f9fa;
    --gray-medium: #6c757d;
    --gray-dark: #2c3e50;
  }

  /* Stili per migliorare l'accessibilità */
  .btn:focus {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }

  .alert-close:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

export default WarehouseMovementsPage;
