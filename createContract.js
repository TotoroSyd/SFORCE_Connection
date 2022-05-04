// Use promise
const createContract = (conn) => {
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
};

// Export module
module.exports = createContract;
