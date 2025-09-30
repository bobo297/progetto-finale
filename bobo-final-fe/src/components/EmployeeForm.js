import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ initialData = null, onSubmit, onCancel, userRole, canCreate }) => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'OPERATOR',
  });

  const isAdmin = userRole === 'ADMIN';
  const isManager = userRole === 'MANAGER';
  const canEdit = isAdmin || isManager;

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phoneNumber: initialData.phoneNumber || '',
        password: '',
        role: initialData.role || 'OPERATOR',
      });
    }
  }, [initialData]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role' && isManager && formData.role === 'ADMIN') {
      alert('You cannot change the role of an administrator.');
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canEdit) return alert('You do not have the necessary permissions.');
    if (!formData.id && !canCreate) return alert('You do not have permission to create.');
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      return alert('Please fill in all required fields.');
    }

    const dataToSend = { ...formData };
    if (!dataToSend.password) delete dataToSend.password;

    onSubmit(dataToSend);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ boxShadow: '0 4px 10px rgba(242, 139, 130, 0.2)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#1E40AF', color: '#ffffffff', padding: '1rem 1.5rem' }}>
          <h5 style={{ margin: 0, fontWeight: '700' }}>
            {initialData ? (canEdit ? 'Update Employee' : 'View Employee') : 'Create Employee'}
          </h5>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#E0E0E0',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
            <div key={field} style={{ display: 'flex', flexDirection: 'column' }}>
              <label
                htmlFor={field}
                style={{ fontWeight: '700', color: '#264653', marginBottom: '0.5rem', textTransform: 'capitalize' }}
              >
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={['firstName', 'lastName', 'email'].includes(field)}
                disabled={!canEdit}
                placeholder={`Enter ${field}`}
                style={{
                  padding: '0.5rem',
                  borderRadius: 8,
                  border: '2px solid #1E40AF',
                  fontSize: '1rem',
                  backgroundColor: canEdit ? 'white' : '#f2f2f2',
                }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="password" style={{ fontWeight: '700', color: '#264653', marginBottom: '0.5rem' }}>
              Password {formData.id ? '(Leave blank to keep current)' : ''}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={formData.id ? 'Leave blank to keep' : 'Enter password'}
              required={!formData.id}
              disabled={!canEdit}
              autoComplete="new-password"
              style={{
                padding: '0.5rem',
                borderRadius: 8,
                border: '2px solid #1E40AF',
                fontSize: '1rem',
                backgroundColor: canEdit ? 'white' : '#f2f2f2',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="role" style={{ fontWeight: '700', color: '#264653', marginBottom: '0.5rem' }}>
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={!isAdmin}
              style={{
                padding: '0.5rem',
                borderRadius: 8,
                border: '2px solid #1E40AF',
                fontSize: '1rem',
                backgroundColor: isAdmin ? 'white' : '#f2f2f2',
              }}
            >
              <option value="ADMIN">Administrator</option>
              <option value="MANAGER">Manager</option>
              <option value="OPERATOR">Operator</option>
            </select>
          </div>

          {canEdit && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: '#1E40AF',
                  color: '#ffffffff',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#474bc3ff')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2012b4ff')}
              >
                {formData.id ? 'Update' : 'Create'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
