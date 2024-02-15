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

test("/deleteNote - Delete a note", async () => {
    // First, create a note to delete
    const createResponse = await request(app).post('/createNote').send({ title: "Note to delete", content: "This note will be deleted" });
    const noteId = createResponse.body.id; // Assuming your create endpoint returns the ID of the created note
  
    // Now delete the note
    const deleteResponse = await request(app).delete(`/deleteNote/${noteId}`);
    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.message).toContain('note deleted'); // Adjust based on your actual response
  
    // Optionally, try to fetch the note to ensure it was deleted
    const fetchDeleted = await request(app).get(`/getNote/${noteId}`);
    expect(fetchDeleted.statusCode).toBe(404); // Assuming 404 for not found
  });