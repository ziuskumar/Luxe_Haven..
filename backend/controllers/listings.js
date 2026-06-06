const Listing = require("../Models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

const DEFAULT_IMAGE = {
  url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
  filename: "default-listing-image",
};

module.exports = {
  async index(req, res) {
    const query = (req.query.q || "").trim();
    const category = (req.query.category || "").trim();
    let filter = {};

    if (query) {
      const regex = new RegExp(query, "i");
      filter = {
        $or: [
          { title: regex },
          { description: regex },
          { location: regex },
          { country: regex },
        ],
      };
    } else if (category) {
      filter = { category: category };
    }

    const allListing = await Listing.find(filter);
    res.render("listings/index.ejs", { allListing, query, activeCategory: category });
  },

  async rendernewform(req, res) {
    res.render("listings/new.ejs");
  },

  async showListing(req, res) {
    let { id } = req.params;
    if (id) id = id.trim();
    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }

    res.render("listings/show.ejs", { listing });
  },

  async createListing(req, res) {
    const newListing = new Listing(req.body.listing);

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    } else {
      newListing.image = DEFAULT_IMAGE;
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  },

  async renderEditForm(req, res) {
    let { id } = req.params;
    if (id) id = id.trim();
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    if (listing.image && listing.image.url) {
      listing.image.url = listing.image.url.replace(
        "/upload",
        "/upload/w_250,h_250",
      );
    }

    res.render("listings/edit.ejs", { listing });
  },

  async updateListing(req, res) {
    let { id } = req.params;
    if (id) id = id.trim();
    const listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true },
    );

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
      await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  },

  async deleteListing(req, res) {
    let { id } = req.params;
    if (id) id = id.trim();
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  },
};
