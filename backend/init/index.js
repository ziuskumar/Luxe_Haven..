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
    initdata.data.map((obj, i) => {
        obj.owner = "65a316132293212121212121";
        
        const title = obj.title.toLowerCase();
        const desc = (obj.description || "").toLowerCase();
        if (title.includes("beach") || title.includes("ocean") || desc.includes("beach") || desc.includes("ocean")) {
            obj.category = "Beaches";
        } else if (title.includes("mountain") || title.includes("retreat") || title.includes("alps") || desc.includes("mountain")) {
            obj.category = "Mountains";
        } else if (title.includes("ski") || title.includes("winter") || title.includes("chalet")) {
            obj.category = "Winter";
        } else if (title.includes("pool") || title.includes("villa") || desc.includes("pool") || desc.includes("villa")) {
            obj.category = "Pool";
        } else if (title.includes("cabin") || title.includes("treehouse") || title.includes("camp") || title.includes("lake") || desc.includes("lake") || desc.includes("camping")) {
            obj.category = "Camping";
        } else if (title.includes("loft") || title.includes("apartment") || title.includes("penthouse") || title.includes("room")) {
            obj.category = "Rooms";
        } else if (title.includes("city") || title.includes("castle") || title.includes("canal") || title.includes("historic") || desc.includes("city") || desc.includes("canal")) {
            obj.category = "Iconic City";
        } else if (title.includes("cottage") || title.includes("house") || title.includes("brownstone")) {
            obj.category = "House";
        } else {
            const extra = ["Yacht", "Private Plane", "Farm House"];
            obj.category = extra[i % extra.length];
        }
    });
    await Listing.insertMany(initdata.data);
    console.log("Data initialized");
}

initDB();
