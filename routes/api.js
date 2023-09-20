"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

const { units } = require("../units");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  const print = (req, res) => {
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);

    // Handle unit cases
    if (initUnit === "l") {
      initUnit = initUnit.toUpperCase();
    } else if (initUnit !== "L") {
      initUnit = initUnit.toLowerCase();
    }

    // Check for valid number and valid unit
    if (!initNum && !units[initUnit]) {
      res.send({
        error: "invalid number and unit",
        string: "invalid number and unit",
      });
      // Check for valid number
    } else if (!initNum) {
      res.send({
        error: "invalid number",
        string: "invalid number",
      });
      // Check for valid unit
    } else if (!units[initUnit]) {
      res.send({
        error: "invalid unit",
        string: "invalid unit",
      });
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.send({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string,
    });
  };

  app.route("/api/convert").get(print);
};
