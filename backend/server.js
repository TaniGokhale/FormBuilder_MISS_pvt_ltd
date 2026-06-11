const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

const connectDB = require("./config/db");
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const seedData = require("./utils/seed");
seedData();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dynamic Form Builder API Running");
});

// Routes
app.use("/api/forms", formRoutes);

app.use("/api/responses", responseRoutes);
app.use("/api/analytics", analyticsRoutes);
// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});