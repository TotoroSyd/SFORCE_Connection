// Adding library
const express = require("express");
const jsforce = require("jsforce");
require("dotenv").config();
const retrieveAccount = require("./retrieveAccount");
// const retrieveAccountEvent = require("./retrieveAccount-Event");
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
  });
});

// Create contract
app.post("/createContract", (req, res) => {
  // const conn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL });
  // conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, async (err, userInfo) => {try{}catch (err){});

  // Test date format convert
  let date_ob = new Date();
  console.log("date_ob: ", date_ob);
  let date = ("0" + date_ob.getDate()).slice(-2);
  console.log("0" + date_ob.getDate());
  console.log("date: ", date);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  console.log("0" + (date_ob.getMonth() + 1));
  console.log(month);
  let year = date_ob.getFullYear();
  let date_sf = year + "/" + month + "/" + date;
  console.log("date_sf: ", date_sf);
});

// Hanlde 404
app.all("*", (req, res) => {
  return res.status(404).send("Resource not found");
});

// Express server listening
app.listen(app.get("port"), () => {
  console.log(`Server listening at port: ${app.get("port")}`);
});
