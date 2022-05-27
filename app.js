// Adding library
const express = require("express");
const jsforce = require("jsforce");
const cors = require("cors");
require("dotenv").config();
const retrieveAccount = require("./retrieveAccount");
const createContract = require("./createContract");
const createAcc = require("./createAcc");
// import SFDateConvert from "./salesfore_date_convert";
// const retrieveAccountEvent = require("./retrieveAccount-Event");
// Create express app
const app = express();

// Use express modules
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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

// Create contract
app.post("/createContract", (req, res) => {
  // Extract data from req
  // --Validate req body first
  // ----TODO

  // Check if it is a new customer.
  if (req.oldCust) {
    // Create a contract in Salesforce with data from req
    const conn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL });
    conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, async (err) => {
      let createdContractId;
      try {
        createdContractId = await createContract(conn);
      } catch (err) {
        console.log(err);
        if (err.message == "INVALID FIELD") {
          // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
          return res.status(500).send("INVALID FIELD");
        } else {
          // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
          return res.status(500).send("Error occured");
        }
      }
      // Respond
      // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
      console.log("createdContractId :", createdContractId);
      return res.status(200).send("Return customer. Contract created");
    });
  }

  // Create a contract and new customer account in Salesforce with data from req
  const conn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL });
  conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, async (err) => {
    let createdContractId;
    try {
      createdContractId = await createContract(conn);
    } catch (err) {
      console.log(err);
      if (err.message == "INVALID FIELD") {
        // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        return res.status(500).send("INVALID FIELD");
      } else {
        // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        return res.status(500).send("Error occured");
      }
    }
    // Respond
    // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    console.log("createdContractId :", createdContractId);
    return res.status(200).send("New customer. Contract created");
  });

  // return res.status(200).send("Contract created");
});

// Create account
app.post("/createAccount", (req, res) => {
  const conn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL });
  conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, async (err) => {
    let createdAccountId;
    try {
      createdAccountId = await createAcc(conn);
    } catch (err) {
      console.log(err);
      if (err.message == "INVALID FIELD") {
        // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        return res.status(500).send("INVALID FIELD");
      }
      if (err.message == "JSON_PARSER_ERROR") {
        return res
          .status(500)
          .send(
            "JSON_PARSER_ERROR - Cannot deserialize instance of a compound field"
          );
      }
      if (err.message == "INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST") {
        // return res.status(500).send("INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST");
        return res.status(500).send(err);
      } else {
        // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        return res.status(500).send("Error occured");
      }
    }
    // Respond
    // use Return here to handle Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    console.log("createdAccountId :", createdAccountId);
    return res.status(200).send("Account created");
  });
});

// ------Below is default set up for express----
// Hanlde 404
app.all("*", (req, res) => {
  return res.status(404).send("Resource not found");
});

// Express server listening
app.listen(app.get("port"), () => {
  console.log(`Server listening at port: ${app.get("port")}`);
});
