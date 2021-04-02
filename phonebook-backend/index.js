import express, { request, response } from "express";
import morgan from "morgan";
import cors from "cors";

// Middleware Functions
morgan.token("body", (req) => JSON.stringify(req.body));
const morganFormat =
  ":method :url :status :res[content-length] :response-time ms :body";

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Utility Functions
const generateId = () => {
  if (directory.length === 0) return 1;
  return Math.max(...directory.map((l) => l.id)) + 1;
};

// Initiate App and Bring in Middleware
const app = express();
app.use(express.json());
app.use(morgan(morganFormat));
app.use(cors());
app.use(express.static("build"));

// Initial Data
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

// Routes
app.get("/api/info", (request, response) => {
  // Get Info
  const date = new Date();
  const numberOfListings = directory.length;
  const text =
    `<p>Directory has ${numberOfListings} listings</p>` + `<p>${date}</p>`;
  response.send(text);
});

app.get("/api/directory", (request, response) => {
  // Get All
  response.json(directory);
});

app.get("/api/directory/:id", (request, response) => {
  // Get Specific Listing
  const id = Number(request.params.id);
  const listing = directory.find((listing) => listing.id === id);
  response.json(listing);
});

app.delete("/api/directory/:id", (request, response) => {
  // Delete Specific Lisiting
  const id = Number(request.params.id);
  directory = directory.filter((listing) => listing.id !== id);
  response.status(204).end();
});

app.post("/api/directory", (request, response) => {
  // Add Listing
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
  // If everything is good create new Listing and push to database
  const newListing = { ...listingObject, id: generateId() };
  directory.push(newListing);
  response.json(newListing);
});

// Add post-route middleware:
app.use(unknownEndpoint);

// Start App
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
