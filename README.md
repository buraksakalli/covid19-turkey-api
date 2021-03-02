# Covid19 Haftalık Vaka

## Ne İşe Yarıyor?

Sağlık Bakanlığı'nın haftalık olarak yayınladığı verileri projelerinizde kullanmak istediğinizde, liste olarak _JSON_ çıktı üreterek düzgün bir veri elde etmiş oluyorsunuz.

### Örnek Çıktı

![covid19-haftalik-vaka](https://user-images.githubusercontent.com/10114716/109715295-8889e400-7bb4-11eb-9af2-dc06d9f31756.png)

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

## Sonuç

- Şehir
- Yüzbindeki vaka sayısı
- Nüfus
- Vaka
  - `population * covid_cases_by_one_hundred_k / 100000`

bilgilerini içeren bir obje dizisi elde ediyorsunuz.

### Örnek

```json
{
  "city": "Ankara",
  "covid_cases_by_one_hundred_k": 39.84,
  "population": 5663322,
  "cases": 2256
}
```
