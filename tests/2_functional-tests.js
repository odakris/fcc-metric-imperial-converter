const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  this.timeout(5000);

  suite("Valid Input Test", function() {
    test("Test GET /api/convert with a valid input such as 10L", function(done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=10L")
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            initNum: 10,
            initUnit: "L",
            returnNum: 2.64172,
            returnUnit: "gal",
            string: "10 liters converts to 2.64172 gallons",
          });
          done();
        });
    });
  });

  this.timeout(5000);
  suite("Invalid Input Test", function() {
    test("Test GET /api/convert with an invalid unit input such as 32g", function(done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=32g")
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            error: "invalid unit",
            string: "invalid unit",
          });
          done();
        });
    });

    test("Test GET /api/convert with an invalid number input such as 3/7.2/4kg", function(done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kg")
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            error: "invalid number",
            string: "invalid number",
          });
          done();
        });
    });

    test("Test GET /api/convert with invalid number AND unit input such as 3/7.2/4kilomegagram", function(done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            error: "invalid number and unit",
            string: "invalid number and unit",
          });
          done();
        });
    });
  });

  this.timeout(5000);
  suite("No Input Test", function() {
    test("Test GET /api/convert with no number input such as kg", function(done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=kg")
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {
            initNum: 1,
            initUnit: "kg",
            returnNum: 2.20462,
            returnUnit: "lbs",
            string: "1 kilogram converts to 2.20462 pounds",
          });
          done();
        });
    });
  });
});
