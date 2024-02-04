# Image-Annotation-Tool

## To run

- connect to college network or VPN
- npm i in server, client and minio server directory
- server is the backend logic and minio server handles the logic for uploading and downloading files from an external minio server
- You will need to create a local sql database first and then restore this dump (use the dump v1_dump.sql in data directory)
- Refer [this](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql) to create a new local database and user

Use these credentials for your local database

```
  host: "localhost",
  user: "dfs_root",
  database: "dfs_db",
  password:"dfsRoot*123"
```
**In case of an error, change port to 3036 in db.js**

- You can use these credentials to login the app running locally (it has data already created so you can understand the functionality)

```
username : amey.choudhary@research.iiit.ac.in
password : Abcdef*123
```

- run server :
```
cd server
node index.js
```

- run minio server :
```
cd minio\ server/
node server.js
```

- start client :
```
cd client
npm start
```
