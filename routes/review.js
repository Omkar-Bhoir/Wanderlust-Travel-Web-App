const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/reviews.js");


// Post Review Route
router.post(
    "/", 
    isLoggedIn,
    validateReview, 
    wrapAsync (reviewController.createReview)
);

// Delete Review Route
router.delete(
"/:reviewId", 
isLoggedIn,
isReviewAuthor,
wrapAsync(reviewController.destroyReview));

module.exports = router;





// Post Review Route
// router.post(
//     "/", 
//     validateReview, 
//     wrapAsync(async (req, res, next) => {
//         let listing = await Listing.findById(req.params.id);
//         if (!listing) {
//             req.flash("error", "Listing not found!");
//             return res.redirect("/listings"); // ✅ Ensure return is used
//         }

//         let newReview = new Review(req.body.review);
//         listing.reviews.push(newReview);

//         await newReview.save();
//         await listing.save();
//         req.flash("success", "New Review Created!");
//         res.redirect(`/listings/${listing._id}`);
//     })
// );


// Delete Review Route
// router.delete("/:reviewId", wrapAsync(async (req, res) => {
//     let { id, reviewId } = req.params;

//     let listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", "Listing not found!");
//         return res.redirect("/listings");
//     }

//     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);

//     req.flash("success", "Review Deleted!");
//     res.redirect(`/listings/${id}`);
// }));