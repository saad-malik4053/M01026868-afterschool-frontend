const API_BASE_URL = 'http://localhost:3000';

function getLessons() {
  return fetch(`${API_BASE_URL}/lessons`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`GET /lessons failed: ${response.status}`);
      }
      return response.json();
    });
}