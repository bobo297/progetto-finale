const API_BASE = 'http://localhost:8080/api/warehouse_management';

const getAuthHeaders = () => {
  const token = localStorage.getItem('basicAuthToken');
  return token 
    ? { Authorization: `Basic ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

export const getAllWarehouses = async () => {
  const res = await fetch(`${API_BASE}/readAllWarehouse`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch warehouses');
  return res.json();
};

export const getWarehouseById = async (id) => {
  const res = await fetch(`${API_BASE}/readWarehouseById/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch warehouse');
  return res.json();
};

export const createWarehouse = async (warehouse) => {
  const res = await fetch(`${API_BASE}/createWarehouse`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(warehouse),
  });
  if (!res.ok) throw new Error('Failed to create warehouse');
  return res.text();
};

export const updateWarehouse = async (id, warehouse) => {
  const res = await fetch(`${API_BASE}/updateWarehouse/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(warehouse),
  });
  if (!res.ok) throw new Error('Failed to update warehouse');
  return res.text();
};

export const deleteWarehouse = async (id) => {
  const res = await fetch(`${API_BASE}/deleteWarehouse/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete warehouse');
  return res.text();
};
