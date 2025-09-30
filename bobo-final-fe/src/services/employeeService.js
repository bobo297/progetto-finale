import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/warehouse_management';

const getAuthHeader = () => {
  const token = localStorage.getItem('basicAuthToken');
  return {
    headers: {
      'Authorization': `Basic ${token}`
    }
  };
};

export const getAllEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}/readAllEmployees`, getAuthHeader());
  return response.data;
};

export const createEmployee = async (employee) => {
  await axios.post(`${API_BASE_URL}/createEmployee`, employee, getAuthHeader());
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${API_BASE_URL}/deleteEmployee/${id}`, getAuthHeader());
};

export const updateEmployee = async (id, employee) => {
  await axios.put(`${API_BASE_URL}/updateEmployee/${id}`, employee, getAuthHeader());
};

export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/readEmployeeById/${id}`, getAuthHeader());
  return response.data;
};
