const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const unitConverter = {
  gal: galToL,
  L: 1/galToL,
  mi: miToKm,
  km: 1/miToKm,
  lbs: lbsToKg,
  kg: 1/lbsToKg
};

const units = {
  gal: 'L',
  L: 'gal',
  mi: 'km',
  km: 'mi',
  lbs: 'kg',
  kg: 'lbs'
};

const spellOutUnits = {
  gal: 'gallon',
  L: 'liter',
  mi: 'mile',
  km: 'kilometer',
  lbs: 'pound',
  kg: 'kilogram'
};

module.exports = { unitConverter, units, spellOutUnits };