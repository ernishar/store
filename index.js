const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/sequelize");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cookieParser = require("cookie-parser");


const app = express();
// Configuring dotenv
dotenv.config();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files
app.use("/assets", express.static(__dirname + "/public/assets"));

// Cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// All Routes
app.use("/api/", userRoutes, categoryRoutes, productRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello To Store API");
});

// Server
const PORT = process.env.PORT;

// Syncing the database
sequelize;

// Listening to the server
app.listen(PORT, () => {
  console.log(`Store Server is running on http://localhost:${PORT}`);
});
