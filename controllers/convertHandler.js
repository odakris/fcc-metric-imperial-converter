const { unitConverter, units, spellOutUnits } = require('../units');

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = inputSplitter(input).num || 1;  // default value = 1
    return isValidNum(result);
  };
  
  this.getUnit = function(input) {
    let result = inputSplitter(input).unit;    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = units[this.getUnit(initUnit)] || undefined; // undefined in case of invalid unit
    return result;
  };

  this.spellOutUnit = function(unit) {  
    let result = spellOutUnits[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    let result = (initNum * unitConverter[initUnit]).toFixed(5);
    return parseFloat(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    initNum > 1 
      ? initUnit = this.spellOutUnit(initUnit) + 's'
      : initUnit = this.spellOutUnit(initUnit)

    returnNum > 1
      ? returnUnit = this.spellOutUnit(returnUnit) + 's'
      : returnUnit = this.spellOutUnit(returnUnit)
      
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
  
}

const inputSplitter = (input) => {
  let regex = /[a-z]/i
  let index = input.search(regex);
  let result = {
    num: input.slice(0,index),
    unit: input.slice(index)
  };
  return result;
}

const isValidNum = (num) => {
    let numRegex = /^\d+$|^\d+[,.*+-/]\d+$|^\d+([.,]\d+)?[/]\d+([.,]\d+)?$/
    return numRegex.test(num)
      ? Function("return " + num)()
      : undefined
};

module.exports = ConvertHandler;
