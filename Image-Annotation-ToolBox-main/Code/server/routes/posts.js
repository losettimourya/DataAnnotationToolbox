const express = require("express");
const router = express.Router();
const { execSql, SQL_INJ_ERROR } = require("./db");
const { v4: uuidv4 } = require("uuid");
const { json } = require("body-parser");

router.post("/add_user_annotation", async (req, res) => {
  /**
   * Express route handling the addition of user annotations.
   *
   * @route POST /add_user_annotation
   * @function
   * @async
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the process.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - Success message if user annotation is added successfully.
   *
   * @example
   * // Example usage:
   * // POST /add_user_annotation
   * // Request Body:
   * // {
   * //   user_id: "sample_user_id",
   * //   image_id: "sample_image_id",
   * //   regions: [
   * //     {
   * //       id: "region1",
   * //       color: "#ff0000",
   * //       is_editable: "T",
   * //       isComplete: "T",
   * //       label: { name: "RegionLabel", color: "#00ff00" },
   * //       comment: "Sample Comment",
   * //       points: [{ x: 10, y: 20 }, { x: 30, y: 40 }],
   * //     },
   * //     // Additional regions...
   * //   ]
   * // }
   * // Response:
   * // "User annotation added successfully"
   */
  try {
    var dataset_user_id = req.body.user_id;
    var dataset_image_id = req.body.image_id;
    var regions = req.body.regions; 
    let query = `DELETE FROM User_annotations WHERE dataset_image_id = '${dataset_image_id}' AND user_id = '${dataset_user_id}'`;
    await execSql(query);
    if (dataset_image_id && dataset_user_id) {
      query = `INSERT INTO User_annotations VALUES ( "${dataset_user_id}", "${dataset_image_id}", DEFAULT )`;
      await execSql(query);
    } else {
      res.status(400).send("Invalid Request");
      return;
    }
    query = `DELETE FROM User_annotations_region WHERE dataset_image_id = '${dataset_image_id}' AND user_id = '${dataset_user_id}'`;
    await execSql(query);
    for (let region of regions) {
      var region_id = region.id;
      var region_color = region.color;
      var region_is_editable = region.is_editable;
      if (region_is_editable === "T") {
        region_is_editable = true;
      } else {
        region_is_editable = true;
      }
      var region_is_complete = region.isComplete;
      if (region_is_complete === "T") {
        region_is_complete = true;
      } else {
        region_is_complete = true;
      }
      var region_name = region.label ? `'${region.label.name}'` : "null";
      var region_comment = region.comment;
      if (region_id && region_color) {
        query = `INSERT INTO User_annotations_region VALUES ('${region_id}', '${region_color}', ${region_is_complete},${region_is_editable},${region_name},'${region_comment}','${dataset_user_id}', '${dataset_image_id}', DEFAULT)`;
        await execSql(query);
        var region_points = region.points; 
        query = `DELETE FROM User_annotations_region_point WHERE user_annotations_region_id = '${region_id}'`;
        await execSql(query);
        for (let point of region_points) {
          var point_x = point.x;
          var point_y = point.y;
          if (point_x && point_y) {
            let query = `INSERT INTO User_annotations_region_point VALUES ('${region_id}',${point_x},${point_y},DEFAULT)`;
            await execSql(query);
          } else {
            res.status(400).send("Invalid Request");
            return;
          }
        }
      } else {
        res.status(400).send("Invalid Request");
        return;
      }
    }
    res.status(200).send("User annotation added successfully");
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/add_mod_annotation", async (req, res) => {
  /**
   * Express route handling the addition of mod annotations.
   *
   * @route POST /add_mod_annotation
   * @function
   * @async
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the process.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - Success message if user annotation is added successfully.
   *
   * @example
   * // Example usage:
   * // POST /add_mod_annotation
   * // Request Body:
   * // {
   * //   user_id: "sample_user_id",
   * //   image_id: "sample_image_id",
   * //   regions: [
   * //     {
   * //       id: "region1",
   * //       color: "#ff0000",
   * //       is_editable: "T",
   * //       isComplete: "T",
   * //       label: { name: "RegionLabel", color: "#00ff00" },
   * //       comment: "Sample Comment",
   * //       points: [{ x: 10, y: 20 }, { x: 30, y: 40 }],
   * //     },
   * //     // Additional regions...
   * //   ]
   * // }
   * // Response:
   * // "Mod annotation added successfully"
   */
  try {
    var dataset_user_id = req.body.user_id;
    var dataset_image_id = req.body.image_id;
    var regions = req.body.regions;
    let query = `DELETE FROM Mod_annotations WHERE dataset_image_id = '${dataset_image_id}' AND user_id = '${dataset_user_id}'`;
    await execSql(query);
    if (dataset_image_id && dataset_user_id) {
      query = `INSERT INTO Mod_annotations VALUES ( "${dataset_user_id}", "${dataset_image_id}", DEFAULT )`;
      await execSql(query);
    } else {
      res.status(400).send("Invalid Request");
      return;
    }
    query = `DELETE FROM Mod_annotations_region WHERE dataset_image_id = '${dataset_image_id}' AND user_id = '${dataset_user_id}'`;
    await execSql(query);
    for (let region of regions) {
      var region_id = region.id;
      var region_color = region.color;
      var region_is_editable = region.is_editable;
      if (region_is_editable === "T") {
        region_is_editable = true;
      } else {
        region_is_editable = true;
      }
      var region_is_complete = region.isComplete;
      if (region_is_complete === "T") {
        region_is_complete = true;
      } else {
        region_is_complete = true;
      }
      var region_name = region.label ? `'${region.label.name}'` : null;
      var region_comment = region.comment;
      if (region_id && region_color) {
        query = `INSERT INTO Mod_annotations_region VALUES ('${region_id}', '${region_color}', ${region_is_complete},${region_is_editable},${region_name},'${region_comment}','${dataset_user_id}', '${dataset_image_id}', DEFAULT)`;
        await execSql(query);
        var region_points = region.points; 
        query = `DELETE FROM Mod_annotations_region_point WHERE user_annotations_region_id = '${region_id}'`;
        await execSql(query);
        for (let point of region_points) {
          var point_x = point.x;
          var point_y = point.y;
          if (point_x && point_y) {
            let query = `INSERT INTO Mod_annotations_region_point VALUES ('${region_id}',${point_x},${point_y},DEFAULT)`;
            await execSql(query);
          } else {
            res.status(400).send("Invalid Request");
            return;
          }
        }
      } else {
        res.status(400).send("Invalid Request");
        return;
      }
    }

    res.status(200).send("Mod annotation added successfully");
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/add_image", async (req, res) => {
  /**
   * Express route handling the addition of an image to a dataset.
   *
   * @route POST /add_image
   * @function
   * @async
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the process.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - Success message if the image is added successfully.
   *
   * @example
   * // Example usage:
   * // POST /add_image
   * // Request Body:
   * // {
   * //   image_url: "http://example.com/image.jpg",
   * //   dataset_id: "sample_dataset_id",
   * //   image_name: "ImageName",
   * //   image_status: "Active"
   * // }
   * // Response:
   * // "Image added successfully"
   */
  try {
    var dataset_image_url = req.body.image_url;
    var dataset_image_id = uuidv4();
    var dataset_id = req.body.dataset_id;
    var image_name = req.body.image_name;
    var image_status = req.body.image_status;

    if (dataset_image_url && dataset_id) {
      let query2 = `INSERT INTO Dataset_image_url VALUES ('${dataset_image_id}','${dataset_image_url}', DEFAULT)`;
      let query1 = `INSERT INTO Dataset_image VALUES ('${dataset_image_id}','${dataset_id}','${image_name}','${image_status}', DEFAULT)`;
      execSql(query1)
        .then((result1) => {
          execSql(query2)
            .then((result2) => {
              res.status(200).send(result2);
            })
            .catch((err) => {
              console.log("Error: ", err);
            });
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    } else {
      res.status(400).send("Invalid Request1");
    }
  } catch (err) {
    res.status(400).send("Invalid Request2");
  }
});

router.post("/add_comment", async (req, res) => {
  /**
   * Express route handling the addition of a comment to an image.
   *
   * @route POST /add_comment
   * @function
   * @async
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the process.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - Success message if the comment is added successfully.
   *
   * @example
   * // Example usage:
   * // POST /add_comment
   * // Request Body:
   * // {
   * //   image_id: "sample_image_id",
   * //   commented_by: "JohnDoe",
   * //   content: "This is a comment."
   * // }
   * // Response:
   * // "Comment added successfully"
   */
  try {
    var dataset_image_id = req.body.image_id;
    var comment_id = uuidv4();
    var commented_by = req.body.commented_by;
    var content = req.body.content;

    if (dataset_image_id) {
      let query = `INSERT INTO Image_comment VALUES ('${comment_id}','${dataset_image_id}','${commented_by}','${content}', DEFAULT)`;
      execSql(query)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    } else {
      res.status(400).send("Invalid Request");
    }
  } catch (err) {
    res.status(400).send("Invalid Request");
  }
});

router.get("/get_comment/:image_id", (req, res) => {
  /**
   * Express route handling the retrieval of comments for a specific image.
   *
   * @route GET /get_comment/:image_id
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the process.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON array containing comments for the specified image_id.
   *
   * @example
   * // Example usage:
   * // GET /get_comment/sample_image_id
   * // Response:
   * // [
   * //   {
   * //     comment_id: "sample_comment_id",
   * //     dataset_image_id: "sample_image_id",
   * //     commented_by: "JohnDoe",
   * //     content: "This is a comment.",
   * //     timestamp: "2023-12-04T12:30:45.678Z"
   * //   },
   * //   // Additional comment objects...
   * // ]
   */
  try {
    var image_id = req.params.image_id;
    if (image_id) {
      let query = `select * from Image_comment where dataset_image_id='${image_id}'`;
      execSql(query)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log("Error :", err);
        });
    } else {
      res.status(400).send("Invalid Request : No Image_Id");
    }
  } catch (err) {
    res.status(400).send("Invalid Request,wrong");
  }
});

router.get("/get_image_id/:dataset_id", (req, res) => {
  /**
   * Express route handling the retrieval of image IDs for a specific dataset.
   *
   * @route GET /get_image_id/:dataset_id
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the process.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON array containing image details (image_id, name, status) for the specified dataset_id.
   *
   * @example
   * // Example usage:
   * // GET /get_image_id/sample_dataset_id
   * // Response:
   * // [
   * //   {
   * //     dataset_image_id: "sample_image_id_1",
   * //     dataset_id: "sample_dataset_id",
   * //     image_name: "Image 1",
   * //     image_status: "ACTIVE",
   * //     timestamp: "2023-12-04T12:30:45.678Z"
   * //   },
   * //   {
   * //     dataset_image_id: "sample_image_id_2",
   * //     dataset_id: "sample_dataset_id",
   * //     image_name: "Image 2",
   * //     image_status: "INACTIVE",
   * //     timestamp: "2023-12-04T12:35:12.345Z"
   * //   },
   * //   // Additional image objects...
   * // ]
   */
  try {
    var dataset_id = req.params.dataset_id;
    if (dataset_id) {
      let query = `select * from Dataset_image where dataset_id='${dataset_id}'`;
      execSql(query)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log("Error :", err);
        });
    } else {
      res.status(400).send("Invalid Request : No Image_Id");
    }
  } catch (err) {
    res.status(400).send("Invalid Request,wrong");
  }
});

