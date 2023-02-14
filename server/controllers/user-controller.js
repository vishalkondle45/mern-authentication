const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Vammavg@78";

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
    return res.status(404).json({ message: "User not found! Signup Please." });
  }
  const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);
  if (!isCorrectPassword) {
    return res.status(401).json({ message: "Email or Password is incorrect." });
  }

  const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, {
    expiresIn: "35s",
  });

  console.log("Generated Token \n ", token);

  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    sameSite: "lax",
    httpOnly: true,
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

const verifyToken = async (req, res, next) => {
  // const headers = req.headers["authorization"];
  // const token = headers.split(" ")[1];

  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];

  if (!token) {
    return res.status(404).json({ message: "Token not found!" });
  }
  jwt.verify(String(token), SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  return res.status(200).json({ user });
};

const refreshToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];

  if (!prevToken) {
    return res.status(404).json({ message: "Token not found!" });
  }
  jwt.verify(String(prevToken), SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: "35s",
    });

    console.log("ReGenerated Token \n ", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      sameSite: "lax",
      httpOnly: true,
    });
    req.id = user.id;
    next();
  });
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
