const mongoose = require("mongoose");

const InvoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }
});

const InvoiceSchema = new mongoose.Schema({
  customerId: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "pending" }, // pending / paid / cancelled
  items: { type: [InvoiceItemSchema], default: [] },
  currency: { type: String, default: "USD" }
});

module.exports = mongoose.model("Invoice", InvoiceSchema);