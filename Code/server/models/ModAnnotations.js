const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ModAnnotationsSchema = new Schema(
  /**
   * Mongoose model for representing moderator annotations in the MongoDB database.
   *
   * @module ModAnnotations
   * @typedef {Object} ModAnnotations
   * @property {string} user_id - The ID of the moderator associated with the annotations.
   * @property {string} image_id - The ID associated with the image.
   * @property {Array} regions - The array of regions containing annotation details.
   * @property {string} regions[].id - The ID associated with the region.
   * @property {boolean} regions[].isComplete - Indicates whether the annotation for the region is complete.
   * @property {boolean} regions[].is_editable - Indicates whether the region annotation is editable.
   * @property {string} regions[].color - The color associated with the region annotation.
   * @property {Array} regions[].points - The array of points representing the region shape.
   * @property {number} regions[].points[].x - The x-coordinate of a point in the region shape.
   * @property {number} regions[].points[].y - The y-coordinate of a point in the region shape.
   * @property {Date} createdAt - The timestamp indicating when the moderator annotations were created.
   * @property {Date} updatedAt - The timestamp indicating when the moderator annotations were last updated.
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

let ModAnnotations = mongoose.model("ModAnnotations", ModAnnotationsSchema);

module.exports = ModAnnotations;
