const express = require("express");
const retrieveAccount = require("../../retrieveAccount");
const jsforce = require("jsforce");
const cors = require("cors");
const router = express.Router();

router.get("/", (req, res) => {
  const conn = new jsforce.Connection({
    // loginUrl: "https://test.salesforce.com", // NOT WORKING
    // loginUrl: "https://creative-hawk-vy06k7-dev-ed.lightning.force.com/", // NOT WORKING
    // loginUrl: "https://creative-hawk-vy06k7-dev-ed.my.salesforce.com", // WORKING
    loginUrl: SF_LOGIN_URL,
  });

  // userInfo is a property in conn, containing userId, orgId, url
  conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, async (err, userInfo) => {
    let accounts = [];
    try {
      // Save access token and instace URL for later use
      // console.log(conn);
      // console.log("Access Token: " + conn.accessToken);
      // console.log("Instance URL: " + conn.instanceUrl);
      // logged in user property
      // console.log("User ID: " + userInfo.id);
      // console.log("Org ID: " + userInfo.organizationId);

      // Retrieve Accounts
      accounts = await retrieveAccount(conn);
    } catch (err) {
      if (err.message == "Session not found") {
        // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        return res.status(404).send("Session not found");
      } else {
        // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        return res.status(500).send("Error occured");
      }
    }
    // Respond
    // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    return res.status(200).json(accounts);
    // return res.status(200).send("Got in");
  });
});
