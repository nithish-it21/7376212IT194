// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/products';

const authData = {
  companyName: 'goMart',
  clientID: '37bb493c-73d3-47ea-8675-21f66ef9b735',
  clientSecret: 'HVIQBVbqmTGEmaED',
  ownerName: 'Nithish',
  ownerEmail: 'nithish.it21@bitsathy.ac.in',
  rollNo: '1',
};

export const getAuthToken = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, authData);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
};