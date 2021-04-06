# Covid19 Haftalık Vaka API

## Ne İşe Yarıyor?

Sağlık Bakanlığı'nın haftalık olarak yayınladığı verileri projelerinizde kullanmak istediğinizde, liste olarak _JSON_ çıktı üreterek düzgün bir veri elde etmiş oluyorsunuz.

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

## Demo

<a href="https://vakalar.herokuapp.com/weekly">Demo</a>

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
