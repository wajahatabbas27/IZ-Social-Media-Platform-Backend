// Jwt to check the token
// config to get the secret
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  // Getting token from the request header
  const token = req.header("iz-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ msg: "Authorization denied, Token is missing" });

  try {
    //==========================================================================================
    // Verifying token using the jwt secret
    // jwt.verify se token validate krrhe hain signature pass krke
    // jwt.verify payload return krta hai hmein jspe hmne ise bnaya tha payload use krte we
    //==========================================================================================
    const payload = jwt.verify(token, config.get("jwtSecret"));
    // console.log("Payload :",payload );

    // Payload milgya hai hmein aur paylaod hmne bnaya tha user.id se ab hm req.user mein add krdeinge payload ka user aur uske auth api mein access krleinge hm findById ke liye
    req.user = payload.user;

    // shift krdega jahan use horha hoga middlewear hmare pass
    next();
  } catch (err) {
    console.log("Error ==>> ", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
