const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  this.timeout(5000);
  suite("Valid Number Input", function () {
    test("Testing whole number input", () => {
      assert.strictEqual(
        convertHandler.getNum("13mi"),
        13,
        "Correctly read a whole number input"
      );
    });
    test("Testing decimal number input", () => {
      assert.strictEqual(
        convertHandler.getNum("5.5lbs"),
        5.5,
        "Correctly read decimal number input"
      );
    });
    test("Testing fractional input", () => {
      assert.strictEqual(
        convertHandler.getNum("1/2L"),
        0.5,
        "Correctly read fractional input"
      );
    });
    test("Testing fractional input with a decimal", () => {
      assert.strictEqual(
        convertHandler.getNum("2.5/5gal"),
        0.5,
        "Correctly read fractional input with a decimal"
      );
    });
  });

  this.timeout(5000);
  suite("Invalid Number Input", function () {
    test("Testing error on a double-fraction input", () => {
      assert.isUndefined(
        convertHandler.getNum("3/2/3mi"),
        undefined,
        "Return an error on a double-fraction input"
      );
    });
  });

  this.timeout(5000);
  suite("Default Number Input", function () {
    test("Testing default numerical value", () => {
      assert.strictEqual(
        convertHandler.getNum("L"),
        1,
        "Correctly return 1 when no numerical input is provided"
      );
    });
  });

  this.timeout(5000);
  suite("Valid Unit Input", function () {
    test("Testing each valid unit", () => {
      assert.strictEqual(
        convertHandler.getUnit("2gal"),
        "gal",
        "Correctly read gal unit"
      );
      assert.strictEqual(
        convertHandler.getUnit("2L"),
        "L",
        "Correctly read L unit"
      );
      assert.strictEqual(
        convertHandler.getUnit("2mi"),
        "mi",
        "Correctly read mi unit"
      );
      assert.strictEqual(
        convertHandler.getUnit("2km"),
        "km",
        "Correctly read km unit"
      );
      assert.strictEqual(
        convertHandler.getUnit("2lbs"),
        "lbs",
        "Correctly read lbs unit"
      );
      assert.strictEqual(
        convertHandler.getUnit("2kg"),
        "kg",
        "Correctly read kg unit"
      );
    });
  });

  this.timeout(5000);
  suite("Invalid Unit Input", function () {
    test("Testing error for an invalid input unit", () => {
      assert.isUndefined(
        convertHandler.getReturnUnit("kl"),
        undefined,
        "Correctly return an error for an invalid input unit"
      );
    });
  });

  this.timeout(5000);
  suite("Returned Unit", function () {
    test("Testing return unit for each valid input", () => {
      assert.strictEqual(
        convertHandler.getReturnUnit("gal"),
        "L",
        "Correctly convert return L"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("L"),
        "gal",
        "Correctly convert return gal"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("mi"),
        "km",
        "Correctly convert return km"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("km"),
        "mi",
        "Correctly convert return mi"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("lbs"),
        "kg",
        "Correctly convert return kg"
      );
      assert.strictEqual(
        convertHandler.getReturnUnit("kg"),
        "lbs",
        "Correctly convert return lbs"
      );
    });
  });

  this.timeout(5000);
  suite("Spell-Out", function () {
    test("Testing return spell-out string unit for each valid input unit", () => {
      assert.strictEqual(
        convertHandler.spellOutUnit("gal"),
        "gallon",
        "Correctly convert return L"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("L"),
        "liter",
        "Correctly convert return gal"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("mi"),
        "mile",
        "Correctly convert return km"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("km"),
        "kilometer",
        "Correctly convert return mi"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("lbs"),
        "pound",
        "Correctly convert return kg"
      );
      assert.strictEqual(
        convertHandler.spellOutUnit("kg"),
        "kilogram",
        "Correctly convert return lbs"
      );
    });
  });

  this.timeout(5000);
  suite("Conversion", function () {
    test("Testing gal to L conversion", () => {
      assert.strictEqual(
        convertHandler.convert(1, "gal"),
        3.78541,
        "Correctly convert gal to L"
      );
    });
    test("Testing L to gal conversion", () => {
      assert.strictEqual(
        convertHandler.convert(1, "L"),
        0.26417,
        "Correctly convert L to gal"
      );
    });
    test("Testing mi to km conversion", () => {
      assert.strictEqual(
        convertHandler.convert(1, "mi"),
        1.60934,
        "Correctly convert mi to km"
      );
    });
    test("Testing km to mi conversion", () => {
      assert.strictEqual(
        convertHandler.convert(1, "km"),
        0.62137,
        "Correctly convert km to mi"
      );
    });
    test("Testing lbs to kg conversion", () => {
      assert.strictEqual(
        convertHandler.convert(1, "lbs"),
        0.45359,
        "Correctly convert lbs to kg"
      );
    });
    test("Testing kg to lbs conversion", () => {
      assert.strictEqual(
        convertHandler.convert(1, "kg"),
        2.20462,
        "Correctly convert kg to lbs"
      );
    });
  });
});
