const User = require("../../../model/userModel");

exports.getUsers = async (req, res) => {
  const userId = req.user.id;
  const users = await User.find({ _id: { $ne: userId } }).select([
    "+otp",
    "+isOtpVerified",
  ]);
  if (users.length > 1) {
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } else {
    res.status(400).json({
      message: "No users found !!",
      data: [],
    });
  }
};



exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      message: "Provide provide user id",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      message: "user not found with that userId",
    });
  }
  await User.findByIdAndDelete(userId);
  res.status(200).json({
    message: "User deleted successfullY!!",
  });
};
