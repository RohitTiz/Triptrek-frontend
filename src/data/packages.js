// data/packages.js
export const packages = [
  {
    id: 'char-dham-package',
    name: 'Char Dham Yatra Package',
    description: 'Complete Char Dham pilgrimage covering Yamunotri, Gangotri, Kedarnath, and Badrinath. A spiritual journey of a lifetime.',
    price: 25000,
    duration: '12D/11N',
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=1331&auto=format&fit=crop',
    features: [
      'Visit all 4 Dhams',
      'Expert Pilgrim Guide',
      'Comfortable Accommodation',
      'Private Transport',
      'All Permits Included',
      'Daily Meals'
    ],
    rating: 4.9,
    reviews: 156,
    popular: true,
    inclusions: [
      'Accommodation (Hotels/Camps)',
      'All Meals (Breakfast, Lunch, Dinner)',
      'Experienced Pilgrim Guide',
      'Private Transport from Haridwar',
      'All Temple Entry Fees',
      'Pony/Horse Service at Kedarnath',
      '24/7 Support Team',
      'Medical First Aid Kit'
    ],
    exclusions: [
      'Personal Expenses',
      'Travel Insurance',
      'Helicopter Services (Optional Extra)',
      'Porter Services',
      'Anything not mentioned in inclusions'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Haridwar',
        description: 'Arrive at Haridwar, check-in to hotel, evening Ganga Aarti at Har Ki Pauri'
      },
      {
        day: 2,
        title: 'Drive to Barkot',
        description: 'Scenic drive to Barkot, enroute visit Mussoorie and Kempty Falls'
      },
      {
        day: 3,
        title: 'Yamunotri Temple',
        description: 'Trek to Yamunotri Temple, darshan, and return to Barkot'
      },
      {
        day: 4,
        title: 'Drive to Uttarkashi',
        description: 'Journey to Uttarkashi, visit Vishwanath Temple'
      },
      {
        day: 5,
        title: 'Gangotri Temple',
        description: 'Visit Gangotri Temple and sacred ghats, return to Uttarkashi'
      },
      {
        day: 6,
        title: 'Drive to Guptkashi',
        description: 'Travel through beautiful mountain roads to Guptkashi'
      },
      {
        day: 7,
        title: 'Trek to Kedarnath',
        description: 'Drive to Gaurikund and start trek to Kedarnath Temple'
      },
      {
        day: 8,
        title: 'Kedarnath Darshan',
        description: 'Early morning temple visit, rituals, and return trek to Gaurikund'
      },
      {
        day: 9,
        title: 'Drive to Badrinath',
        description: 'Journey to Badrinath via Joshimath, enroute visit Narsingh Temple'
      },
      {
        day: 10,
        title: 'Badrinath Temple',
        description: 'Visit Badrinath Temple, Tapt Kund, Mana Village (Last Indian Village)'
      },
      {
        day: 11,
        title: 'Return to Haridwar',
        description: 'Drive back to Haridwar through scenic mountain routes'
      },
      {
        day: 12,
        title: 'Departure',
        description: 'Morning breakfast and departure from Haridwar with blessings'
      }
    ]
  }
];