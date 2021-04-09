const expect = require("chai").expect;
const request = require("request");

const url = {
  weekly: "https://vakalar.herokuapp.com/weekly",
  daily: "https://vakalar.herokuapp.com/daily",
};

describe("Daily Data", () => {
  it("returns status 200", (done) => {
    request(url.daily, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe("Weekly Data", () => {
  it("returns status 200", (done) => {
    request(url.weekly, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it("returns a list contains 81 cities.", (done) => {
    request(url.weekly, (err, res, body) => {
      expect(JSON.parse(res.body).list.length).to.equal(81);
      done();
    });
  });
});
