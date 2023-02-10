const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Vammavg@78"

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "User not found! Signup Please." });
  }
  const isCorrectPassword = bcrypt.compareSync(password, existingUser.password)
  if(!isCorrectPassword){
    return res
      .status(401)
      .json({ message: "Email or Password is incorrect." });
  }
  const token = jwt.sign({id:existingUser._id}, SECRET_KEY, {
    expiresIn: "1hr"
  })

  return res.status(200).json({ message: "Successfully Logged In", user:existingUser, token });
};

exports.signup = signup;
exports.login = login;
