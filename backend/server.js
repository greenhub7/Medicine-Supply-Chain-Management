const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import Routes
const medicineRoutes = require("./routes/medicineRoutes");
const participantRoutes = require("./routes/participantRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/shipments", shipmentRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Supply Chain Management API Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));