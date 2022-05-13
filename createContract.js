const createContract = (conn) => {
  // Use Promise
  return new Promise((resolve, reject) => {
    // Single contract record
    let createdContractId;
    conn.sobject("Contract").create(
      {
        AccountId: "001Iw000002Pi0FIAS",
        OwnerId: "005Iw000000UKSGIA4",
        StartDate: "2022-05-15",
      },
      (err, res) => {
        if (err || !res.success) {
          if (err.errorCode == "INVALID_FIELD") {
            reject(new Error("INVALID FIELD"));
          } else {
            console.log(res);
            console.error(err);
            reject(err);
          }
        } else {
          createdContractId = res.id;
          resolve(createdContractId);
        }
      }
    );
  });
};

module.exports = createContract;
