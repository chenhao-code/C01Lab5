const request = require('supertest');
const app = require('../app'); // Adjust the path to where your Express app is exported

// Example of a test that adds a note, then checks if it can retrieve it
test("/getAllNotes - Return list of notes for getAllNotes", async () => {
  // Create a note first
  await request(app).post('/createNote').send({ title: "Test Note", content: "This is a test note" });

  // Now get all notes
  const response = await request(app).get('/getAllNotes');
  expect(response.statusCode).toBe(200);
  // This assumes that the note just created would be in the list, checks if the array is not empty
  expect(response.body.length).toBeGreaterThan(0);
});