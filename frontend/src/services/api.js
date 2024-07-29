// src/services/api.js
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchUsers = () => {
  return fetch(`${apiUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
};

export const createUser = (user) => {
  return fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error));
};
