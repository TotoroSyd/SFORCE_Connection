// Use promise
const retrieveAccount = (conn) => {
  // const soql = `SELECT Id, Name, CreatedById, OwnerId FROM Account WHERE CreatedById='005Iw000000UKSGIA4' LIMIT 100`;
  const soql = `SELECT Id, Name, CreatedById, OwnerId FROM Account LIMIT 100`;
  // Use Promise
  return new Promise((resolve, reject) => {
    let accounts = [];
    conn.query(soql, (err, result) => {
      if (result.records.length === 0) {
        // https://javascript.info/try-catch#throw-operator
        reject(new Error("Session not found"));
      } else if (err) {
        reject(err);
      } else {
        accounts = result.records.map((record) => {
          return { id: record.Id, name: record.Name };
        });
        resolve(accounts);
      }
    });
  });
};

module.exports = retrieveAccount;
