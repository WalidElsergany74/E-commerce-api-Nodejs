# E-commerce API

دليل الـ Request Body والـ Params للإنشاء والتعديل في الـ Category والـ SubCategory والـ Brand والـ Product.

- **Base URL:** `http://localhost:8000/api/v1`
- كل `POST` و`PUT` لازم يكون معاهم الـ header ده: `Content-Type: application/json`

---

## 1) Category

| العملية | Method | URL | Params |
|---|---|---|---|
| إنشاء | `POST` | `/categories` | — |
| تعديل | `PUT` | `/categories/:id` | `id` (category id) |

**Body (إنشاء وتعديل):**

```json
{
  "name": "Electronics",
  "image": "https://example.com/electronics.jpg"
}
```

- `name`: مطلوب، من 3 لـ 32 حرف.
- `image`: اختياري (string). في التعديل لو ما بعتهوش، الصورة القديمة بتفضل زي ما هي.
- الـ `slug` بيتعمل لوحده من الاسم، **ما تبعتهوش**.

---

## 2) Brand

| العملية | Method | URL | Params |
|---|---|---|---|
| إنشاء | `POST` | `/brands` | — |
| تعديل | `PUT` | `/brands/:id` | `id` (brand id) |

**Body (إنشاء وتعديل):**

```json
{
  "name": "Samsung",
  "image": "https://example.com/samsung-logo.png"
}
```

- `name`: مطلوب، من 3 لـ 32 حرف.
- `image`: اختياري (string). في التعديل لو ما بعتهوش، الصورة القديمة بتفضل زي ما هي.
- الـ `slug` بيتعمل لوحده.

---

## 3) SubCategory (مباشرة)

| العملية | Method | URL | Params |
|---|---|---|---|
| إنشاء | `POST` | `/subcategories` | — |
| تعديل | `PUT` | `/subcategories/:id` | `id` (subcategory id) |

**Body (إنشاء وتعديل):**

```json
{
  "name": "Smartphones",
  "category": "6ae1e8d0af2635c3004daf6d"
}
```

- `name`: مطلوب، من 2 لـ 32 حرف.
- `category`: مطلوب، ولازم يكون Mongo ID صحيح.
- في التعديل لازم تبعت الاتنين.

---

## 4) SubCategory عن طريق الـ Category (Nested Route)

الـ `categoryId` بيتاخد من الـ URL، فمش محتاج تبعته في الـ body.

| العملية | Method | URL | Params |
|---|---|---|---|
| إنشاء | `POST` | `/categories/:categoryId/subcategories` | `categoryId` |
| تعديل | `PUT` | `/categories/:categoryId/subcategories/:id` | `categoryId` + `id` (subcategory id) |
| جلب subcategories تبع category | `GET` | `/categories/:categoryId/subcategories` | `categoryId` |

**Body (إنشاء وتعديل):**

```json
{
  "name": "Smartphones"
}
```

- لو بعت `category` في الـ body، هو اللي هيتاخد بدل اللي في الـ URL.

---

## 5) Product

| العملية | Method | URL | Params |
|---|---|---|---|
| إنشاء | `POST` | `/products` | — |
| تعديل | `PUT` | `/products/:id` | `id` (product id) |

**Body (إنشاء):**

```json
{
  "title": "iPhone 15 Pro Max",
  "description": "Apple iPhone 15 Pro Max with A17 Pro chip and titanium design.",
  "stock": 35,
  "price": 1399,
  "priceAfterDiscount": 1299,
  "imageCover": "https://example.com/iphone-cover.jpg",
  "images": [
    "https://example.com/iphone-1.jpg",
    "https://example.com/iphone-2.jpg"
  ],
  "colors": ["black titanium", "white titanium", "blue titanium"],
  "category": "6ae1e8d0af2635c3004daf6d",
  "subcategories": [
    "6ae1e8d0af2635c3004daf77",
    "6ae1e8d0af2635c3004daf78"
  ],
  "brand": "6ae1e8d0af2635c3004daf96"
}
```

| الحقل | النوع | مطلوب؟ | القواعد |
|---|---|---|---|
| `title` | string | ✅ | من 2 لـ 100 حرف |
| `description` | string | ✅ | من 10 لـ 800 حرف |
| `stock` | integer | ✅ | ≥ 0 |
| `price` | number | ✅ | ≥ 0، وأقصى قيمة 200000 |
| `priceAfterDiscount` | number | ❌ | ≥ 0 و**أقل من `price`** |
| `imageCover` | string | ✅ | — |
| `images` | string[] | ❌ | — |
| `colors` | string[] | ❌ | — |
| `category` | Mongo ID | ✅ | لازم يكون موجود |
| `subcategories` | Mongo ID[] | ❌ | من غير تكرار، **وكلها لازم تكون تابعة لنفس الـ `category`** |
| `brand` | Mongo ID | ❌ | Mongo ID صحيح |

- **ما تبعتهمش:** `slug` (بيتعمل من الـ title)، و`sold` و`ratingsAvg` و`ratingCount` (قيم السيرفر).

**Body (تعديل):**

كل الحقول **اختيارية**: ابعت بس الحقول اللي اتغيرت، وبتتطبق عليها نفس قواعد الإنشاء.

```json
{
  "stock": 20,
  "priceAfterDiscount": 1199
}
```

- `priceAfterDiscount`: لو ما بعتّش `price` معاه، بيتقارن بالسعر المتخزن للمنتج.
- `subcategories`: لو ما بعتّش `category` معاها، بيتأكد إنها تابعة للـ category المتخزنة للمنتج.
- لو بتغيّر الـ `category`، ابعت معاها `subcategories` الجديدة التابعة ليها.

---

## شكل الـ Validation Error

الـ status بيكون `400`:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Product name is required",
      "path": "title",
      "location": "body"
    }
  ]
}
```

استخدم `path` عشان تربط كل رسالة بالحقل بتاعها في الفورم.
