import React, { useState, useEffect } from "react";
import * as stockService from "../services/stockService";
import StockForm from "../components/StockForm";
import StockList from "../components/StockList";

const StocksPage = () => {
  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userRole, setUserRole] = useState("OPERATOR");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole((role || "OPERATOR").toUpperCase());
    fetchStocks();
  }, []);

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

  const fetchStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stockService.getAllStocks();
      setStocks(data);
    } catch (error) {
      setError("Error loading stocks: " + error.message);
      console.error("Error fetching stocks:", error);
    } finally {
      setLoading(false);
    }
  };

  const showSuccessMessage = (message) => {
    setError(null);
    alert(message);
  };

  const showErrorMessage = (message) => {
    setError(message);
  };

  const handleCreateOrUpdate = async (stock) => {
    if (userRole === "OPERATOR") {
      showErrorMessage("You do not have permission to modify stocks");
      return;
    }
    if (userRole === "MANAGER" && !stock.id) {
      showErrorMessage("Managers cannot create new stocks");
      return;
    }
    try {
      if (stock.id) {
        await stockService.updateStock(stock.id, stock);
        showSuccessMessage("Stock updated successfully");
      } else {
        if (userRole !== "ADMIN") {
          showErrorMessage("Only the administrator can create new stocks");
          return;
        }
        await stockService.createStock(stock);
        showSuccessMessage("Stock created successfully");
      }
      fetchStocks();
      setEditingStock(null);
      setShowForm(false);
    } catch (error) {
      showErrorMessage("Error during operation: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (userRole !== "ADMIN") {
      showErrorMessage("Only the administrator can delete stocks");
      return;
    }
    if (window.confirm("Are you sure you want to delete this stock?")) {
      try {
        await stockService.deleteStock(id);
        showSuccessMessage("Stock deleted successfully");
        fetchStocks();
      } catch (error) {
        showErrorMessage("Error during deletion: " + error.message);
      }
    }
  };

  const handleEdit = (stock) => {
    if (userRole === "OPERATOR") {
      showErrorMessage("You do not have permission to modify stocks");
      return;
    }
    setEditingStock(stock);
    setShowForm(true);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingStock(null);
    setShowForm(false);
    setError(null);
  };

  const handleAddNew = () => {
    if (userRole !== "ADMIN") {
      showErrorMessage("Only the administrator can add new stocks");
      return;
    }
    setEditingStock(null);
    setShowForm(true);
    setError(null);
  };

  if (loading) {
    return (
      <div className="stocks-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading stocks...</p>
        </div>
        <style>{pageStyles}</style>
      </div>
    );
  }

  return (
    <div className="stocks-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">
              <i className="icon-box"></i>
              Stock Management
            </h1>
            <p className="page-subtitle">
              {stocks.length} stocks registered • Access:{" "}
              <span style={{ color: roleInfo.color }}>{roleInfo.label}</span>
            </p>
          </div>
          {userRole === "ADMIN" && !showForm && (
            <button className="btn btn-primary" onClick={handleAddNew}>
              <i className="icon-plus"></i>+ Add Stock
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
                {editingStock ? "Edit Stock" : "New Stock"}
              </h2>
              <button className="btn-close" onClick={handleCancelEdit}>
                <i className="icon-close"></i>
              </button>
            </div>
            <StockForm
              onSubmit={handleCreateOrUpdate}
              onCancel={handleCancelEdit}
              initialData={editingStock}
              userRole={userRole}
            />
          </div>
        </div>
      )}

      {/* List */}
      <div className="list-section">
        <StockList
          stocks={stocks}
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

  .stocks-page {
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

export default StocksPage;
