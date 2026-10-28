// Relationships are written by name here; seeder.js resolves them to ObjectIds.

exports.categories = [
  {
    name: 'Electronics',
    subcategories: [
      'Smartphones',
      '5G Phones',
      'Laptops',
      'Ultrabooks',
      'Headphones',
      'Wireless Audio'
    ]
  },
  {
    name: "Men's Fashion",
    subcategories: [
      'Men T-Shirts',
      'Men Jeans',
      'Men Shoes',
      'Men Activewear',
      'Men Casual Wear'
    ]
  },
  {
    name: "Women's Fashion",
    subcategories: [
      'Dresses',
      'Evening Wear',
      'Women Bags',
      'Women Accessories',
      'Women Shoes',
      'Women Sneakers'
    ]
  },
  {
    name: 'Home & Kitchen',
    subcategories: [
      'Cookware',
      'Kitchen Essentials',
      'Kitchen Appliances',
      'Furniture',
      'Storage & Organization',
      'Lighting',
      'Home Decor',
      'Plants & Planters'
    ]
  },
  {
    name: 'Beauty',
    subcategories: [
      'Skincare',
      'Anti-Aging',
      'Makeup',
      'Face Makeup',
      'Hair Care',
      'Shampoo & Conditioner',
      'Hair Styling Tools',
      'Beauty Sets'
    ]
  },
  {
    name: 'Sports',
    subcategories: [
      'Fitness Equipment',
      'Strength Training',
      'Yoga',
      'Sportswear',
      'Running',
      'Outdoor Gear',
      'Hiking'
    ]
  },
  {
    name: 'Appliances',
    subcategories: [
      'Refrigerators',
      'Washing Machines',
      'Large Appliances',
      'Energy Efficient',
      'Small Appliances',
      'Garment Care'
    ]
  },
  {
    name: 'Gaming',
    subcategories: [
      'Consoles',
      'Video Games',
      'PlayStation',
      'Gaming Accessories',
      'Controllers',
      'Gaming Monitors'
    ]
  },
  {
    name: 'Televisions',
    subcategories: [
      'Smart TVs',
      '4K TVs',
      'OLED TVs',
      'Soundbars',
      'Home Theater',
      'TV Accessories'
    ]
  },
  {
    name: 'Watches',
    subcategories: [
      'Smart Watches',
      'Fitness Trackers',
      'Analog Watches',
      'Sports Watches',
      'Watch Straps',
      'Watch Accessories'
    ]
  }
];

exports.brands = [
  'Samsung',
  'Apple',
  'Sony',
  'Panasonic',
  'Nike',
  'Adidas',
  'Zara',
  'IKEA',
  'Philips',
  "L'Oreal"
];

const img = (seed) => `https://picsum.photos/seed/${seed}/600/600`;

