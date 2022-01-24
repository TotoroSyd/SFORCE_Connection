// Adding library
const express = require("express");
const jsforce = require("jsforce");
require("dotenv").config();

// Create express app
const app = express();
// port 3000 is being used by MochiMachi client side
app.set("port", 3001);
const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;
//verify if there are environment variables. If not return error message to console
if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
  console.error(
    "Cannot start app: missing mandatory configuration. Check your .env file."
  );
  process.exit(-1);
}

// Connect SF
app.get("/", (req, res) => {
  const conn = new jsforce.Connection({
    // loginUrl: "https://test.salesforce.com", // NOT WORKING
    // loginUrl: "https://curious-moose-tyz4li-dev-ed.lightning.force.com/", // NOT WORKING
    // loginUrl: "https://curious-moose-tyz4li-dev-ed.my.salesforce.com", // WORKING
    loginUrl: SF_LOGIN_URL,
  });

  // userInfo is a property in conn, containing userId, orgId, url
  conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
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
    res.send(`<h1>JSForce Connect Successed</h1>`);
  });
});

// Express server listening
app.listen(app.get("port"), () => {
  console.log(`Server listening at port: ${app.get("port")}`);
});
