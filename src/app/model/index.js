"use strict";
const HTMLParser = require("node-html-parser");
const fetch = require("node-fetch");
const fs = require("fs");
var afterLoad = require("after-load");
const populationList = JSON.parse(fs.readFileSync("./population.json"));

const Cases = (data) => {
  this.city = data.city;
  this.covid_cases_by_one_hundred_k = data.covid_cases_by_one_hundred_k;
  this.population = data.population;
  this.cases = data.cases;
};

const clear = (data) => {
  return parseInt(data.replace(/[^A-Za-z0-9]/g, "").replace("SAAT", ""));
};

const clearRate = (data) => {
  return parseFloat(data.replace(/\s/g, "").replace(",", ".").replace("%", ""));
};

Cases.daily = (result) => {
  afterLoad("https://covid19.saglik.gov.tr/", (html, $) => {
    const data = {
      date: $(".full_date").eq(0).text(),
      day: {
        tests: clear($(".bugunku-test-sayisi").eq(0).text()),
        cases: clear($(".bugunku-vaka-sayisi").eq(0).text()),
        patients: clear($(".bugunku-hasta-sayisi").eq(0).text()),
        deads: clear($(".bugunku-vefat-sayisi").eq(0).text()),
        healed: clear($(".bugunku-iyilesen-sayisi").eq(0).text()),
      },
      week: {
        pneumoniaRate: clearRate(
          $(".hafta_hastalarda_zaturre_orani").eq(0).text()
        ),
        bedOccupancyRate: clearRate(
          $(".hafta_yatak_dululuk_orani").eq(0).text()
        ),
        adultIntensiveRate: clearRate(
          $(".hafta_eriskin_yogun_bakim_doluluk_orani").eq(0).text()
        ),
        ventilatorRate: clearRate(
          $(".hafta_ventilator_doluluk_orani").eq(0).text()
        ),
        averageDetectionTime: clear(
          $(".hafta_ortalama_temasli_tespit_suresi").eq(0).text()
        ),
        fillationRate: clearRate($(".hafta_filyasyon_orani").eq(0).text()),
      },
      total: {
        tests: clear($(".toplam-test-sayisi").eq(0).text()),
        cases: clear($(".toplam-hasta-sayisi").eq(0).text()),
        deads: clear($(".toplam-vefat-sayisi").eq(0).text()),
        seriousPatients: clear($(".agir_hasta_sayisi").eq(0).text()),
        healed: clear($(".toplam-iyilesen-hasta-sayisi").eq(0).text()),
      },
    };
    result({ message: "ok", status: 200, type: "total", data });
  });
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
        const cases = parseInt(
          (population * covid_cases_by_one_hundred_k) / 100000
        );

        list = list.concat({
          city,
          covid_cases_by_one_hundred_k,
          population,
          cases,
        });
      }
    });

    result({ message: "ok", status: 200, type: "weekly", list });
  }

  getData();
};

module.exports = Cases;
