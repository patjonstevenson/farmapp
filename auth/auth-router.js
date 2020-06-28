const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./auth-model");
const secret = require("../database/secrets");

const { validateUser } = require('./auth-helpers');

router.post("/register", async (req, res) => {
  const user = req.body;

  try {
    const { isSuccessful, errors } = await validateUser(user);

    if (isSuccessful) {
      const hash = bcrypt.hashSync(user.password, 12);
      user.password = hash;

      const userN = await Users.add(user);
      const { password, ...new_user } = userN;
      const token = getJwtToken(userN.email, userN.password);
      return res.status(200).json({ user: new_user, token })
    } else {
      return res.status(400).json({ errors });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve new user.', error });
  }


})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await Users.findBy({ email });
    const { id, first_name, last_name } = user;
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = getJwtToken(user.email, user.password);
      return res.status(200).json({ user: { id, first_name, last_name }, token });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(`\nERROR logging in:\n${error}\n`);
    return res.status(500).json({ message: 'error logging user in!' });
  }
});



function getJwtToken(email, password) {
  const payload = {
    email,
    password
  };

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}
module.exports = router;
