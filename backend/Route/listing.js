const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });
const listingController = require("../controllers/listings.js");

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new ExpressError(400, errorMessages);
  } else {
    next();
  }
};

router
  .route("/")
  // INDEX ROUTE
  .get(wrapAsync(listingController.index))
  // CREATE ROUTE
  .post(
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing),
  );
// .post(upload.single("listing[image]"), (req,res) => {
//   res.send(req.file);
// });

// NEW ROUTE - must come before /:id
router.get("/new", wrapAsync(listingController.rendernewform));

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(wrapAsync(listingController.deleteListing));

// Edit Route
router.get("/:id/edit", wrapAsync(listingController.renderEditForm));

module.exports = router;
