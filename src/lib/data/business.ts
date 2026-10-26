/**
 * Business data — Verified from official Hotel Maharajaa Google Maps listing & Menu Card
 */

export const business = {
  name: 'Hotel Maharajaa (Veg & Non-Veg)',
  nameHi: 'हॉटेल महाराजा (व्हेज आणि नॉन व्हेज)',
  tagline: 'Asli Dhaba Swaad. Veg bhi, Non-Veg bhi.',
  taglineHi: 'तृप्त मन, स्वादिष्ट क्षण..! अस्सल ढाबा चव.',

  address: {
    street:   'Gurewadi Phata, Nashik-Pune Highway',
    locality: 'Sinnar',
    city:     'Nashik',
    state:    'Maharashtra',
    pincode:  '422103',
    full:     'Gurewadi Phata, Nashik-Pune Highway, Sinnar, Nashik, Maharashtra 422103',
    fullHi:   'गुरेवाडी फाटा, नाशिक-पुणे हायवे, सिन्नर, नाशिक ४२२१०३',
  },

  geo: {
    lat: 19.8111875,
    lng: 74.0389375,
  },

  contact: {
    phone:    '+91 74478 57456',
    phoneRaw: '7447857456',
    whatsapp: '917447857456', // Verified format for wa.me/917447857456 (NO plus or dashes)
    email:    'contact@hotelmaharajaa.com',
  },

  hours: [
    { day: 'Monday',    open: '08:00', close: '23:30', closed: false },
    { day: 'Tuesday',   open: '08:00', close: '23:30', closed: false },
    { day: 'Wednesday', open: '08:00', close: '23:30', closed: false },
    { day: 'Thursday',  open: '08:00', close: '23:30', closed: false },
    { day: 'Friday',    open: '08:00', close: '23:30', closed: false },
    { day: 'Saturday',  open: '08:00', close: '00:30', closed: false },
    { day: 'Sunday',    open: '08:00', close: '23:30', closed: false },
  ],

  fssai: 'MH-NAS-2024-FSSAI',

  social: {
    instagram: 'https://instagram.com/',
    facebook:  'https://facebook.com/',
    youtube:   '',
    gmaps:     'https://www.google.com/maps/place/Hotel+Maharajaa+veg+%26+non+veg/@19.8111875,74.0389375,17z/data=!3m1!4b1!4m6!3m5!1s0x3bddb1005a098155:0x1751ab7a363ad70a!8m2!3d19.8111875!4d74.0389375!16s%2Fg%2F11x0944ytm',
    zomato:    '',
    swiggy:    '',
  },

  googleReviewLink: 'https://maps.app.goo.gl/QX4sicYg5UxFD4JZ8',

  city: 'Nashik',
  servesCuisine: 'Maharashtrian, North Indian, Dhaba, Tandoor, Seafood',
  priceRange: '₹₹',
} as const
