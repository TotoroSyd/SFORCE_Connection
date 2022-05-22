const createAcc = (conn) => {
  let ownerId = "005Iw000000UKSGIA4";
  let firstName = "Lego";
  let lastName = "Perera";
  let fullName = firstName + lastName;
  let email = "lego.perera@gmail.com";
  let mobilePhone = "5655";
  let unit = "10";
  let address = "17 Lollipop street, Thornleigh";
  let fullAddress = concatAddress(unit, address);
  let shippingCity = "Sydney";
  let shippingState = "NSW";
  let shippingpostCode = "2121";
  let shippingCountry = "Australia";
  let type = "Customer - Channel";
  let isActive = true;
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
        // PersonEmail: email,
        ShippingStreet: fullAddress,
        ShippingCity: shippingCity,
        ShippingState: shippingState,
        ShippingPostalCode: shippingpostCode,
        ShippingCountry: shippingCountry,
        // Active__c: isActive,
        // IsPersonAccount: isPersonAccount,
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
