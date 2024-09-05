const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { users: User } = require("../models");

const generateReferralCodeuser = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let referralCodeuser = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referralCodeuser += characters[randomIndex];
  }
  return referralCodeuser;
};

const register = async (req, res) => {
  try {
    const about = "nothing";
    const { email, password, refcodtarget } = req.body;
    const fullname = email.split("@")[0];
    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Generate a unique referral code
    let refcoduser;
    let referralExists = true;
    while (referralExists) {
      refcoduser = generateReferralCodeuser();
      const existingUser = await User.findOne({ where: { refcoduser } });
      if (!existingUser) {
        referralExists = false;
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      refcoduser,
      refcodtarget,
      about,
      fullname,
    });

    // Generate a JWT token
    const accessToken = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered", user: newUser, accessToken });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error: error.message || error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log(`Attempting to log in with email: ${email}`);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Password matched, generating token");

    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

// Get all users (requires admin auth)
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    // The user ID is retrieved from the token via the middleware
    const userId = req.user.id;

    // Find the user by the ID extracted from the token
    const user = await User.findByPk(userId, {
      attributes: ["id", "email", "refcoduser", "fullname", "about"], // Add other fields as needed
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Current password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { fullname, about } = req.body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.fullname = fullname;
    user.about = about;
    await user.save();
    res.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getProfile,
  updatePassword,
  updateProfile,
};
