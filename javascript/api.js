/* =============================================================
   API module — all communication with the Express back-end
   uses fetch() with promises
   ============================================================= */

const API_BASE_URL = 'http://localhost:3000';

/* ----------------------------------------------------------
   GET /lessons — retrieve all lessons
   ---------------------------------------------------------- */
function getLessons() {
  return fetch(`${API_BASE_URL}/lessons`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`GET /lessons failed: ${response.status}`);
      }
      return response.json();
    });
}

/* ----------------------------------------------------------
   POST /orders — save a new order
   ---------------------------------------------------------- */
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

/* ----------------------------------------------------------
   PUT /lessons/:id — update a lesson (used to update spaces)
   ---------------------------------------------------------- */
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

/* ----------------------------------------------------------
   CHALLENGE — Search: GET /lessons/search?q=...
   ---------------------------------------------------------- */
function searchLessons(term) {
  return fetch(`${API_BASE_URL}/lessons/search?q=${encodeURIComponent(term)}`)
    .then(response => {
      if (!response.ok) throw new Error(`GET /lessons/search failed: ${response.status}`);
      return response.json();
    });
}

/* ----------------------------------------------------------
   CHALLENGE — Teachers: GET /teachers
   ---------------------------------------------------------- */
function getTeachers() {
  return fetch(`${API_BASE_URL}/teachers`)
    .then(response => {
      if (!response.ok) throw new Error(`GET /teachers failed: ${response.status}`);
      return response.json();
    });
}

/* ----------------------------------------------------------
   CHALLENGE — Teachers: GET /teachers/:id/lessons
   ---------------------------------------------------------- */
function getTeacherLessons(teacherId) {
  return fetch(`${API_BASE_URL}/teachers/${teacherId}/lessons`)
    .then(response => {
      if (!response.ok) throw new Error(`GET /teachers/${teacherId}/lessons failed: ${response.status}`);
      return response.json();
    });
}

/* ----------------------------------------------------------
   CHALLENGE — Enrolment: GET /enrolment/:lessonId
   ---------------------------------------------------------- */
function getEnrolment(lessonId) {
  return fetch(`${API_BASE_URL}/enrolment/${lessonId}`)
    .then(response => {
      if (!response.ok) throw new Error(`GET /enrolment/${lessonId} failed: ${response.status}`);
      return response.json();
    });
}