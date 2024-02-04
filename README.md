# Image-Annotation-Tool-Box
## [Final-Eval Demo](https://drive.google.com/file/d/1jnuKmRnZ2JKMizktlsQIXc0I1I_abvIh/view?usp=sharing)
# Image-Annotation-Moderation-Tool
## To Run

1. Connect to the IIITH college network or VPN.
2. Run the following commands in the server, client, and minio server directories:

    ```bash
    npm i
    ```

3. The server is responsible for the backend logic, and the minio server handles the logic for uploading and downloading files from an external minio server.
4. Create a local SQL database and restore the dump using the provided `v3_dump.sql` in the data directory.
   - Refer to [this guide](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql) to create a new local database and user.

    Use these credentials for your local database:

    ```javascript
    host: "localhost",
    user: "dfs_root",
    database: "dfs_db",
    password: "dfsRoot*123"
    ```

    **In case of an error, change the port to 3036 in `db.js`.**

5. Use the following credentials to log in to the app running locally. The app already contains pre-existing data to help you understand its functionality:

    ```javascript
    username: amey.choudhary@research.iiit.ac.in
    password: Abcdef*123
    ```

6. Run the server:

    ```bash
    cd server
    node index.js
    ```

7. Run the minio server:

    ```bash
    cd minio\ server/
    node server.js
    ```

8. Start the client:

    ```bash
    cd client
    npm start
    ```

## Demo Walkthrough

For a detailed walkthrough and demonstration, you can watch the [demo video on YouTube](https://www.youtube.com/watch?v=r6KreJzbP5I).
