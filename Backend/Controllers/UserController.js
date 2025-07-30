const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserRegisters = async (req, res) => {
  try {
    console.log("body", req.body);

    const ExitUser = await User.findOne({ email: req.body.email });
    console.log("efef", ExitUser);
    if (!ExitUser) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const newUser = new User({
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: "Successfully created" });
    } else {
      res.status(401).json({ message: "Faild ! to created/user Exit " });
    }
  } catch (error) {
    res.status(401).json({ message: "Faild ! to created " });
  }
};

const UserLogin = async (req, res) => {
  try {
    console.log(req.body);
    const GetUser = await User.findOne({ email: req.body.email });
    const Email = req.body.email;
    const password = req.body.password;
    const match = await bcrypt.compare(password, GetUser.password);

    if (match) {
      try {
        const token = jwt.sign(
          {
            email: GetUser.email,
            username: GetUser.username,
            role: GetUser.role,
          },

          process.env.TOKEN_SECRET_KEY
        );
        console.log("TOken", token);
        // ✅ Set token in HTTP-only cookie
         
        // console.log("cookie", res.cookie);
        res.status(200).json({ message: "Login Successfully ", token: token });
      } catch (error) {
        res.status(401).json({ message: "Faild ! to Login " });
      }
    } else {
      res.status(401).json({ message: "Username/password are incorrect" });
    }
  } catch (error) {
    res.status(401).json({ message: "Faild ! to Login " });
  }
};
const IsCheck_UserISAdmin = (req, res) => {
  console.log(req.headers.authorization)
  const token = req.headers?.authorization.split(" ")[1]
  // const { token } = req.cookies;
  // console.log("token",token)
  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    //  console.log("decode" , decode)
    if (decode) {
      if (decode.role === "ADMIN") {
        res.status(200).json({ success: true, message: "Your Admin" });
      }
    }
  } catch (error) {
    res.status(401).json({ success: false });
  }
};
module.exports = { UserRegisters, UserLogin, IsCheck_UserISAdmin };
