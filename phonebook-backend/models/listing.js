import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const url = process.env.MONGODB_URI;

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

// Establish DB Connection
mongoose
  .connect(url, mongooseConfig)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
});

listingSchema.plugin(uniqueValidator);

listingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
