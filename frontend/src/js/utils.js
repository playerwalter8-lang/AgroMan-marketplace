/**
 * Frontend utility functions
 * Common helpers for HTML pages
 */

// API base URL - auto-detect environment
const API_BASE = (() => {
  // Local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/api';
  }
  // Production (Vercel)
  if (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('agroman')) {
    return 'https://agroman-backend.vercel.app/api';
  }
  // Fallback to relative path
  return '/api';
})();

// Make authenticated API call
async function apiCall(endpoint, method = 'GET', data = null) {
  const token = localStorage.getItem('token');
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API Error');
    }
    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
}

// Save authentication token
function saveToken(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

// Get current user
function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/index.html';
}

// Check if user is logged in
function isLoggedIn() {
  return !!localStorage.getItem('token');
}

// Format currency
function formatCurrency(value) {
  return `MT ${parseFloat(value).toFixed(2)}`;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Show toast notification (simple)
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    z-index: 1000;
    max-width: 300px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Require login
function requireLogin() {
  if (!isLoggedIn()) {
    alert('Por favor, faça login primeiro');
    window.location.href = '/index.html#login';
  }
}

// Require specific user type
function requireUserType(...types) {
  const user = getCurrentUser();
  if (!user || !types.includes(user.user_type)) {
    alert('Acesso negado');
    window.location.href = '/index.html';
  }
}
