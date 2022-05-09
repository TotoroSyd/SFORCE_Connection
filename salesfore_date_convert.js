// Test date format convert
let date_ob = new Date();
console.log("date_ob: ", date_ob);
let date = ("0" + date_ob.getDate()).slice(-2);
console.log("0" + date_ob.getDate());
console.log("date: ", date);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
console.log("0" + (date_ob.getMonth() + 1));
console.log(month);
let year = date_ob.getFullYear();
let date_sf = year + "/" + month + "/" + date;
console.log("date_sf: ", date_sf);
