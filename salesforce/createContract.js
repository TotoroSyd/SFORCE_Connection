const sFDateConvert = require("../helper/sFDateConvert");
const concatAddress = require("../helper/concatAddress");

const createContract = (conn, body, createdAccountId) => {
  let accountId = createdAccountId;
  let ownerId = "005Iw000000UKSGIA4";
  let unit = body.unit;
  let address = body.address;
  let fullAddress = concatAddress(unit, address);
  let shippingCity = body.city;
  let shippingState = body.state;
  let shippingpostCode = body.postCode;
  let shippingCountry = body.country;
  let startDate = sFDateConvert();
  let revToReportWeb = body.total;

  // Use Promise
  return new Promise((resolve, reject) => {
    // Single contract record
    let createdContractId;
    conn.sobject("Contract").create(
      {
        AccountId: accountId,
        OwnerId: ownerId,
        StartDate: startDate,
        BillingCity: shippingCity,
        BillingCountry: shippingCountry,
        BillingState: shippingState,
        BillingStreet: fullAddress,
        BillingPostalCode: shippingpostCode,
        ShippingCity: shippingCity,
        ShippingCountry: shippingCountry,
        ShippingState: shippingState,
        ShippingStreet: fullAddress,
        ShippingPostalCode: shippingpostCode,
        Revenue_To_Report_Web__c: revToReportWeb,
      },
      (err, res) => {
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
          createdContractId = res.id;
          resolve(createdContractId);
        }
      }
    );
  });
};

module.exports = createContract;
