// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize express app
const app = express();
const PORT = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/lostandfound", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB", err));

// Define schema for storing found item data
const foundItemSchema = new mongoose.Schema({
  itemName: String,
  location: String,
  details: String,
  itemImage: String,
  contact: String
});

// Create a model for found items
const FoundItem = mongoose.model("FoundItem", foundItemSchema);

// Define schema for storing lost item data
const lostItemSchema = new mongoose.Schema({
  yourName: String,
  itemName: String,
  details: String,
  itemImage: String,
  contact: String
});

// Create a model for lost items
const LostItem = mongoose.model("LostItem", lostItemSchema);

// Setup file upload for images (multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.originalUrl.includes("lost")) {
      cb(null, "public/lostuploads/"); // Lost item images folder
    } else {
      cb(null, "public/founduploads/"); // Found item images folder
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage: storage });

// Routes for lost item reporting
app.get("/lostitem", (req, res) => {
  res.sendFile(path.join(__dirname, "lostitem", "report.html"));
});

// Routes for found item reporting
app.get("/found", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "found.html"));
});

// Handle lost item form submission
app.post("/submit-lost", upload.single("item-image"), async (req, res) => {
  try {
    const { yourName, itemName, details, contact } = req.body;
    const itemImage = req.file ? req.file.filename : null; // If image uploaded

    const newLostItem = new LostItem({ yourName, itemName, details, itemImage, contact });
    await newLostItem.save();

    console.log("Lost item saved:", newLostItem);
    res.redirect("/homepage.html"); // Redirect to homepage after submission
  } catch (err) {
    console.error("Error saving lost item:", err);
    res.status(500).send("Failed to save lost item data");
  }
});

// Handle found item form submission
app.post("/submit-found", upload.single("item-image"), async (req, res) => {
  try {
    const { itemName, location, details, contact } = req.body;
    const itemImage = req.file ? req.file.filename : null; // If image uploaded

    const newFoundItem = new FoundItem({ itemName, location, details, itemImage, contact });
    await newFoundItem.save();

    console.log("Found item saved:", newFoundItem);
    res.redirect("/homepage.html"); // Redirect to homepage after submission
  } catch (err) {
    console.error("Error saving found item:", err);
    res.status(500).send("Failed to save found item data");
  }
});

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "homepage.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
