const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const medicineRoutes = require("./routes/medicineRoutes");
const participantRoutes = require("./routes/participantRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const serverCheck = require("./config/server");

dotenv.config();

const app = express();

// Try to connect to MongoDB, but don't fail if it's not available
connectDB().catch(err => {
  console.log("MongoDB not available - running in demo mode");
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/medicines", medicineRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/shipments", shipmentRoutes);

app.get("/", (req, res) => {
  res.send("Supply Chain Management API Running...");
});

serverCheck();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));