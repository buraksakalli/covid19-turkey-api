"use strict";
const controller = require("../controller");

module.exports = (app) => {
  app.route("/weekly").get(controller.weekly);
  app.route("/daily").get(controller.daily);
  app.route("/vaccine").get(controller.vaccine);
};
