const concatAddress = (unit, address) => {
  let fAddress;
  if (unit) {
    fAddress = "Unit " + unit + ", " + address;
  } else {
    fAddress = address;
  }
  return fAddress;
};
module.exports = concatAddress;
