const API_BASE = 'http://localhost:8080/api/warehouse_management';

const getAuthHeaders = () => {
  const token = localStorage.getItem('basicAuthToken');
  return token
    ? { Authorization: `Basic ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

export const getAllStocks = async () => {
  const res = await fetch(`${API_BASE}/readAllStocks`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch stocks');
  return res.json();
};

export const getStockById = async (id) => {
  const res = await fetch(`${API_BASE}/readStockById/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch stock');
  return res.json();
};

export const createStock = async (stock) => {
  const res = await fetch(`${API_BASE}/createStock`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(stock),
  });
  if (!res.ok) throw new Error('Failed to create stock');
  return res.text();
};

export const updateStock = async (id, stock) => {
  const res = await fetch(`${API_BASE}/updateStock/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(stock),
  });
  if (!res.ok) throw new Error('Failed to update stock');
  return res.text();
};

export const deleteStock = async (id) => {
  const res = await fetch(`${API_BASE}/deleteStock/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete stock');
  return res.text();
};
