const API_BASE = 'http://localhost:8080/api/warehouse_management';

const getAuthHeaders = () => {
  const token = localStorage.getItem('basicAuthToken');
  return token 
    ? { Authorization: `Basic ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

export const getAllProducts = async () => {
  const res = await fetch(`${API_BASE}/readAllProducts`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_BASE}/readProductById/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(`${API_BASE}/createProduct`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.text();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_BASE}/updateProduct/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.text();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_BASE}/deleteProduct/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.text();
};
