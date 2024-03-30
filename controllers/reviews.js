const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.postReview = async (req, res) => {
  console.log(req.params.id); //not come :id from the perant route (app.js) So we use {meargeParams : true} in Router() body....
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  // console.log(newReview);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");

  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res, next) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //reviews array (presnt in listing.js) me se reviewId ko $pull means remove kar do
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");

    res.redirect(`/listings/${id}`);
  };