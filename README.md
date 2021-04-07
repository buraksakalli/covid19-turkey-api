# Covid19 Haftalık Vaka API

[![Build Status](https://api.travis-ci.org/buraksakalli/covid19-turkey-api.svg?branch=master&status=started)](https://travis-ci.org/buraksakalli/covid19-turkey-api) [![DeepScan grade](https://deepscan.io/api/teams/7308/projects/16604/branches/359514/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=7308&pid=16604&bid=359514)

## Ne İşe Yarıyor?

Sağlık Bakanlığı'nın günlük ve haftalık olarak yayınladığı verileri projelerinizde kullanmak istediğinizde, liste olarak _JSON_ çıktı üreterek düzgün bir veri elde etmiş oluyorsunuz.

## Kurulum

```bash
npm install
ya da
yarn install
```

## Çalıştırma

```bash
node index.js
```

## API

### GET

- `/weekly`

  - #### Yanıt

  - ```json
    {
      "message": "ok",
      "status": 200,
      "type": "weekly",
      "list": [
        {
          "city": "Adana",
          "covid_cases_by_one_hundred_k": 111.26,
          "population": 2258718,
          "cases": "2513"
        }
        ...
      ]
    }
    ```

- `/daily`

  - #### Yanıt

  - ```json
    {
      "message": "ok",
      "status": 200,
      "type": "total",
      "data": {
        "date: "7 Nisan 2021",
        "day": {
          "tests": 302108,
          "cases": 54740,
          "patients": 2203,
          "deads": 276,
          "healed": 35503
        },
        "week": {
          "pneumoniaRate": 3.1,
          "bedOccupancyRate": 55.7,
          "adultIntensiveRate": 66.5,
          "ventilatorRate": 33,
          "averageDetectionTime": 9,
          "fillationRate": 99.9
        },
        "total": {
          "tests": 40385250,
          "cases": 3633925,
          "deads": 32943,
          "seriousPatients": 2604,
          "healed": 3194978
        }
      }
    }
    ```

## Demo

- <a href="https://vakalar.herokuapp.com/daily">Günlük</a>

- <a href="https://vakalar.herokuapp.com/weekly">Haftalık</a>
