/* =============================================================
   Local lesson data — used as a development fallback when the
   back-end server is not reachable. When the Express server
   is deployed, the app will fetch lessons from the API instead.
   ============================================================= */

const LOCAL_LESSONS = [
  { id: 1,  topic: 'Mathematics',         location: 'Hendon',       price: 100, space: 5, icon: 'fas fa-calculator' },
  { id: 2,  topic: 'Computer Science',    location: 'Colindale',    price: 120, space: 5, icon: 'fas fa-laptop-code' },
  { id: 3,  topic: 'Physics',             location: 'Brent Cross',  price: 110, space: 5, icon: 'fas fa-atom' },
  { id: 4,  topic: 'Chemistry',           location: 'Golders Green', price: 115, space: 5, icon: 'fas fa-flask' },
  { id: 5,  topic: 'Biology',             location: 'Hendon',       price: 95,  space: 5, icon: 'fas fa-dna' },
  { id: 6,  topic: 'English Literature',  location: 'Colindale',    price: 90,  space: 5, icon: 'fas fa-book' },
  { id: 7,  topic: 'History',             location: 'Brent Cross',  price: 85,  space: 5, icon: 'fas fa-landmark' },
  { id: 8,  topic: 'Geography',           location: 'Golders Green', price: 80,  space: 5, icon: 'fas fa-globe' },
  { id: 9,  topic: 'Art',                 location: 'Hendon',       price: 75,  space: 5, icon: 'fas fa-palette' },
  { id: 10, topic: 'Music',               location: 'Colindale',    price: 105, space: 5, icon: 'fas fa-music' },
  { id: 11, topic: 'Physical Education',  location: 'Brent Cross',  price: 70,  space: 5, icon: 'fas fa-running' },
  { id: 12, topic: 'French',              location: 'Golders Green', price: 88,  space: 5, icon: 'fas fa-language' }
];