// const SFDateConvert = require("./salesforce_date_convert");

const createContract = (conn, body, createdAccountId) => {
  // let accountId = "001Iw000002Pi0FIAS";
  let accountId = createdAccountId;
  let ownerId = "005Iw000000UKSGIA4";
  let unit = body.unit;
  let address = body.address;
  let fullAddress = concatAddress(unit, address);
  let shippingCity = body.city;
  let shippingState = body.state;
  let shippingpostCode = body.postCode;
  let shippingCountry = body.country;
  let startDate = sfDateConvert();
  let endDate = sfDateConvert();
  function sfDateConvert() {
    let date_ob = new Date();
    //   console.log("date_ob: ", date_ob);
    let date = ("0" + date_ob.getDate()).slice(-2);
    //   console.log("0" + date_ob.getDate());
    //   console.log("date: ", date);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    //   console.log("0" + (date_ob.getMonth() + 1));
    //   console.log(month);
    let year = date_ob.getFullYear();
    let date_sf = year + "-" + month + "-" + date;
    //   console.log("date_sf: ", date_sf);

    return date_sf;
  }
  function concatAddress(unit, address) {
    let fAddress;
    if (unit) {
      fAddress = "Unit " + unit + ", " + address;
    } else {
      fAddress = address;
    }
    return fAddress;
  }

  // Use Promise
  return new Promise((resolve, reject) => {
    // Single contract record
    let createdContractId;
    conn.sobject("Contract").create(
      {
        AccountId: accountId,
        OwnerId: "005Iw000000UKSGIA4",
        StartDate: startDate,
        // EndDate: endDate,
        BillingCity: shippingCity,
        BillingCountry: shippingCountry,
        BillingState: shippingState,
        BillingStreet: fullAddress,
        BillingPostalCode: shippingpostCode,
        // ShippingCity: shippingCity,
        // ShippingCountry: shippingCountry,
        // ShippingState: shippingState,
        // ShippingStreet: fullAddress,
        // ShippingPostalCode: shippingpostCode,
      },
      (err, res) => {
        if (err || !res.success) {
          if (err.errorCode == "INVALID_FIELD") {
            console.error(err);
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
