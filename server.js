require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Invoice = require("./models/Invoice");

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Flexible POST endpoint for customer invoices
app.post("/api/invoices", async (req, res) => {
  try {
    let { customerId, filters, options } = req.body;

    if (!customerId) return res.status(400).json({ error: "customerId is required" });

    // Convert customerId to number
    customerId = Number(customerId);

    // Build query dynamically
    let query = { customerId };

    if (filters) {
      if (filters.status) query.status = filters.status;
      if (filters.dateFrom || filters.dateTo) {
        query.date = {};
        if (filters.dateFrom) query.date.$gte = new Date(filters.dateFrom);
        if (filters.dateTo) query.date.$lte = new Date(filters.dateTo);
      }
      if (filters.currency) query.currency = filters.currency;
    }

    let invoices = await Invoice.find(query).lean();

    // Apply options
    if (options) {
      if (!options.includeItems) {
        invoices = invoices.map(({ items, ...rest }) => rest);
      }
      if (options.currency) {
        // Optional: convert currency if needed (placeholder)
        invoices = invoices.map(inv => ({ ...inv, currency: options.currency }));
      }
    }

    res.json({ customerId, invoices });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET endpoint (optional filters via query parameters)
app.get("/api/invoices/:customerId", async (req, res) => {
  try {
    const customerId = Number(req.params.customerId);
    const { status, dateFrom, dateTo, currency } = req.query;

    let query = { customerId };
    if (status) query.status = status;
    if (currency) query.currency = currency;
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateTo) query.date.$lte = new Date(dateTo);
    }

    const invoices = await Invoice.find(query).lean();
    res.json({ customerId, invoices });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});