import express, { request, response } from "express";
const app = express();

app.use(express.json());

let directory = [
  {
    id: 1,
    name: "Clive Cat",
    number: "555-1212",
  },
  {
    id: 2,
    name: "Edward",
    number: "555-2323",
  },
  {
    id: 3,
    name: "Colette",
    number: "111-2323",
  },
];

// Utility Functions
const generateId = () => {
  if (directory.length === 0) return 1;
  return Math.max(...directory.map((l) => l.id)) + 1;
};

// Get Info
app.get("/api/info", (request, response) => {
  const date = new Date();
  const numberOfListings = directory.length;
  const text =
    `<p>Directory has ${numberOfListings} listings</p>` + `<p>${date}</p>`;
  response.send(text);
});

// Get All
app.get("/api/directory", (request, response) => {
  response.json(directory);
});

// Get Specific Listing
app.get("/api/directory/:id", (request, response) => {
  const id = Number(request.params.id);
  const listing = directory.find((listing) => listing.id === id);
  response.json(listing);
});

// Delete Specific Lisiting
app.delete("/api/directory/:id", (request, response) => {
  const id = Number(request.params.id);
  directory = directory.filter((listing) => listing.id !== id);
  response.status(204).end();
});

// Add Listing
app.post("/api/directory", (request, response) => {
  const listingObject = request.body;

  // Check if request has minimum content
  if (!listingObject.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  // Check if request is duplicate
  if (directory.find((listing) => listing.name === listingObject.name)) {
    return response.status(400).json({
      error: `'${listingObject.name}' already in directory. Names must be unique`,
    });
  }

  const newListing = { ...listingObject, id: generateId() };
  directory.push(newListing);
  response.json(newListing);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
