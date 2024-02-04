import express from "express";
const router = express.Router();
const app = express();
import * as Minio from "minio";
import cors from "cors";
import bodyParser from "body-parser";
app.use(cors());
app.use(bodyParser.json());

var minioClient = new Minio.Client({
  endPoint: "play.min.io",
  port: 9000,
  useSSL: true,
  accessKey: "Q3AM3UQ867SPQQA43P2F",
  secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
});

router.post("/:url", async function (req, res) {
  /**
   * Handles POST requests for deleting an object from a Minio bucket.
   *
   * @memberof module:bucketRouter
   * @function
   * @name deleteObject
   * @param {string} req.params.url - The URL parameter representing the Minio bucket name.
   * @param {string} req.body.fileName - The name of the file to be deleted from the bucket.
   * @param {object} res - The Express response object.
   */
  let fileName = req.body.fileName;
  let bucketName = req.params.url;
  minioClient.removeObject(bucketName, fileName, function (err) {
    if (err) {
      res.status(400).json({ error: "Failed to Delete" });
    }
    res.status(200).json("Deleted");
  });
});

export default router;
