const sql = require("mysql2");
/**
 * Constant representing a potential SQL injection error.
 * @constant {string}
 */
const SQL_INJ_ERROR = "Potential sql injection";

const connectionParams = {
  host: "localhost",
  user: "dfs_root",
  database: "dfs_db",
  password: "dfsRoot*123",
};

const pool =
  process.env.USER === "dfs_root"
    ? sql.createPool({ ...connectionParams, user: "dfs_root" })
    : sql.createPool({ ...connectionParams });

function execSql(statement) {
  /**
   * Executes the provided SQL statement using the database connection pool.
   *
   * @async
   * @function
   * @param {string} statement - The SQL statement to be executed.
   * @returns {Promise<*>} - A promise that resolves with the result of the SQL query or rejects with an error.
   */
  return new Promise(function (res, rej) {
    if (statement.includes(";")) {
      rej(SQL_INJ_ERROR);
    }
    pool.getConnection((err, con) => {
      if (err) {
        console.log(err);
        rej(err);
      }

      console.log("Connected to database");
      con.query(statement, function (err, result) {
        con.release();
        if (err) rej(err);
        else res(result);
      });
    });
  });
}

/**
 * Module exports for the database utility.
 *
 * @namespace Database
 * @type {Object}
 * @property {Function} execSql - Executes the provided SQL statement and returns a promise.
 * @property {string} SQL_INJ_ERROR - Constant representing a potential SQL injection error.
 */
module.exports = {
  execSql,
  SQL_INJ_ERROR,
};
