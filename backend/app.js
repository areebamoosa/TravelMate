require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});


const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

app.use(authRoutes)
app.use('/admin',adminRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});