// [title, category, subcategories[], brand, price, priceAfterDiscount|null, stock, sold, ratingsAvg, ratingCount, colors[]]
const rows = [
  [
    'Samsung Galaxy S24 Ultra',
    'Electronics',
    ['Smartphones', '5G Phones'],
    'Samsung',
    1299,
    1199,
    40,
    120,
    4.8,
    310,
    ['titanium black', 'titanium gray', 'titanium violet', 'titanium yellow']
  ],
  [
    'iPhone 15 Pro Max',
    'Electronics',
    ['Smartphones', '5G Phones'],
    'Apple',
    1399,
    null,
    35,
    200,
    4.9,
    540,
    ['black titanium', 'white titanium', 'blue titanium', 'natural titanium']
  ],
  [
    'MacBook Air M3 13-inch',
    'Electronics',
    ['Laptops', 'Ultrabooks'],
    'Apple',
    1199,
    1099,
    20,
    75,
    4.8,
    190,
    ['midnight', 'starlight', 'silver', 'space gray']
  ],
  [
    'Sony WH-1000XM5 Headphones',
    'Electronics',
    ['Headphones', 'Wireless Audio'],
    'Sony',
    399,
    349,
    60,
    260,
    4.7,
    420,
    ['black', 'silver', 'midnight blue']
  ],
  [
    'Galaxy Book4 Pro with Buds',
    'Electronics',
    ['Laptops', 'Ultrabooks', 'Wireless Audio'],
    'Samsung',
    1599,
    1449,
    15,
    30,
    4.5,
    64,
    ['moonstone gray', 'platinum silver']
  ],

  [
    'Nike Dri-FIT Running T-Shirt',
    "Men's Fashion",
    ['Men T-Shirts', 'Men Activewear'],
    'Nike',
    35,
    28,
    150,
    340,
    4.5,
    210,
    ['black', 'white', 'red', 'navy']
  ],
  [
    'Zara Slim Fit Denim Jeans',
    "Men's Fashion",
    ['Men Jeans', 'Men Casual Wear'],
    'Zara',
    59,
    null,
    90,
    160,
    4.2,
    98,
    ['light blue', 'dark blue', 'black']
  ],
  [
    'Adidas Ultraboost Light Shoes',
    "Men's Fashion",
    ['Men Shoes', 'Men Activewear'],
    'Adidas',
    190,
    159,
    70,
    230,
    4.7,
    305,
    ['white', 'black', 'gray']
  ],
  [
    'Zara Basic Cotton Tee Pack',
    "Men's Fashion",
    ['Men T-Shirts', 'Men Casual Wear'],
    'Zara',
    29,
    24,
    200,
    410,
    4.1,
    150,
    ['white', 'gray', 'navy', 'black']
  ],
  [
    'Nike Tee and Jogger Set',
    "Men's Fashion",
    ['Men T-Shirts', 'Men Activewear', 'Men Casual Wear'],
    'Nike',
    95,
    80,
    45,
    60,
    4.3,
    41,
    ['black', 'gray', 'navy']
  ],

  [
    'Zara Satin Midi Dress',
    "Women's Fashion",
    ['Dresses', 'Evening Wear'],
    'Zara',
    79,
    65,
    55,
    140,
    4.4,
    120,
    ['green', 'black', 'beige']
  ],
  [
    'Zara Leather Shoulder Bag',
    "Women's Fashion",
    ['Women Bags', 'Women Accessories'],
    'Zara',
    69,
    null,
    40,
    90,
    4.3,
    77,
    ['brown', 'black', 'tan']
  ],
  [
    'Nike Air Max 270 Women',
    "Women's Fashion",
    ['Women Shoes', 'Women Sneakers'],
    'Nike',
    160,
    135,
    65,
    210,
    4.6,
    260,
    ['pink', 'white', 'black']
  ],
  [
    'Adidas Stan Smith Women',
    "Women's Fashion",
    ['Women Shoes', 'Women Sneakers'],
    'Adidas',
    100,
    85,
    80,
    300,
    4.7,
    380,
    ['white/green', 'white/navy', 'white/pink']
  ],
  [
    'Zara Dress and Clutch Set',
    "Women's Fashion",
    ['Dresses', 'Evening Wear', 'Women Bags'],
    'Zara',
    120,
    99,
    25,
    35,
    4.2,
    22,
    ['red', 'black', 'emerald']
  ],

  [
    'IKEA 365+ Cookware Set',
    'Home & Kitchen',
    ['Cookware', 'Kitchen Essentials'],
    'IKEA',
    89,
    75,
    50,
    130,
    4.4,
    140,
    ['stainless steel', 'black']
  ],
  [
    'IKEA KALLAX Shelf Unit',
    'Home & Kitchen',
    ['Furniture', 'Storage & Organization'],
    'IKEA',
    79,
    null,
    30,
    260,
    4.6,
    520,
    ['white', 'black-brown', 'white stained oak']
  ],
  [
    'IKEA FEJKA Artificial Plant',
    'Home & Kitchen',
    ['Home Decor', 'Plants & Planters'],
    'IKEA',
    15,
    12,
    120,
    380,
    4.3,
    210,
    ['green', 'green/white']
  ],
  [
    'Philips Airfryer XXL',
    'Home & Kitchen',
    ['Kitchen Appliances', 'Cookware'],
    'Philips',
    299,
    249,
    35,
    170,
    4.7,
    290,
    ['black', 'white']
  ],
  [
    'IKEA Side Table with Lamp',
    'Home & Kitchen',
    ['Furniture', 'Lighting', 'Home Decor'],
    'IKEA',
    59,
    49,
    40,
    55,
    4.1,
    38,
    ['white', 'black-brown', 'birch']
  ],

  [
    "L'Oreal Revitalift Serum",
    'Beauty',
    ['Skincare', 'Anti-Aging'],
    "L'Oreal",
    30,
    25,
    140,
    450,
    4.5,
    610,
    []
  ],
  [
    "L'Oreal Infallible Foundation",
    'Beauty',
    ['Makeup', 'Face Makeup'],
    "L'Oreal",
    16,
    null,
    180,
    520,
    4.3,
    700,
    ['ivory', 'beige', 'sand', 'caramel', 'espresso']
  ],
  [
    "L'Oreal Elvive Shampoo",
    'Beauty',
    ['Hair Care', 'Shampoo & Conditioner'],
    "L'Oreal",
    9,
    7,
    250,
    800,
    4.4,
    950,
    []
  ],
  [
    'Philips Hair Dryer 5000',
    'Beauty',
    ['Hair Care', 'Hair Styling Tools'],
    'Philips',
    59,
    49,
    60,
    140,
    4.5,
    175,
    ['black', 'pink', 'white']
  ],
  [
    "L'Oreal Glow Skin and Makeup Kit",
    'Beauty',
    ['Skincare', 'Makeup', 'Beauty Sets'],
    "L'Oreal",
    45,
    38,
    70,
    95,
    4.2,
    66,
    ['light', 'medium', 'deep']
  ],

  [
    'Adidas Adjustable Dumbbells',
    'Sports',
    ['Fitness Equipment', 'Strength Training'],
    'Adidas',
    220,
    189,
    25,
    60,
    4.6,
    88,
    ['black', 'gray']
  ],
  [
    'Nike Pro Training Leggings',
    'Sports',
    ['Sportswear', 'Yoga'],
    'Nike',
    55,
    45,
    110,
    330,
    4.5,
    260,
    ['black', 'navy', 'burgundy']
  ],
  [
    'Adidas Terrex Hiking Backpack',
    'Sports',
    ['Outdoor Gear', 'Hiking'],
    'Adidas',
    120,
    null,
    40,
    70,
    4.4,
    59,
    ['gray', 'olive', 'black']
  ],
  [
    'Nike Yoga Mat 5mm',
    'Sports',
    ['Fitness Equipment', 'Yoga'],
    'Nike',
    40,
    32,
    90,
    210,
    4.3,
    140,
    ['purple', 'black', 'teal']
  ],
  [
    'Adidas Trail Running Kit',
    'Sports',
    ['Sportswear', 'Running', 'Outdoor Gear'],
    'Adidas',
    150,
    125,
    30,
    40,
    4.4,
    31,
    ['black', 'orange', 'olive']
  ],

  [
    'Samsung Bespoke French Door Fridge',
    'Appliances',
    ['Refrigerators', 'Large Appliances'],
    'Samsung',
    2499,
    2199,
    10,
    25,
    4.6,
    48,
    ['white', 'navy', 'beige', 'stainless steel']
  ],
  [
    'Panasonic Prime+ Refrigerator',
    'Appliances',
    ['Refrigerators', 'Large Appliances', 'Energy Efficient'],
    'Panasonic',
    2799,
    null,
    8,
    18,
    4.7,
    36,
    ['stainless steel', 'black steel']
  ],
  [
    'Panasonic Inverter Washer',
    'Appliances',
    ['Washing Machines', 'Large Appliances', 'Energy Efficient'],
    'Panasonic',
    899,
    799,
    15,
    65,
    4.6,
    120,
    ['white', 'silver']
  ],
  [
    'Samsung EcoBubble Washer',
    'Appliances',
    ['Washing Machines', 'Large Appliances', 'Energy Efficient'],
    'Samsung',
    749,
    679,
    18,
    50,
    4.5,
    95,
    ['white', 'black', 'silver']
  ],
  [
    'Philips Steam Iron and Kettle',
    'Appliances',
    ['Small Appliances', 'Garment Care'],
    'Philips',
    89,
    75,
    60,
    140,
    4.3,
    110,
    ['blue', 'white']
  ],

  [
    'Sony PlayStation 5 Slim',
    'Gaming',
    ['Consoles', 'PlayStation'],
    'Sony',
    499,
    449,
    25,
    380,
    4.9,
    820,
    ['white', 'midnight black']
  ],
  [
    'Sony PS5 Gran Turismo 7',
    'Gaming',
    ['Video Games', 'PlayStation'],
    'Sony',
    69,
    49,
    100,
    260,
    4.7,
    340,
    []
  ],
  [
    'Sony DualSense Controller',
    'Gaming',
    ['Gaming Accessories', 'Controllers', 'PlayStation'],
    'Sony',
    75,
    65,
    120,
    450,
    4.8,
    610,
    ['white', 'midnight black', 'cosmic red', 'starlight blue', 'nova pink']
  ],
  [
    'Samsung Odyssey G7 Monitor',
    'Gaming',
    ['Gaming Accessories', 'Gaming Monitors'],
    'Samsung',
    699,
    599,
    20,
    85,
    4.6,
    130,
    ['black']
  ],
  [
    'Sony PS5 Bundle with Spider-Man',
    'Gaming',
    ['Consoles', 'Video Games', 'PlayStation'],
    'Sony',
    559,
    519,
    15,
    120,
    4.8,
    210,
    ['white']
  ],

  [
    'Samsung 65 Neo QLED 4K TV',
    'Televisions',
    ['Smart TVs', '4K TVs'],
    'Samsung',
    1799,
    1599,
    12,
    70,
    4.7,
    150,
    ['black']
  ],
  [
    'Panasonic OLED 55-inch TV',
    'Televisions',
    ['Smart TVs', '4K TVs', 'OLED TVs'],
    'Panasonic',
    1499,
    1349,
    14,
    95,
    4.8,
    230,
    ['black']
  ],
  [
    'Sony Bravia XR 55 4K TV',
    'Televisions',
    ['Smart TVs', '4K TVs'],
    'Sony',
    1399,
    null,
    10,
    60,
    4.7,
    120,
    ['black']
  ],
  [
    'Panasonic SC-HTB Soundbar',
    'Televisions',
    ['Soundbars', 'Home Theater'],
    'Panasonic',
    999,
    849,
    20,
    45,
    4.6,
    80,
    ['black', 'silver']
  ],
  [
    'Philips TV Wall Mount and HDMI',
    'Televisions',
    ['TV Accessories', 'Home Theater'],
    'Philips',
    49,
    39,
    80,
    160,
    4.2,
    90,
    ['black']
  ],

  [
    'Apple Watch Series 9',
    'Watches',
    ['Smart Watches', 'Fitness Trackers'],
    'Apple',
    399,
    369,
    45,
    290,
    4.8,
    470,
    ['midnight', 'starlight', 'silver', 'pink', 'red']
  ],
  [
    'Samsung Galaxy Watch6 Classic',
    'Watches',
    ['Smart Watches', 'Fitness Trackers'],
    'Samsung',
    399,
    329,
    40,
    150,
    4.6,
    230,
    ['black', 'silver']
  ],
  [
    'Adidas Originals Analog Watch',
    'Watches',
    ['Analog Watches', 'Sports Watches'],
    'Adidas',
    89,
    75,
    55,
    70,
    4.2,
    58,
    ['black', 'white', 'gold']
  ],
  [
    'Apple Watch Sport Loop Strap',
    'Watches',
    ['Watch Straps', 'Watch Accessories'],
    'Apple',
    49,
    null,
    150,
    330,
    4.6,
    260,
    ['blue', 'green', 'pink', 'midnight']
  ],
  [
    'Nike Smart Watch with Band',
    'Watches',
    ['Smart Watches', 'Fitness Trackers', 'Watch Straps'],
    'Nike',
    129,
    109,
    35,
    45,
    4.1,
    33,
    ['black', 'volt', 'white']
  ]
];

exports.products = rows.map(
  (
    [
      title,
      category,
      subcategories,
      brand,
      price,
      priceAfterDiscount,
      stock,
      sold,
      ratingsAvg,
      ratingCount,
      colors
    ],
    i
  ) => ({
    title,
    description: `${title} by ${brand}. A high quality product from our ${category} collection, built to last and loved by our customers.`,
    category,
    subcategories,
    brand,
    price,
    ...(priceAfterDiscount !== null && { priceAfterDiscount }),
    stock,
    sold,
    ratingsAvg,
    ratingCount,
    colors,
    imageCover: img(`product-${i + 1}`),
    images: [img(`product-${i + 1}-a`), img(`product-${i + 1}-b`)]
  })
);
