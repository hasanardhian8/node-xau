const Reward = require("../models").reward;

module.exports.add = async (req, res) => {
  const user_id = req.user.id;
  const { coin, totalcoin } = req.body;
  try {
    const reward = await Reward.create({
      user_id: user_id,
      coin,
      totalcoin,
    });
    return res.status(201).send(reward); // Use 201 for resource creation
  } catch (error) {
    console.error("Error during reward creation:", error); // Log the error for debugging
    return res.status(500).send("Failed to create reward"); // Changed status code to 500
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const user_id = req.user.id;

    const rewards = await Reward.findAll({
      where: { user_id: user_id }, // Filter by user_id
      order: [["createdAt", "DESC"]],
    });
    if (rewards.length === 0) {
      return res.status(404).send("No rewards found");
    }
    return res.status(200).json(rewards);
  } catch (error) {
    console.error("Error retrieving rewards:", error.message);
    return res.status(500).send("An error occurred while retrieving rewards");
  }
};
module.exports.getLast = async (req, res) => {
  try {
    const user_id = req.user.id;

    const lastReward = await Reward.findOne({
      where: { user_id: user_id }, // Filter by user_id
      order: [["createdAt", "DESC"]],
    });

    if (lastReward) {
      res.status(200).json(lastReward); // Send the most recent reward record
    } else {
      res.status(200).json({ totalcoin: 0 }); // Send a valid response with zero value
    }
  } catch (error) {
    console.error("Error fetching the last reward:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
