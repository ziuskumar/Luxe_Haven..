const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../Models/listing.js");
const Review = require("../Models/review.js");
// const { reviewSchema } = require("../schema.js");

const reviewsController = require("../controllers/reviews.js");


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message).join(", ");
        throw new ExpressError(400, errorMessages);
    } else {
        next();
    }
};



// Post Reviews Route
router.post("/", validateReview, wrapAsync(reviewsController.postReview));

// Delete Review Route 
router.delete("/:reviewId", wrapAsync(reviewsController.deleteReview));

module.exports = router;
