// Import the pets array from data.js
const pets = require("./data");

// Initialize Express application
const express = require("express");
const app = express();
const PORT = 8080;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// GET - / - Serve the homepage (index.html) from the public folder
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// GET - /api - Simple hello world route for API testing
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// GET - /api/v1/pets - Retrieve all pets from the database
app.get("/api/v1/pets", (req, res) => {
  console.log("Fetching all pets:", pets);
  res.json(pets);
});

// GET - /api/v1/pets/owner - Retrieve a pet by owner using a query string
app.get("/api/v1/pets/owner", (req, res) => {
  const { owner } = req.query;
  const pet = pets.find((pet) => pet.owner === owner);

  if (pet) {
    res.status(200).json(pet);
  } else {
    res.status(404).json({ message: "No pet found for this owner" });
  }
});

// GET - /api/v1/pets/:name - Retrieve a pet by name using a route parameter
app.get("/api/v1/pets/:name", (req, res) => {
  const { name } = req.params;
  const pet = pets.find((pet) => pet.name === name);

  if (pet) {
    res.status(200).json(pet);
  } else {
    res.status(404).json({ message: "Pet not found" });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
