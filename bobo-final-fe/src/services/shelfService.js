const API_BASE = 'http://localhost:8080/api/warehouse_management';

const getAuthHeaders = () => {
  const token = localStorage.getItem('basicAuthToken'); 
  return token
    ? { 'Authorization': `Basic ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

export const getAllShelves = async () => {
  const res = await fetch(`${API_BASE}/readAllShelves`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch shelves');
  return res.json();
};

export const getShelfById = async (id) => {
  const res = await fetch(`${API_BASE}/readShelfById/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch shelf');
  return res.json();
};

export const createShelf = async (shelf) => {
  const res = await fetch(`${API_BASE}/createShelf`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(shelf),
  });
  if (!res.ok) throw new Error('Failed to create shelf');
  return res.text();
};

export const updateShelf = async (id, shelf) => {
  const res = await fetch(`${API_BASE}/updateShelf/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(shelf),
  });
  if (!res.ok) throw new Error('Failed to update shelf');
  return res.text();
};

export const deleteShelf = async (id) => {
  const res = await fetch(`${API_BASE}/deleteShelf/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete shelf');
  return res.text();
};
