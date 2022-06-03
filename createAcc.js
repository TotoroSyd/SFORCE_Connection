const createAcc = (conn, body) => {
  let ownerId = "005Iw000000UKSGIA4";
  let firstName = body.firstName;
  let lastName = body.lastName;
  let fullName = firstName + " " + lastName;
  let email = body.email;
  let mobilePhone = body.phone;
  let unit = body.unit;
  let address = body.address;
  let fullAddress = concatAddress(unit, address);
  let shippingCity = body.city;
  let shippingState = body.state;
  let shippingpostCode = body.postCode;
  let shippingCountry = body.country;
  let type = "Customer - Channel";
  let isActive = "Yes";
  let isPersonAccount = true;

  function concatAddress(unit, address) {
    let fAddress;
    if (unit) {
      fAddress = "Unit " + unit + ", " + address;
    } else {
      fAddress = address;
    }
    return fAddress;
  }

  return new Promise((resolve, reject) => {
    let createdAccId;
    conn.sobject("Account").create(
      {
        OwnerId: ownerId,
        Name: fullName,
        Type: type,
        Phone: mobilePhone,
        Email__c: email,
        ShippingStreet: fullAddress,
        ShippingCity: shippingCity,
        ShippingState: shippingState,
        ShippingPostalCode: shippingpostCode,
        ShippingCountry: shippingCountry,
        Active__c: isActive,
      },
      (err, res) => {
        console.log(res, err);
        if (err || !res.success) {
          if (err.errorCode == "INVALID_FIELD") {
            reject(new Error("INVALID FIELD"));
          }
          if (err.errorCode == "JSON_PARSER_ERROR") {
            reject(new Error("JSON_PARSER_ERROR"));
          }
          if (err.errorCode == "INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST") {
            reject(
              new Error("INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST", {
                cause: err.fields,
              })
            );
          } else {
            console.log(res);
            console.error(err);
            reject(err);
          }
        } else {
          console.log(res);
          createdAccId = res.id;
          resolve(createdAccId);
        }
      }
    );
  });
};

module.exports = createAcc;
