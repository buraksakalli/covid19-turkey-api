"use strict";
const HTMLParser = require("node-html-parser");
const fetch = require("node-fetch");
const fs = require("fs");
const populationList = JSON.parse(fs.readFileSync("./population.json"));

const Cases = (data) => {
  this.city = data.city;
  this.covid_cases_by_one_hundred_k = data.covid_cases_by_one_hundred_k;
  this.population = data.population;
  this.cases = data.cases;
};

Cases.weekly = (result) => {
  async function getData(res) {
    let response;
    const url = "https://covid19.saglik.gov.tr/";
    await fetch(url)
      .then((res) => res.text())
      .then((r) => (response = r));
    const DOM = HTMLParser.parse(response);
    const table = DOM.querySelector("tbody");
    parseTable(table, res);
  }

  function parseTable(table, res) {
    let list = [];
    table.childNodes.map((e) => {
      if (e.childNodes[3] !== undefined) {
        const city = e.childNodes[1].text.replace(/\s/g, "");
        const matching = populationList.find((data) => data.city === city);
        const covid_cases_by_one_hundred_k = parseFloat(
          e.childNodes[3].text.replace(/\s/g, "").replace(",", ".")
        );
        const population = JSON.parse(JSON.stringify(matching)).population;
        const cases = parseFloat(
          (population * covid_cases_by_one_hundred_k) / 100000
        ).toFixed(0);

        list = list.concat({
          city,
          covid_cases_by_one_hundred_k,
          population,
          cases,
        });
      }
    });

    console.table(list);
    result({ message: "ok", status: 200, type: "weekly", list });
  }

  getData();
};

module.exports = Cases;
