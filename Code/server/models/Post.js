const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema(
  /**
   * Mongoose model for storing and managing user annotations on a specific image in the MongoDB database.
   *
   * @module Post
   * @typedef {Object} Post
   * @property {string} user_id - The ID of the user creating the annotations.
   * @property {string} image_id - The ID of the image associated with the annotations.
   * @property {Array} regions - The array of regions containing annotation details.
   * @property {number} regions[].id - The unique identifier associated with the region.
   * @property {boolean} regions[].isComplete - Indicates whether the annotation for the region is complete.
   * @property {Object} regions[].curr_point - The current point coordinates for the user interaction.
   * @property {number} regions[].curr_point.x - The x-coordinate of the current point.
   * @property {number} regions[].curr_point.y - The y-coordinate of the current point.
   * @property {string} regions[].color - The color associated with the region annotation.
   * @property {Array} regions[].points - The array of points representing the region shape.
   * @property {number} regions[].points[].x - The x-coordinate of a point in the region shape.
   * @property {number} regions[].points[].y - The y-coordinate of a point in the region shape.
   * @property {Date} createdAt - The timestamp indicating when the annotations were created.
   * @property {Date} updatedAt - The timestamp indicating when the annotations were last updated.
   */

  {
    user_id: String,
    image_id: String,
    regions: [
      {
        id: Number,
        isComplete: Boolean,
        curr_point: { x: Number, y: Number },
        color: String,
        points: [{ x: Number, y: Number }],
      },
    ],
  },
  { timestamps: true }
);

let Post = mongoose.model("post", postSchema);

module.exports = Post;
