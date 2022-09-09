const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const User = require("../models/user"); //model

//=====================================================
// @route POST /api/auth
// @desc Authorize user
// @access Public
// Email checking in database
// Encrypted password comparison using bcrypt.compare
// Returning JWT
//=====================================================
router.post(
  "/",
  [
    check("email", "Please Enter valid Email").isEmail(),
    check("password", "Please Enter Password").not().isEmpty(),
  ],
  async (req, res) => {
    // Handling the Errors in the middleware and returning
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    // Getting the data from body
    const { email, password } = req.body;

    try {
      // checking user in database
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "User with this Email donot Exist!" });

      // Compare Passwords
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched)
        return res.status(400).json({ msg: "Incorrect Password" });

      // Returning jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Creating jwt using payload
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log("Error ==>> ", err.message);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
);

//=====================================================
// @route GET /api/auth
// @desc GET User Data
// @access Private
//=====================================================
router.get("/", (req, res) => {
  res.status(200).json({ msg: "User Data for Login authorizer" });
});

module.exports = router;
