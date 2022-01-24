// Adding library
const express = require("express");
const jsforce = require("jsforce");
require("dotenv").config();

// Create express app
const app = express();
app.set("port", 3001);

// Connect SF
app.get("/", (req, res) => {
  const conn = new jsforce.Connection({
    // loginUrl: "https://test.salesforce.com", // NOT WORKING
    // loginUrl: "https://curious-moose-tyz4li-dev-ed.lightning.force.com/", // NOT WORKING
    // loginUrl: "https://curious-moose-tyz4li-dev-ed.my.salesforce.com", // WORKING
    loginUrl: process.env.SF_LOGIN_URL,
  });
  const username = process.env.SF_USERNAME;
  const password = process.env.SF_PASSWORD;
  const securityToken = process.env.SF_TOKEN;
  // userInfo is a property in conn, containing userId, orgId, url
  conn.login(username, password + securityToken, (err, userInfo) => {
    if (err) {
      return console.log(err);
    }
    // Save access token and instace URL for later use
    // console.log(conn);
    console.log("Access Token: " + conn.accessToken);
    console.log("Instance URL: " + conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // Respond
    res.send("JSForce Connect Successed");
  });
});

// Express server listening
app.listen(app.get("port"), () => {
  console.log(`Server listening at port: ${app.get("port")}`);
});
