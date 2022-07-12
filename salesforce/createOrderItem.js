const getPriceBookEntryId = require("../helper/priceBookEntry");

const createOrderItem = (conn, element, createdOrderId) => {
  let orderId = createdOrderId;
  let product = element.product;
  let unitPrice = element.unitPrice;
  let quantity = element.quantity;
  let productId = element.productSFId;
  // refer to Notion note 7 Jul for details
  let priceBookEntryId = getPriceBookEntryId(product);

  // Use Promise
  return new Promise((resolve, reject) => {
    let createdOrderItemId;
    conn.sobject("OrderItem").create(
      {
        OrderId: orderId,
        Product2Id: productId,
        PricebookEntryId: priceBookEntryId,
        UnitPrice: unitPrice,
        Quantity: quantity,
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
          createdOrderItemId = res.id;
          resolve(createdOrderItemId);
        }
      }
    );
  });
};
module.exports = createOrderItem;
