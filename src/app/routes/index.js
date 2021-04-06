"use strict";
const controller = require("../controller");

module.exports = (app) => {
  app.route("/weekly").get(controller.weekly);
};
