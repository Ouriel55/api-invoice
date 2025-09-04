const axios = require("axios");

const apiUrl = "http://localhost:3000/api/invoices";

async function testAPI() {
  try {
    //Test  customerId
    let response = await axios.post(apiUrl, {
      customerId: 123
    });
    console.log("Test  customerId");
    console.log(response.data);

    //Test with filters
    response = await axios.post(apiUrl, {
      customerId: 123,
      filters: {
        status: "paid",
        dateFrom: "2025-01-01",
        dateTo: "2025-01-31"
      }
    });
    console.log("\nTest  with filters:");
    console.log(response.data);

    //Test with options (exclude items)
    response = await axios.post(apiUrl, {
      customerId: 123,
      options: {
        includeItems: false
      }
    });
    console.log("\nTest with Options exclude items:");
    console.log(response.data);

    //Test with filters + options
    response = await axios.post(apiUrl, {
      customerId: 123,
      filters: {
        status: "pending"
      },
      options: {
        includeItems: true,
        currency: "EUR"
      }
    });
    console.log("\nTest with filters + options:");
    console.log(response.data);

  } catch (err) {
    console.error("Error API:", err.response ? err.response.data : err.message);
  }
}

testAPI();