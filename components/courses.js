
// Initial course dataset.
// Kept separate from the UI so the app is clearly data-driven:
// components read from this shape, they never hardcode course info.

const initialCourses = [
  {
    name: 'Mobile Application Development',
    attendance: 85,
    marks: 82,
  },
  {
    name: 'Artificial Intelligence',
    attendance: 78,
    marks: 75,
  },
  {
    name: 'Software Engineering',
    attendance: 91,
    marks: 88,
  },
  {
    name: 'Computer Networks',
    attendance: 72,
    marks: 80,
  },
];

export default initialCourses;