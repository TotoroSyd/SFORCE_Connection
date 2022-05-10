export default function createContract(conn, isReturnCust) {
  // Check if it is a return customer
  if (isReturnCust) {
    // create contract record
    insertContract();
  } else {
    // Create new contact if it is a new customer
    // create contract record
    insertContract();
  }

  function insertContract() {
    // Single contract record
    conn.sobject("Contracts").create({
      AccountId: "0015g00000GmYPBAA3",
      OwnerId: "0055g00000ArZNIAA3",
      StartDate: "2022-03-26",
      EndDate: "2022-03-31",
    }),
      function (err, res) {
        if (err || !res.success) {
          return console.error(err, res);
        }
      };
    console.log("Created record id : " + res.id);
  }
}
