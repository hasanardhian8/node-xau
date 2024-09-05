const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();

const db = require("./models");
const corsOptions = {
  origin: ["http://88.223.92.196:5173"], // Replace with your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // If you need to allow cookies or authentication
};

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded payloads
app.use(cookieParser()); // Parses cookies
app.use(helmet()); // Secures the app by setting various HTTP headers
// enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use("/api/", require("./routers/user.router"));
app.use("/api/payment", require("./routers/payment.route"));
app.use("/api/reward", require("./routers/rewardcoin.route"));
app.use("/api/countdown", require("./routers/countdowns"));

// Sync DB and Start Server
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(process.env.PORT || 3001, () => {
  console.log(`Running on port ${process.env.PORT || 3001}`);
});
