const mongoose = require("mongoose");
const Listing = require("../Models/listing.js");
const initdata = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/THEAIR";

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
}); 
async function main(){
    await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data.map((obj) => {
        obj.owner = "65a316132293212121212121";
    })
    await Listing.insertMany(initdata.data);
    console.log("Data initialized");
}

initDB();
