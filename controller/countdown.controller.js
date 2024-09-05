const Cond = require("../models").countdown;

module.exports.add = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const { countdown_start, countdownDuration, completed } = req.body;

    // Check for valid data
    if (!countdown_start || !countdownDuration) {
      return res.status(400).json({ message: "Invalid request data." });
    }

    // Update or set the countdown in the database
    const countdown = await Cond.create({
      user_id: userId,
      countdown_start,
      countdownDuration,
      completed,
    });
    console.log("countdown", countdown);

    res.status(200).json({ message: "Countdown updated successfully." });
  } catch (error) {
    console.error("Error updating countdown data:", error);
    res.status(500).json({ message: "Error updating countdown data." });
  }
};

module.exports.get = async (req, res) => {
  try {
    const userId = req.user.id;
    const countdown = await Cond.findAll({
      where: { user_id: userId }, // Filter by user_id
      order: [["createdAt", "DESC"]],
    });
    const { countdown_start, countdownDuration } = results[0];
    const startTime = new Date(countdown_start);
    const elapsed = (now - startTime) / 1000; // seconds
    const remaining = countdownDuration - elapsed;
    if (remaining > 0) {
      res.json({ remaining });
    } else {
      res.json({ remaining: 0, completed: true });
    }
    // return res.status(200).json(countdown);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving countdown data." });
  }
};
