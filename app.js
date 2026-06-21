const express = require("express");
const app = express();
const env = require("dotenv");
const { connectToDatabase } = require("./database/database");
const { registerUser, loginUser } = require("./controller/auth/authController");
const authRoute= require("./routes/authRoute");
const productRoute = require("./routes/productRoute");

//tell node to use dotenv
env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//telling nodejs to give access to uploads folder

app.use(express.static('uploads'))
//Database connection
connectToDatabase();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is home page",
  });
});

app.use('/api',authRoute)
app.use('/api',productRoute)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
