import express from "express";
const router = express.Router();
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
app.use(cors());
app.use(bodyParser.json());
import { minioClient } from "../minioConfig.js";

router.get("/:url", async function (req, res) {
  /**
   * Handles GET requests for retrieving a presigned URL of an image from a Minio bucket.
   *
   * @memberof module:imageRouter
   * @function
   * @name getImageUrl
   * @param {string} req.params.url - The URL parameter representing the Minio bucket name.
   * @param {string} req.query.imageName - The query parameter representing the name of the image.
   * @param {object} res - The Express response object.
   */
  try {
    const datasetName = req.params.url;
    const { imageName } = req.query;
    const imageUrl = await minioClient.presignedGetObject(
      "datafoundation-dev",
      imageName,
      60 * 60
    );
    const imageURL = { image: imageUrl };
    res.json(imageURL);
  } catch (err) {
    console.log(err.message);
    res.send({ err });
  }
});
export default router;
