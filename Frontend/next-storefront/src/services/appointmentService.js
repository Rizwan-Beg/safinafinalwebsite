// FILE: Frontend/website/src/services/appointmentService.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

// Book a new appointment
export const bookAppointment = async (appointmentData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments/book`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(appointmentData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to book appointment');
    }

    return data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};

// Check availability for a specific date
export const checkAvailability = async (date) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments/availability?date=${date}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to check availability');
    }

    return data;
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};

// Get available dates for the next 30 days
export const getAvailableDates = async (days = 30) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments/available-dates?days=${days}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch available dates');
    }

    return data;
  } catch (error) {
    console.error('Error fetching available dates:', error);
    throw error;
  }
};

// Get user's appointments
export const getUserAppointments = async (token, options = {}) => {
  try {
    const { status, limit = 10, page = 1 } = options;
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...(status && { status })
    });

    const response = await fetch(`${API_BASE_URL}/api/appointments/my?${queryParams}`, {
      headers: getAuthHeaders(token)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch appointments');
    }

    return data;
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    throw error;
  }
};

// Cancel an appointment
export const cancelAppointment = async (appointmentId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments/${appointmentId}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders(token)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to cancel appointment');
    }

    return data;
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
};

// Get user's wishlist/favorites
export const getUserWishlist = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
      headers: getAuthHeaders(token)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch wishlist');
    }

    return data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

// Get all rugs
export const getAllRugs = async (options = {}) => {
  try {
    const { search, category, material, limit, page } = options;
    const queryParams = new URLSearchParams();
    
    if (search) queryParams.append('search', search);
    if (category) queryParams.append('category', category);
    if (material) queryParams.append('material', material);
    if (limit) queryParams.append('limit', limit);
    if (page) queryParams.append('page', page);

    const response = await fetch(`${API_BASE_URL}/api/rugs?${queryParams}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch rugs');
    }

    return data;
  } catch (error) {
    console.error('Error fetching rugs:', error);
    throw error;
  }
};