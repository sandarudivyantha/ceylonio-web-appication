const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const adminRoutes = require("./routes/admin.routes");
const foodRoutes = require("./routes/food.routes")
const PORT = process.env.PORT || 4001;
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const mongoURI = process.env.mongoURI;

// Establish MongoDB connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection is successful ✔");

    // Start the server only after successful MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} ✔`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  });

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api/foods", foodRoutes);

app.get("/", (req, res) => {
  res.send("The Backend is started and running");
});
