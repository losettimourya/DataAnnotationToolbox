const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  /**
   * Mongoose model for storing user information in the MongoDB database.
   *
   * @module Users
   * @typedef {Object} Users
   * @property {string} user_id - The unique identifier associated with the user.
   * @property {string} type - The type of user.
   * @property {Date} createdAt - The timestamp indicating when the user record was created.
   * @property {Date} updatedAt - The timestamp indicating when the user record was last updated.
   */

  {
    user_id: String,
    type: String,
  },
  { timestamps: true }
);

let Users = mongoose.model("Users", UserSchema);

module.export = Users;
