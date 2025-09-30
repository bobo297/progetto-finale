
const API_BASE = 'http://localhost:8080/api/warehouse_management';

const getAuthHeaders = () => {
  const token = localStorage.getItem('basicAuthToken');
  return token
    ? { 'Authorization': `Basic ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

export const getAllMovements = async () => {
  const res = await fetch(`${API_BASE}/readAllWarehouseMovement`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch warehouse movements');
  return res.json();
};

export const getMovementById = async (id) => {
  const res = await fetch(`${API_BASE}/readWarehouseMovementById/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch movement');
  return res.json();
};

export const createMovement = async (movement) => {
  const res = await fetch(`${API_BASE}/createWarehouseMovement`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(movement),
  });
  if (!res.ok) throw new Error('Failed to create warehouse movement');
  return res.text();
};

export const updateMovement = async (id, movement) => {
  const res = await fetch(`${API_BASE}/updateWarehouseMovement/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(movement),
  });
  if (!res.ok) throw new Error('Failed to update warehouse movement');
  return res.text();
};

export const deleteMovement = async (id) => {
  const res = await fetch(`${API_BASE}/deleteWarehouseMovement/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete warehouse movement');
  return res.text();
};
