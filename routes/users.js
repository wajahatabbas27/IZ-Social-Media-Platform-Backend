const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // token send krne ke liye session jese create hoga
const { check, validationResult } = require("express-validator"); // to validate the data that is coming as the input
const User = require("../models/user"); // model for the user to save inside database.
const bcrypt = require("bcrypt"); // to hash password
const config = require("config");

//=========================================================================
// User data coming from frontend for signup
// Apply Validations in middleware by using the express-validator
// Save Encrypted Password in Database by using bcrypt
// Return Jwt as response when this API hits
//=========================================================================
// @route POST  /api/users
// @desc Add new User
// @access Public  -- as it is signup
//=========================================================================
router.post(
  "/",
  [
    check("name", "Please Enter a Name").isLength({ min: 3 }),
    check("email", "Please enter a Valid Email").isEmail(),
    check(
      "password",
      "Enter Password between 5-20 caracters and enter strong password"
    ).isLength({
      min: 6,
      max: 20,
    }),
  ],
  async (req, res) => {
    // Checking ke error to nhi ae hmare pass middleware se
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    // Getting the name,email,password from the body of request
    // Creating a user in the model of User that we get
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password,
    });

    // Hashing Password using bcrypt
    // Salt is the number of rounds it will be encoded and encrypted
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
      // check if user already exists
      const checkUser = await User.findOne({ email }).select({ password: 0 });
      if (checkUser) return res.status(400).json({ msg: "User Alraedy exists" });

      // Add user inside Database
      await user.save();

      // Return jwt as response
      // jwt requires payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Requires the payload and the key that is signature amd other options for jwt
      // And Opening a callback right after it all the way
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        // Creating the callback function right after it.
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.log("Error ==>> ", error.message);
      res.status(400).json({
        msg: "Server Error",
      });
    }
  }
);

module.exports = router;
