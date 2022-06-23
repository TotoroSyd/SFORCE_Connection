const express = require("express");
const create_contract_schema = require("../../schema/create_contract_scheme");
const validateRequestSchema = require("../../helper/validate_request_schema");
const createAcc = require("../../salesforce/createAcc");
const createContract = require("../../salesforce/createContract");
const jsforce = require("jsforce");
require("dotenv").config();

const router = express.Router();

const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;
//verify if there are environment variables. If not return error message to console
if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
  console.error(
    "Cannot start app: missing mandatory configuration. Check your .env file."
  );
  process.exit(-1);
}

// Create contract
router.post("/", create_contract_schema, validateRequestSchema, (req, res) => {
  // Extract data from req if passing validation
  let body = req.body;
  console.log(body);

  // Create a contract and new customer account in Salesforce with data from req
  const conn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL });
  conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, async (err) => {
    let createdContractId;
    let createdAccountId;
    try {
      createdAccountId = await createAcc(conn, body);
      createdContractId = await createContract(conn, body, createdAccountId);
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
    console.log("createdContractId :", createdContractId);
    console.log("createdAccountId", createdAccountId);
    return res.status(201).send("Contract created");
  });

  //   return res.status(201).send("Contract created");
});
module.exports = router;
