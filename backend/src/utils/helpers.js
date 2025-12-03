/**
 * Utility functions for the API
 */

// Sanitize user input
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
}

// Format response with consistent structure
function formatResponse(success, data, message = '') {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString()
  };
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (basic)
function isValidPhone(phone) {
  const phoneRegex = /^\+?[\d\s\-()]{7,}$/;
  return phoneRegex.test(phone);
}

module.exports = {
  sanitizeInput,
  formatResponse,
  isValidEmail,
  isValidPhone
};
