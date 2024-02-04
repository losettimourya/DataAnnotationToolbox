const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DatasetSchema = new Schema(
  /**
   * Mongoose model for representing datasets in the MongoDB database.
   *
   * @module Datasets
   * @typedef {Object} Datasets
   * @property {string} dataset_name - The name of the dataset.
   * @property {Array.<{ image_id: string }>} image_ids - Array of image IDs associated with the dataset.
   * @property {Array.<{ name: string, color: string }>} labels - Array of labels with name and color associated with the dataset.
   */
  {
    dataset_name: String,
    image_ids: [{ image_id: String }],
    labels: [{ name: String, color: String }],
  }
);

let Datasets = mongoose.model("Datasets", DatasetSchema);

module.exports = Datasets;
