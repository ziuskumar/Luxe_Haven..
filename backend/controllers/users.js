const User = require("../Models/user.js");

function authenticateWithPassword(username, password) {
  return new Promise((resolve, reject) => {
    User.authenticate()(username, password, (err, user, authError) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ user, authError });
    });
  });
}

function storeSessionUser(req, user) {
  req.session.user = {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
  };
}

module.exports = {
  renderSignup(req, res) {
    res.render("users/signup.ejs");
  },

  async signup(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      req.flash("error", "Username, email, and password are required.");
      return res.redirect("/signup");
    }

    try {
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      storeSessionUser(req, registeredUser);
      req.flash("success", "Account created successfully.");
      res.redirect("/listings");
    } catch (err) {
      req.flash("error", err.message || "Unable to create account.");
      res.redirect("/signup");
    }
  },

  renderLogin(req, res) {
    res.render("users/login.ejs");
  },

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      req.flash("error", "Username and password are required.");
      return res.redirect("/login");
    }

    const { user, authError } = await authenticateWithPassword(username, password);

    if (!user) {
      req.flash("error", authError?.message || "Invalid username or password.");
      return res.redirect("/login");
    }

    storeSessionUser(req, user);
    req.flash("success", `Welcome back, ${user.username}!`);
    res.redirect("/listings");
  },

  logout(req, res) {
    req.session.user = null;
    req.flash("success", "You are logged out.");
    res.redirect("/listings");
  },
};
