require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.use(cookieParser());

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const errorHandler = require("./middlewares/errorHandler");

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use("/", userRoutes);

app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
