const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const usersController = require("../controllers/users.js");

router.get("/signup", usersController.renderSignup);
router.post("/signup", wrapAsync(usersController.signup));

router.get("/login", usersController.renderLogin);
router.post("/login", wrapAsync(usersController.login));
router.get("/logout", usersController.logout);
router.get("/privacy", (req, res) => {
  res.send(`
    <h1>TheAIR Privacy Policy</h1>
    <p>This demo app stores account, listing, and review data to support core site features.</p>
    <p>Uploaded images are stored using Cloudinary. Sessions are used to keep you logged in.</p>
    <p><a href="/listings">Back to Listings</a></p>
  `);
});
router.get("/terms", (req, res) => {
  res.send(`
    <h1>TheAIR Terms</h1>
    <p>This is a learning project. Please use respectful content when creating listings and reviews.</p>
    <p>Accounts created here are for demo use only and can be removed at any time.</p>
    <p><a href="/listings">Back to Listings</a></p>
  `);
});

module.exports = router;
