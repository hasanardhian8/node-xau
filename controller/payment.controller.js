const Pay = require("../models").pay;

module.exports.add = async (req, res) => {
  const userId = req.user.id;
  const { name, usd, xau, total, status } = req.body;
  try {
    const payment = await Pay.create({
      user_id: userId,
      name,
      usd,
      xau,
      total,
      status,
    });
    return res.status(201).send(payment); // Use 201 for resource creation
  } catch (error) {
    console.error("Error during payment creation:", error); // Log the error for debugging
    return res.status(500).send("Failed to create payment"); // Changed status code to 500
  }
};
module.exports.get = async (req, res) => {
  const userId = req.user.id;
  try {
    // Fetch the most recent payment record
    const latestPayment = await Pay.findOne({
      where: { user_id: userId }, // Filter by user_id
      order: [["createdAt", "DESC"]],
    });

    if (!latestPayment) {
      return res.status(404).send("No payments found"); // Handle case where no payments exist
    }

    return res.status(200).send(latestPayment); // Send the latest payment data
  } catch (error) {
    console.error("Error during payment retrieval:", error); // Log the error for debugging
    return res.status(500).send("Failed to retrieve payment"); // Changed status code to 500
  }
};

module.exports.getAll = async (req, res) => {
  const userId = req.user.id;
  try {
    // Attempt to retrieve all payments from the database
    const payments = await Pay.findAll({
      where: { user_id: userId }, // Filter by user_id
      order: [["createdAt", "DESC"]],
    });

    // Check if payments were found
    if (!payments) {
      return res.status(404).send("No payments found");
    }

    // Send the retrieved payments with a 200 OK status
    return res.status(200).json(payments);
  } catch (error) {
    // Log the error with a detailed message
    console.error("Error during payment retrieval:", error.message);

    // Handle different types of errors
    if (error.name === "SequelizeDatabaseError") {
      // Handle database errors specifically
      return res.status(500).send("Database error occurred while retrieving payments");
    } else if (error.name === "SequelizeConnectionError") {
      // Handle connection errors specifically
      return res.status(500).send("Database connection error occurred while retrieving payments");
    } else {
      // Handle other unexpected errors
      return res.status(500).send("Failed to retrieve payments");
    }
  }
};
