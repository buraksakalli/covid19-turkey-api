"use strict";
const Cases = require("../model");

exports.weekly = (req, res) =>
  Cases.weekly((weekly) => res.status(weekly.status).json(weekly));
exports.daily = (req, res) =>
  Cases.daily((daily) => res.status(daily.status).json(daily));
