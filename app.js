const express = require("express");
const app = express();
const env = require("dotenv");
const { connectToDatabase } = require("./database/database");
const { registerUser, loginUser } = require("./controller/auth/authController");
const authRoute= require("./routes/authRoute");
//tell node to use dotenv
env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database connection
connectToDatabase();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is home page",
  });
});

app.use('',authRoute)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
