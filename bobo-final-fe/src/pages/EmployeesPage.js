// EmployeesPage.jsx
import React, { useEffect, useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import * as employeeService from "../services/employeeService";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Get role and convert to uppercase for consistency
  const userRole = (
    localStorage.getItem("userRole") || "OPERATOR"
  ).toUpperCase();

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      setError("Error loading employees: " + error.message);
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const showSuccessMessage = (message) => {
    setError(null);
    // Here you could implement a toast/notification system
    alert(message); // Temporary
  };

  const showErrorMessage = (message) => {
    setError(message);
  };

  const handleCreateOrUpdate = async (employee) => {
    if (userRole === "OPERATOR") {
      showErrorMessage("You do not have permission to modify employees");
      return;
    }
    if (userRole === "MANAGER" && !employee.id) {
      showErrorMessage("Managers cannot create new employees");
      return;
    }

    try {
      if (employee.id) {
        await employeeService.updateEmployee(employee.id, employee);
        showSuccessMessage("Employee successfully updated");
      } else {
        await employeeService.createEmployee(employee);
        showSuccessMessage("Employee successfully created");
      }
      fetchEmployees();
      setEditingEmployee(null);
      setShowForm(false);
    } catch (error) {
      showErrorMessage("Error during operation: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (userRole !== "ADMIN") {
      showErrorMessage("You do not have permission to delete employees");
      return;
    }

    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeService.deleteEmployee(id);
        showSuccessMessage("Employee successfully deleted");
        fetchEmployees();
      } catch (error) {
        showErrorMessage("Error during deletion: " + error.message);
      }
    }
  };

  const handleEdit = (employee) => {
    if (userRole === "OPERATOR") {
      showErrorMessage("You do not have permission to modify employees");
      return;
    }
    setEditingEmployee(employee);
    setShowForm(true);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
    setShowForm(false);
    setError(null);
  };

  const handleAddNew = () => {
    if (userRole !== "ADMIN") {
      showErrorMessage("Only administrators can add new employees");
      return;
    }
    setEditingEmployee(null);
    setShowForm(true);
    setError(null);
  };

  const getRoleInfo = () => {
    const roleConfig = {
      ADMIN: { label: "Administrator", color: "#28a745", canCreate: true },
      MANAGER: { label: "Manager", color: "#fd7e14", canCreate: false },
      OPERATOR: { label: "Operator", color: "#0e53e9ff", canCreate: false },
    };
    return roleConfig[userRole] || roleConfig["OPERATOR"];
  };

  const roleInfo = getRoleInfo();

  if (loading) {
    return (
      <div className="employees-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading employees...</p>
        </div>
        <style>{pageStyles}</style>
      </div>
    );
  }

  return (
    <div className="employees-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">
              <i className="icon-users"></i>
              Employee Management
            </h1>
            <p className="page-subtitle">
              {employees.length} registered employees • Access:{" "}
              <span style={{ color: roleInfo.color, fontWeight: "700" }}>
                {roleInfo.label}
              </span>
            </p>
          </div>

          {roleInfo.canCreate && !showForm && (
            <button className="btn btn-primary" onClick={handleAddNew}>
              <i className="icon-plus"></i>
              Add Employee
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

      {/* Form Section */}
      {showForm && (
        <div className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">
                {editingEmployee ? "Edit Employee" : "New Employee"}
              </h2>
              <button className="btn-close" onClick={handleCancelEdit}>
                <i className="icon-close"></i>
              </button>
            </div>

            <EmployeeForm
              onSubmit={handleCreateOrUpdate}
              onCancel={handleCancelEdit}
              initialData={editingEmployee}
              userRole={userRole}
              canCreate={roleInfo.canCreate}
            />
          </div>
        </div>
      )}

      {/* Employee List */}
      <div className="list-section">
        <EmployeeList
          employees={employees}
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
  .employees-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .page-header {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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

export default EmployeesPage;
