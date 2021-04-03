import dotenv from "dotenv";
dotenv.config();
import express, { request, response } from "express";
import morgan from "morgan";
import cors from "cors";
import Listing from "./models/listing.js";

// Middleware Functions
morgan.token("body", (req) => JSON.stringify(req.body));
const morganFormat = ":method :url :status :res[content-length] :response-time ms :body";

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  switch (error.name) {
    case "CastError":
      return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

// Initiate App and Bring in Middleware
const app = express();
app.use(express.json());
app.use(morgan(morganFormat));
app.use(cors());
app.use(express.static("build"));

// Routes

// Get Info
app.get("/api/info", async (req, res, next) => {
  try {
    const directory = await Listing.find({});
    const date = new Date();
    const numberOfListings = directory.length;
    const text = `<p>Directory has ${numberOfListings} listings</p>` + `<p>${date}</p>`;
    res.send(text);
  } catch (err) {
    next(err);
  }
});

// Get All Listings
app.get("/api/directory", async (req, res, next) => {
  try {
    const directory = await Listing.find({});
    res.json(directory);
  } catch (err) {
    next(err);
  }
});

// Get Specific Listing
app.get("/api/directory/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (listing) {
      res.json(listing);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

// Delete Specific Lisiting
app.delete("/api/directory/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Add Listing
app.post("/api/directory", async (req, res, next) => {
  const body = req.body;
  // Check if request has minimum content
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  // If everything is good create new Listing and push to database
  try {
    const listing = await new Listing({
      name: body.name,
      number: body.number,
    }).save();
    res.json(listing);
  } catch (err) {
    next(err);
  }
});

// Add post-route middleware:
app.use(unknownEndpoint);
app.use(errorHandler);

// Start App
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
