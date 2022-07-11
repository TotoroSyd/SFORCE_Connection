const product_priceBook = require("../salesforce/product_pricebook");

const getPriceBookEntryId = (product) => {
  let pbookentryId;
  for (let i = 0; i < product_priceBook.length; i++) {
    if (product_priceBook[i].product_name === product) {
      pbookentryId = product_priceBook[i].pricebookEntryId;
      break;
    } else {
      pbookentryId = "Cannot find price book entry ID";
    }
  }
  return pbookentryId;
};

module.exports = getPriceBookEntryId;
