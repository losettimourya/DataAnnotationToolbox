const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userAnnotationsSchema = new Schema(
  /**
   * Mongoose model for storing and managing user annotations on a specific image in the MongoDB database.
   *
   * @module UserAnnotations
   * @typedef {Object} UserAnnotations
   * @property {string} user_id - The ID of the user creating the annotations.
   * @property {string} image_id - The ID of the image associated with the annotations.
   * @property {Array} regions - The array of regions containing annotation details.
   * @property {string} regions[].id - The unique identifier associated with the region.
   * @property {boolean} regions[].isComplete - Indicates whether the annotation for the region is complete.
   * @property {boolean} regions[].is_editable - Indicates whether the annotation for the region is editable.
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
        id: String,
        isComplete: Boolean,
        is_editable: Boolean,
        color: String,
        points: [{ x: Number, y: Number }],
      },
    ],
  },
  { timestamps: true }
);

let UserAnnotations = mongoose.model("post", userAnnotationsSchema);

module.exports = UserAnnotations;
