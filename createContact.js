// Create new customer contact record
const createContact = (conn) => {
  let firstName = "Lego";
  let lastName = "Perera";
  let ownerId = '005Iw000000UKSGIA4"';
  let email = "lego.perera@gmail.com";
  let mobilePhone = "5655";
  let unit = "10";
  let address = "17 Lollipop street, Thornleigh";
  let fullAddress = concatAddress(unit, address);
  let mailingCity = "Sydney";
  let mailingState = "NSW";
  let postCode = "2121";
  let mailingCountry = "Australia";

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
    // Create sigle contact record
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
