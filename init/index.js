const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()                          //Connection of database(mongodb)
  .then(() => {
    console.log("Connect to DataBase..");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Listing.deleteMany({});   //Delete data if allready exist
    initData.data = initData.data.map((obj) => ({...obj, owner: "65d45749dad81791b5b1d5c5"}));
    await Listing.insertMany(initData.data);  //Insert all data present in data.js file////
    console.log("Data was initializad");
}

initDB();