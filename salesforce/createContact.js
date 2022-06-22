// Create new customer contact record
const createContact = (conn, body) => {
  let firstName = body.firstName;
  let lastName = body.lastName;
  let ownerId = '005Iw000000UKSGIA4"';
  let email = body.email;
  let mobilePhone = body.phone;
  let unit = body.unit;
  let address = body.address;
  let fullAddress = concatAddress(unit, address);
  let mailingCity = body.city;
  let mailingState = body.state;
  let postCode = body.postCode;
  let mailingCountry = body.country;

  function concatAddress(unit, address) {
    let fAddress;
    if (unit) {
      fAddress = concat("Unit ", unit, " ,", address);
    } else {
      fAddress = address;
    }
    return fAddress;
  }

  return new Promise((resolve, reject) => {
    // Create a sigle contact record
    let createdContactId;
    conn.sobject("Contact").create(
      {
        OwnerId: ownerId,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        MobilePhone: mobilePhone,
        MailingAddress: fullAddress,
        MailingCity: mailingCity,
        MailingState: mailingState,
        MailingPostalCode: postCode,
        MailingCountry: mailingCountry,
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
          createdContactId = res.id;
          resolve(createdContactId);
        }
      }
    );
  });
};

module.exports = createContact;
