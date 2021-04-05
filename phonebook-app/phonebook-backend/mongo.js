import mongoose from "mongoose";

if (
  process.argv.length < 3 ||
  process.argv.length === 4 ||
  process.argv.length > 5
) {
  console.log("Invalid command | node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fso:${password}@cluster0.hqq2o.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(url, mongooseConfig);

const listingSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Listing = mongoose.model("Listing", listingSchema);

// Get all listings in DB
if (process.argv.length === 3) {
  Listing.find({}).then((result) => {
    result.forEach((listing) => {
      console.log(listing);
    });
    mongoose.connection.close();
  });
}

// Add new listing to DB
if (process.argv.length === 5) {
  const newListing = new Listing({
    name: process.argv[3],
    number: process.argv[4],
  });
  newListing.save().then((result) => {
    console.log(`Added ${newListing.name} #${newListing.number} to directory`);
    mongoose.connection.close();
  });
}
