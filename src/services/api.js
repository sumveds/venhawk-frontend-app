/**
 * API Service Layer
 * @description Centralized API calls for the application
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Generic fetch wrapper with error handling
 */
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Project API Service
 */
export const projectAPI = {
  /**
   * Submit a new project
   * @param {Object} projectData - Complete project data from all form pages
   * @param {string} accessToken - Auth0 access token
   * @returns {Promise<Object>} Created project data
   */
  submitProject: async (projectData, accessToken) => {
    return fetchAPI('/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(projectData),
    });
  },

  /**
   * Upload project files
   * @param {number} projectId - Project ID
   * @param {File[]} files - Array of file objects
   * @param {string} accessToken - Auth0 access token
   * @returns {Promise<Object>} Upload response
   */
  uploadFiles: async (projectId, files, accessToken) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return fetch(`${API_BASE_URL}/projects/${projectId}/files`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    }).then(res => res.json());
  },

  /**
   * Get user's projects
   * @param {string} accessToken - Auth0 access token
   * @returns {Promise<Array>} List of projects
   */
  getProjects: async (accessToken) => {
    return fetchAPI('/projects', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  /**
   * Get a specific project by ID
   * @param {number} projectId - Project ID
   * @param {string} accessToken - Auth0 access token
   * @returns {Promise<Object>} Project data
   */
  getProject: async (projectId, accessToken) => {
    return fetchAPI(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

/**
 * User API Service
 */
export const userAPI = {
  /**
   * Sync user data from Auth0
   * @param {Object} userData - User data from Auth0
   * @param {string} accessToken - Auth0 access token
   * @returns {Promise<Object>} User data
   */
  syncUser: async (userData, accessToken) => {
    return fetchAPI('/users/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userData),
    });
  },
};

export default {
  projectAPI,
  userAPI,
};
