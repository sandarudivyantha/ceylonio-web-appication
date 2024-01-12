import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const PORT = 4000
const app = express();

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
// Establish MongoDB connection
await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connection is successful ✔");
    })
    .catch((err) => {
        console.error("MongoDB connection failed ❌", err);
    });

app.get("/", (req, res) => {
    res.send("The Backend is start and running");
})

app.listen(PORT, () => {
    console.log('server is running on http://localhost:4000 ✔');
})