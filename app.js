const express = require("express");
const app = express();
const env = require("dotenv");
const { connectToDatabase } = require("./database/database");
const { registerUser, loginUser } = require("./controller/auth/authController");
const authRoute= require("./routes/auth/authRoute");
const productRoute = require("./routes/admin/productRoute");
const adminUserRoute = require("./routes/admin/adminUsersRoute");
const userReviewRoute = require("./routes/user/userReviewRoute");
const profileRoute = require("./routes/user/profileRoute");
const cartRoute = require("./routes/user/cartRoute");
const orderRoute = require("./routes/user/orderRoute");

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

app.use('/api/auth',authRoute)
app.use('/api/products',productRoute)
app.use('/api/admin',adminUserRoute)
app.use('/api/reviews',userReviewRoute)
app.use('/api/profile',profileRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
