require("dotenv").config();
const mongoose = require("mongoose");
const Invoice = require("./models/Invoice");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.error("MongoDB connection error:", err));

const invoices = [
  {
    customerId: 123,
    date: new Date("2025-01-05"),
    status: "paid",
    currency: "USD",
    items: [
      { description: "Product A", quantity: 2, price: 50 },
      { description: "Product B", quantity: 1, price: 30 }
    ]
  },
  {
    customerId: 123,
    date: new Date("2025-01-20"),
    status: "pending",
    currency: "USD",
    items: [
      { description: "Product C", quantity: 3, price: 20 }
    ]
  },
  {
    customerId: 456,
    date: new Date("2025-01-15"),
    status: "paid",
    currency: "EUR",
    items: [
      { description: "Service X", quantity: 1, price: 100 }
    ]
  }
];

async function dataImport() {
  try {
    await Invoice.deleteMany({});
    await Invoice.insertMany(invoices);
    console.log("Invoices imported successfully");
  } catch (err) {
    console.error("Error importing invoices:", err);
  } finally {
    mongoose.connection.close();
  }
}

dataImport();