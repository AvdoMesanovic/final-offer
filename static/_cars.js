let cars = [
  {
    vin: '1GD372CG4D1122188',
    brand: 'Toyota',
    model: 'Highlander',
    year: 2001,
    price: 4500,
    color: 'Red',
    images: [
      'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/highlander/3T3/2.png?fm=png&bg=fff',
      'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/highlander/3T3/3.png?fm=png&bg=fff',
      'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/highlander/3T3/4.png?fm=png&bg=fff',
      'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/highlander/3T3/1.png?fm=png&bg=fff',
    ],
    completion: 0,
    dealer: '5TaXz4IdVhb5649hHuJkuBvQzkR2',
  },
  {
    vin: '2C3CCAAG4EH378917',
    brand: 'Honda',
    model: 'Accord',
    year: 1995,
    price: 5000,
    color: 'Black',
    images: [
      'https://automobiles.honda.com/platform/api/v4/images/exterior/02?config=M:CV1F3MEW$EC:NH-731P$HC:undefined$IC:BK$O:$F:FIFS$ECC:BK$ECX:&width=1400',
      'https://automobiles.honda.com/platform/api/v4/images/exterior/04?config=M:CV1F3MEW$EC:NH-731P$HC:undefined$IC:BK$O:$F:FIFS$ECC:BK$ECX:&width=1400',
      'https://automobiles.honda.com/platform/api/v4/images/exterior/10?config=M:CV1F3MEW$EC:NH-731P$HC:undefined$IC:BK$O:$F:FIFS$ECC:BK$ECX:&width=1400',
      'https://www.vehiclehistory.com/evox_color_compressed/honda/accord/2001/0216/honda-accord-2001-001-0216-BK-768.jpg',
    ],
    completion: 0,
    dealer: '5TaXz4IdVhb5649hHuJkuBvQzkR2',
  },
  {
    vin: '1C3CDFBAXDD171156',
    brand: 'Saturn',
    model: 'Outlook',
    year: 2009,
    price: 7000,
    color: 'Red',
    images: [
      'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/5545/2009-Saturn-Outlook-front-angle6_5545_116_640x480.jpg',
      'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/5545/2009-Saturn-Outlook-front-angle1_5545_046_640x480.jpg',
      'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/5545/2009-Saturn-Outlook-wheel_5545_042_640x480.jpg',
      'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/5545/2009-Saturn-Outlook-front-view_5545_118_640x480.jpg',
      'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/5545/2009-Saturn-Outlook-rear-angle_5545_048_640x480.jpg',
      'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/5545/2009-Saturn-Outlook-headlight_5545_043_640x480.jpg',
      'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/5545/2009-Saturn-Outlook-overhead_5545_117_640x480.jpg',
      'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/5545/2009-Saturn-Outlook-side_5545_037_640x480.jpg',
      'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/5545/2009-Saturn-Outlook-front-angle6_5545_116_640x480.jpg'
    ],
    completion: 0,
    dealer: '5TaXz4IdVhb5649hHuJkuBvQzkR2',
  },
  {
    vin: '2T1BURHE1EC160919',
    brand: 'Honda',
    model: 'CR-V',
    year: 2019,
    price: 20000,
    color: 'Blue',
    images: [
      'https://automobiles.honda.com/platform/api/v4/images/exterior/09?config=M:RW1H7MEW$EC:B-593M$HC:undefined$IC:BK$O:CRV0021044,CRV0021066,CRV0021068,CRV0021054,CRV0021251,CRV0021003$F:FIFS$ECC:BT$ECX:&width=1400',
      'https://automobiles.honda.com/platform/api/v4/images/exterior/04?config=M:RW1H7MEW$EC:B-593M$HC:undefined$IC:BK$O:CRV0021044,CRV0021066,CRV0021068,CRV0021054,CRV0021251,CRV0021003$F:FIFS$ECC:BT$ECX:&width=1400',
      'https://automobiles.honda.com/platform/api/v4/images/exterior/02?config=M:RW1H7MEW$EC:B-593M$HC:undefined$IC:BK$O:CRV0021044,CRV0021066,CRV0021068,CRV0021054,CRV0021251,CRV0021003$F:FIFS$ECC:BT$ECX:&width=1400'
    ],
    completion: 0,
    dealer: '5TaXz4IdVhb5649hHuJkuBvQzkR2',
  },
  {
    vin: "1GCVKREC3EZ181346",
    brand: "Audi",
    model: "Sport",
    year: 2021,
    price: 32000,
    color: "Silver",
    images: [
      "https://atcimages.kbb.com/borderscaler/800/600/2d363e/hn/c/0e9a39882e4a445da7a2c7ba3363579a.jpg",
      "https://atcimages.kbb.com/borderscaler/800/600/2d363e/hn/c/2414729ee1cf4e8d8f12f463c120b85a.jpg"
    ],
    completion: 0,
    dealer: '5TaXz4IdVhb5649hHuJkuBvQzkR2',
  },
  {
    vin: "JTDKDTB35E1584922",
    brand: "Ford",
    model: "F-150",
    year: 2016,
    price: 14000,
    color: "Black",
    images: [
      "https://www.ford.com/is/image/content/dam/vdm_ford/live/en_us/ford/nameplate/f-150/2021/collections/dm/21_426bf1c_v1.tif?croppathe=1_3x2&wid=900",
      "https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/f-150/2021/collections/3-2/21_frd_f150_scrw_5_5ft_xlt_agbl_ps34_356x180.png/_jcr_content/renditions/cq5dam.web.1280.1280.png"
    ],
    completion: 0,
    dealer: '5TaXz4IdVhb5649hHuJkuBvQzkR2',
  },
  {
    vin: "3VWSG71K15M689805",
    brand: "Nissan",
    model: "Altima",
    year: 2017,
    price: 18000,
    color: "Red",
    images: [
      "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/rogue/2021/overview/2021-nissan-rogue-in-two-tone-gray-black.png",
      "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/rogue/Vehicle%20Profile%20Assets/2021/version-2021-rogue-platinum-fwd-superblack.png"
    ],
    completion: 0,
    dealer: '5TaXz4IdVhb5649hHuJkuBvQzkR2',
  }
];
export default cars;