router.post("/add_dataset", (req, res) => {
  /**
   * Express route handling the creation of a new dataset with associated images and labels.
   *
   * @route POST /add_dataset
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the process.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON object containing the unique identifier (dataset_id) for the newly created dataset.
   *
   * @example
   * // Example usage:
   * // POST /add_dataset
   * // Request Body:
   * // {
   * //   "dataset_name": "Sample Dataset",
   * //   "image_ids": ["sample_image_id_1", "sample_image_id_2"],
   * //   "labels": [
   * //     { "name": "Label A", "color": "#FF0000" },
   * //     { "name": "Label B", "color": "#00FF00" }
   * //   ],
   * //   "description": "A sample dataset",
   * //   "user_id": "sample_user_id"
   * // }
   * // Response:
   * // {
   * //   "dataset_id": "sample_dataset_id"
   * // }
   */
  try {
    var dataset_name = req.body.dataset_name;
    var image_ids = req.body.image_ids; 
    var labels = req.body.labels; 
    var description = req.body.description;

    var dataset_id = uuidv4();
    var dataset_created_by = req.body.user_id;

    if (dataset_name) {
      let query1 = `INSERT IGNORE INTO User VALUES ("${dataset_created_by}","Permanent",DEFAULT)`;
      let query = `INSERT INTO Dataset_name VALUES ("${dataset_name}","${dataset_created_by}","${dataset_id}", "${description}",DEFAULT, DEFAULT)`;
      execSql(query1)
        .then((result1) => {
          execSql(query).then((result2) => {
            res.status(200).send(dataset_id);
          });
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    } else {
      res.status(400).send("Invalid Request");
    }

    image_ids.forEach((image_id) => {
      if (image_id) {
        let query = `INSERT INTO Dataset_image VALUES ("${image_id}","${dataset_id}", DEFAULT)`;
        execSql(query)
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
      } else {
        res.status(400).send("Invalid Request");
      }
    });

    labels.forEach((label) => {
      var label_name = label.name;
      var label_color = label.color;

      if (label_name && label_color) {
        let query = `INSERT INTO Dataset_label VALUES ("${label_name}","${label_color}","${dataset_id}", DEFAULT)`;
        execSql(query)
          .then((result) => {
            res.status(200).send(dataset_id);
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
      } else {
        res.status(400).send("Invalid Request");
      }
    });
  } catch (err) {
    res.status(400).send("Invalid Request,wrong");
  }
});

router.put("/add_label/:dataset_name", async (req, res) => {
  /**
   * Express route handling the addition of label(s) to an existing dataset.
   *
   * @route PUT /add_label/:dataset_name
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the process.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON object containing the result of the label addition operation.
   *
   * @example
   * // Example usage:
   * // PUT /add_label/sample_dataset
   * // Request Body:
   * // {
   * //   "labels": [
   * //     { "name": "Label A", "color": "#FF0000" },
   * //     { "name": "Label B", "color": "#00FF00" }
   * //   ]
   * // }
   * // Response:
   * // {
   * //   "result": "Label(s) added successfully to the dataset."
   * // }
   */
  try {
    var dataset_name = req.params.dataset_name;
    var labels = req.body.labels;
    var user_id = getUserId(req);
    var dataset_id = null;
    dataset_id = dataset_name;

    if (dataset_id) {
      for (let label of labels) {
        var label_name = label.name;
        var label_color = label.color;

        if (label_name && label_color) {
          let query = `INSERT INTO Dataset_label VALUES ( "${label_name}", "${label_color}", "${dataset_id}", DEFAULT )`;
          execSql(query)
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((err) => {
              console.log("Error: ", err);
            });
        } else {
          res.status(400).send("Invalid Request");
        }
      }
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).send("Invalid Request");
  }
});

// gets  all user annotations for a particular image
router.get("/get_image_user_annotations/:imageId", async (req, res) => {
  /**
   * Express route to retrieve user annotations for a specific image.
   *
   * @route GET /get_image_user_annotations/:image_id
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the database query.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON object containing user annotations for the specified image.
   *
   * @example
   * // Example usage:
   * // GET /get_image_user_annotations/sample_image_id
   * // Response:
   * // [
   * //   {
   * //     "user_annotations_region_id": "1",
   * //     "dataset_image_id": "sample_image_id",
   * //     "user_id": "user123",
   * //     "region_color": "#FF0000",
   * //     "is_complete": true,
   * //     "is_editable": true,
   * //     "region_name": "Region A",
   * //     "region_comment": "Annotation for Region A",
   * //     "user_annotations_region_point_id": "1",
   * //     "user_annotations_region_id": "1",
   * //     "region_point_x": 100,
   * //     "region_point_y": 150
   * //   },
   * //   // Additional user annotations...
   * // ]
   */
  let user_id = getUserId(req);
  let image_id = req.params.imageId;
  try {
    let query1 = `SELECT * FROM Mod_annotations_region INNER JOIN Mod_annotations_region_point ON Mod_annotations_region.user_annotations_region_id = Mod_annotations_region_point.user_annotations_region_id WHERE Mod_annotations_region.dataset_image_id = '${image_id}' AND Mod_annotations_region.user_id = '${user_id}'`;
    execSql(query1)
      .then((result) => {
        if (result == null || !result.length) {
          let query2 = `SELECT * FROM User_annotations_region INNER JOIN User_annotations_region_point ON User_annotations_region.user_annotations_region_id = User_annotations_region_point.user_annotations_region_id WHERE User_annotations_region.dataset_image_id = '${image_id}'`;
          execSql(query2).then((result2) => {
            res.status(200).json({ data: result2 });
          });
        } else {
          res.status(200).json({ data: result });
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({
          status: 500,
          message: err.message,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// gets all labels for a particular dataset
router.get("/get_images_labels/:dataset_name", async (req, res) => {
  /**
   * Express route to retrieve labels associated with a specific dataset.
   *
   * @route GET /get_images_labels/:dataset_name
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the database query.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON object containing labels for the specified dataset.
   *
   * @example
   * // Example usage:
   * // GET /get_images_labels/sample_dataset_id
   * // Response:
   * // [
   * //   {
   * //     "dataset_label_name": "Label A",
   * //     "dataset_label_color": "#FF0000",
   * //     "dataset_id": "sample_dataset_id",
   * //     "dataset_name": "Sample Dataset",
   * //     "dataset_created_by": "user123",
   * //     "dataset_description": "Description of Sample Dataset",
   * //     "dataset_created_at": "2023-01-01T00:00:00.000Z",
   * //     "dataset_updated_at": "2023-01-01T00:00:00.000Z"
   * //   },
   * //   // Additional labels...
   * // ]
   */
  try {
    var dataset_id = req.params.dataset_name;
    var dataset_name = await fetchDatasetName(dataset_id);
    var user_id = await fetchUserIdfromDatasetId(dataset_id);
    let query = `SELECT * FROM Dataset_label INNER JOIN Dataset_name ON Dataset_label.dataset_id = Dataset_name.dataset_id WHERE Dataset_name.dataset_name = '${dataset_name}' AND Dataset_name.dataset_created_by = '${user_id}'`;
    execSql(query)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  } catch (err) {
    res.status(400).send("Invalid Request");
  }
});

// gets image url
router.get("/get_image_url/:image_id", async (req, res) => {
  /**
   * Express route to retrieve the URL associated with a specific image ID.
   *
   * @route GET /get_image_url/:image_id
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the database query.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON object containing the URL for the specified image ID.
   *
   * @example
   * // Example usage:
   * // GET /get_image_url/sample_image_id
   * // Response:
   * // [
   * //   {
   * //     "dataset_image_id": "sample_image_id",
   * //     "dataset_image_url": "https://example.com/images/sample_image.jpg",
   * //     "dataset_image_created_at": "2023-01-01T00:00:00.000Z",
   * //     "dataset_image_updated_at": "2023-01-01T00:00:00.000Z"
   * //   }
   * // ]
   */
  try {
    var image_id = req.params.image_id;
    let query = `SELECT * FROM Dataset_image_url WHERE dataset_image_id = '${image_id}'`;
    execSql(query)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  } catch (err) {
    res.status(400).send("Invalid Request");
  }
});

// gets all the annotations done by mod for that particular image
router.get("/get_mod_annotation/:imageId", async (req, res) => {
  /**
   * Express route to retrieve moderation annotations for a specific image ID.
   *
   * @route GET /get_mod_annotation/:imageId
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the database query.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON object containing moderation annotations for the specified image ID.
   *
   * @example
   * // Example usage:
   * // GET /get_mod_annotation/sample_image_id
   * // Response:
   * // [
   * //   {
   * //     "mod_annotations_region_id": "sample_region_id",
   * //     "dataset_image_id": "sample_image_id",
   * //     "user_id": "sample_user_id",
   * //     "mod_annotations_region_color": "#FFFFFF",
   * //     "mod_annotations_region_is_complete": true,
   * //     "mod_annotations_region_is_editable": true,
   * //     "mod_annotations_region_name": "Region Name",
   * //     "mod_annotation_region_comment": "Annotation Comment",
   * //     "mod_annotations_region_created_at": "2023-01-01T00:00:00.000Z",
   * //     "mod_annotations_region_updated_at": "2023-01-01T00:00:00.000Z",
   * //     "mod_annotations_region_point_id": "sample_point_id",
   * //     "mod_annotations_region_point_x": 100,
   * //     "mod_annotations_region_point_y": 200,
   * //     "mod_annotations_region_point_created_at": "2023-01-01T00:00:00.000Z",
   * //     "mod_annotations_region_point_updated_at": "2023-01-01T00:00:00.000Z"
   * //   }
   * // ]
   */
  let user_id = getUserId(req);
  let image_id = req.params.imageId;
  try {
    let query1 = `SELECT * FROM Mod_annotations_region INNER JOIN Mod_annotations_region_point ON Mod_annotations_region.user_annotations_region_id = Mod_annotations_region_point.user_annotations_region_id WHERE Mod_annotations_region.dataset_image_id = '${image_id}' AND Mod_annotations_region.user_id = '${user_id}'`;

    execSql(query1)
      .then((result) => {
        if (result.length === 0) {
          let query2 = `SELECT * FROM User_annotations_region INNER JOIN User_annotations_region_point ON User_annotations_region.user_annotations_region_id = User_annotations_region_point.user_annotations_region_id WHERE User_annotations_region.dataset_image_id = '${image_id}'`;

          return execSql(query2);
        } else {
          res.status(200).send(result);
        }
      })
      .then((result2) => {
        res.status(200).send(result2);
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({
          status: 500,
          message: err.message,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// gets all the annotations done by user for that particular image
router.get("/get_user_annotation/:imageId", async (req, res) => {
  /**
   * Express route to retrieve user annotations for a specific image ID and user ID.
   *
   * @route GET /get_user_annotation/:imageId
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the database query.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON object containing user annotations for the specified image ID and user ID.
   *
   * @example
   * // Example usage:
   * // GET /get_user_annotation/sample_image_id
   * // Response:
   * // {
   * //   "data": [
   * //     {
   * //       "user_annotations_region_id": "sample_region_id",
   * //       "dataset_image_id": "sample_image_id",
   * //       "user_id": "sample_user_id",
   * //       "user_annotations_region_color": "#FFFFFF",
   * //       "user_annotations_region_is_complete": true,
   * //       "user_annotations_region_is_editable": true,
   * //       "user_annotations_region_name": "Region Name",
   * //       "user_annotation_region_comment": "Annotation Comment",
   * //       "user_annotations_region_created_at": "2023-01-01T00:00:00.000Z",
   * //       "user_annotations_region_updated_at": "2023-01-01T00:00:00.000Z",
   * //       "user_annotations_region_point_id": "sample_point_id",
   * //       "user_annotations_region_point_x": 100,
   * //       "user_annotations_region_point_y": 200,
   * //       "user_annotations_region_point_created_at": "2023-01-01T00:00:00.000Z",
   * //       "user_annotations_region_point_updated_at": "2023-01-01T00:00:00.000Z"
   * //     }
   * //   ]
   * // }
   * }
   */

  let user_id = getUserId(req);
  let image_id = req.params.imageId;
  try {
    let query = `SELECT * FROM User_annotations_region INNER JOIN User_annotations_region_point ON User_annotations_region.user_annotations_region_id = User_annotations_region_point.user_annotations_region_id WHERE User_annotations_region.dataset_image_id = '${image_id}' AND User_annotations_region.user_id = '${user_id}'`;
    execSql(query)
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/get_user_annotation/all", async (req, res) => {
  /**
   * Express route to retrieve all user annotations for the authenticated user.
   *
   * @route GET /get_user_annotation/all
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the database query.
   * @returns {Object} 200 - A JSON object containing all user annotations for the authenticated user.
   *
   * @example
   * // Example usage:
   * // GET /get_user_annotation/all
   * // Response:
   * // [
   * //   {
   * //     "user_annotations_region_id": "sample_region_id",
   * //     "dataset_image_id": "sample_image_id",
   * //     "user_id": "sample_user_id",
   * //     "user_annotations_region_color": "#FFFFFF",
   * //     "user_annotations_region_is_complete": true,
   * //     "user_annotations_region_is_editable": true,
   * //     "user_annotations_region_name": "Region Name",
   * //     "user_annotation_region_comment": "Annotation Comment",
   * //     "user_annotations_region_created_at": "2023-01-01T00:00:00.000Z",
   * //     "user_annotations_region_updated_at": "2023-01-01T00:00:00.000Z",
   * //     "user_annotations_region_point_id": "sample_point_id",
   * //     "user_annotations_region_point_x": 100,
   * //     "user_annotations_region_point_y": 200,
   * //     "user_annotations_region_point_created_at": "2023-01-01T00:00:00.000Z",
   * //     "user_annotations_region_point_updated_at": "2023-01-01T00:00:00.000Z"
   * //   },
   * //   // Additional user annotations...
   * // ]
   */
  let user_id = getUserId(req);
  let image_id = req.params.imageId;
  try {
    const query = `SELECT * FROM User_annotations_region 
                       INNER JOIN User_annotations_region_point 
                       ON User_annotations_region.user_annotations_region_id = User_annotations_region_point.user_annotations_region_id 
                       WHERE User_annotations_region.user_id = '${user_id}'`;

    const result = await execSql(query);
    return result;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
});

// gets all the dataset details from the dataset_name table using the author_name
router.get("/get_dataset/:dataset_created_by", async (req, res) => {
  /**
   * Express route to retrieve dataset details based on the creator's user ID.
   *
   * @route GET /get_dataset/:dataset_created_by
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the database query.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON object containing dataset details for the specified creator's user ID.
   *
   * @example
   * // Example usage:
   * // GET /get_dataset/sample_creator_id
   * // Response:
   * // [
   * //   {
   * //     "dataset_id": "sample_dataset_id",
   * //     "dataset_name": "Sample Dataset",
   * //     "dataset_created_by": "sample_creator_id",
   * //     "dataset_description": "Dataset Description",
   * //     "dataset_created_at": "2023-01-01T00:00:00.000Z",
   * //     "dataset_updated_at": "2023-01-01T00:00:00.000Z"
   * //   },
   * //   // Additional dataset details...
   * // ]
   */
  let dataset_created_by = req.params.dataset_created_by;
  try {
    let query = `SELECT * FROM Dataset_name WHERE dataset_created_by='${dataset_created_by}'`;
    execSql(query)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// gets all the dataset details from the dataset_name table using the dataset_id
router.get("/get_dataset_id/:dataset_id", async (req, res) => {
  /**
   * Express route to retrieve dataset details based on the dataset ID.
   *
   * @route GET /get_dataset_id/:dataset_id
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @throws {Object} 500 - Internal Server Error if an unexpected error occurs during the database query.
   * @throws {Object} 400 - Bad Request if the incoming request is missing required parameters.
   * @returns {Object} 200 - A JSON object containing dataset details for the specified dataset ID.
   *
   * @example
   * // Example usage:
   * // GET /get_dataset_id/sample_dataset_id
   * // Response:
   * // [
   * //   {
   * //     "dataset_id": "sample_dataset_id",
   * //     "dataset_name": "Sample Dataset",
   * //     "dataset_created_by": "sample_creator_id",
   * //     "dataset_description": "Dataset Description",
   * //     "dataset_created_at": "2023-01-01T00:00:00.000Z",
   * //     "dataset_updated_at": "2023-01-01T00:00:00.000Z"
   * //   }
   * // ]
   */
  let dataset_id = req.params.dataset_id;
  try {
    let query = `SELECT * FROM Dataset_name WHERE dataset_id ='${dataset_id}'`;
    execSql(query)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});


function getUserId(request) {
  /**
   * Extracts the user ID from the authentication JWT token in the request headers.
   *
   * @function
   * @param {Object} request - The Express request object.
   * @returns {string|null} - The user ID extracted from the authentication token, or null if not available.
   *
   * @example
   * // Example usage:
   * const userId = getUserId(req);
   */
  let user_id = request.headers["auth-token"];
  return user_id;
}

async function fetchDatasetId(dataset_name, user_id) {
  /**
   * Fetches the dataset ID based on the dataset name and user ID.
   *
   * @async
   * @function
   * @param {string} dataset_name - The name of the dataset.
   * @param {string} user_id - The user ID associated with the dataset.
   * @throws {Error} - Throws an error if an unexpected error occurs during the database query.
   * @returns {string} - The dataset ID corresponding to the provided dataset name and user ID.
   *
   * @example
   * // Example usage:
   * const datasetId = await fetchDatasetId("Sample Dataset", "sample_user_id");
   */
  let query = `SELECT dataset_id FROM Dataset_name WHERE dataset_name = '${dataset_name}' AND dataset_created_by = '${user_id}'`;
  try {
    const result = await execSql(query);
    return result[0].dataset_id;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
}

async function fetchDatasetName(dataset_id) {
  /**
   * Fetches the dataset name based on the dataset ID.
   *
   * @async
   * @function
   * @param {string} dataset_id - The ID of the dataset.
   * @throws {Error} - Throws an error if an unexpected error occurs during the database query.
   * @returns {string} - The dataset name corresponding to the provided dataset ID.
   *
   * @example
   * // Example usage:
   * const datasetName = await fetchDatasetName("sample_dataset_id");
   */
  let query = `SELECT dataset_name FROM Dataset_name WHERE dataset_id = '${dataset_id}'`;
  try {
    const result = await execSql(query);
    return result[0].dataset_name;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
}

async function fetchUserIdfromDatasetId(dataset_id) {
  /**
   * Fetches the user ID associated with a given dataset ID.
   *
   * @async
   * @function
   * @param {string} dataset_id - The ID of the dataset.
   * @throws {Error} - Throws an error if an unexpected error occurs during the database query.
   * @returns {string} - The user ID associated with the provided dataset ID.
   *
   * @example
   * // Example usage:
   * const userId = await fetchUserIdfromDatasetId("sample_dataset_id");
   */
  let query = `SELECT dataset_created_by FROM Dataset_name WHERE dataset_id = '${dataset_id}'`;
  try {
    const result = await execSql(query);
    return result[0].dataset_created_by;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
}

module.exports = router;
