const express = require("express");
const createAcc = require("./createAcc");

const router = express.Router();
router.post("/createAccount", (req, res) => {
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

module.exports = router;
