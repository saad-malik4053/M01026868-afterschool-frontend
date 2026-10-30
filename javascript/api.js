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


function saveOrder(order) {
  return fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`POST /orders failed: ${response.status}`);
      }
      return response.json();
    });
}

function updateLessonSpace(id, newSpace) {
  return fetch(`${API_BASE_URL}/lessons/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ space: newSpace })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`PUT /lessons/${id} failed: ${response.status}`);
      }
      return response.json();
    });
}