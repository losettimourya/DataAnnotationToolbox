const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ImageUrlSchema = new Schema(
  /**
   * Mongoose model for representing image URLs in the MongoDB database.
   *
   * @module ImageUrl
   * @typedef {Object} ImageUrl
   * @property {string} image_id - The ID associated with the image.
   * @property {string} url - The URL of the image.
   * @property {Date} createdAt - The timestamp indicating when the image URL was created.
   * @property {Date} updatedAt - The timestamp indicating when the image URL was last updated.
   */

  {
    image_id: String,
    url: String,
  },
  { timestamps: true }
);

let ImageUrl = mongoose.model("ImageUrl", ImageUrlSchema);

module.exports = ImageUrl;

// https://localhost::3031/posts/newimg
