const sFDateConvert = require("../helper/sFDateConvert");
const concatAddress = require("..//helper/concatAddress");

const createOrder = (conn, body, createdAccountId, createdContractId) => {
  let ownerId = "005Iw000000UKSGIA4";
  let accountId = createdAccountId;
  let contractId = createdContractId;
  let effectiveDate = sFDateConvert();
  let unit = body.unit;
  let address = body.address;
  let fullAddress = concatAddress(unit, address);
  let shippingCity = body.city;
  let shippingState = body.state;
  let shippingpostCode = body.postCode;
  let shippingCountry = body.country;
  let status = "Draft";
  // let priceBook = "Mochi";

  // Use Promise
  return new Promise((resolve, reject) => {
    // Single order record
    let createdOrderId;
    conn.sobject("Order").create(
      {
        AccountId: accountId,
        ContractId: contractId,
        OwnerId: ownerId,
        EffectiveDate: effectiveDate,
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
        Status: status,
        // Pricebook2: priceBook,
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
          createdOrderId = res.id;
          resolve(createdOrderId);
        }
      }
    );
  });
};
module.exports = createOrder;
