// data/destinations.js
export const destinations = [
  {
    id: 'kakani-lake',
    name: 'Kakani Lake',
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=1331&auto=format&fit=crop',
    description: 'Beautiful high-altitude lake nestled in the mountains, perfect for nature lovers and photography enthusiasts.',
    price: 6500,
    duration: '3D/2N',
    season: 'Mar-Jun, Sep-Nov',
    highlights: [
      'Scenic Lake View',
      'Mountain Trekking',
      'Camping Experience',
      'Bird Watching',
      'Sunrise Views'
    ],
    bestTime: 'March to June, September to November',
    difficulty: 'Easy',
    rating: 4.6,
    reviews: 89,
    includes: ['Accommodation', 'Local Guide', 'Meals', 'Transport'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Check-in',
        description: 'Arrive at base camp, check-in to accommodation, and evening orientation'
      },
      {
        day: 2,
        title: 'Kakani Lake Exploration',
        description: 'Full day exploring the lake and surrounding mountain trails'
      },
      {
        day: 3,
        title: 'Departure',
        description: 'Morning breakfast and return journey'
      }
    ]
  },
  {
    id: 'chakrata',
    name: 'Chakrata',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600&auto=format&fit=crop',
    description: 'Offbeat Himalayan hill station with dense forests, panoramic views, and adventure activities.',
    price: 7000,
    duration: '3D/2N',
    season: 'Apr-Jun, Sep-Dec',
    highlights: [
      'Tiger Falls',
      'Deoban Forest',
      'Mountain Biking',
      'Camping',
      'Sunset Point'
    ],
    bestTime: 'April to June, September to December',
    difficulty: 'Easy',
    rating: 4.5,
    reviews: 67,
    includes: ['Accommodation', 'Local Guide', 'Meals', 'Transport'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Local Sightseeing',
        description: 'Arrive at Chakrata, check-in, and visit local viewpoints'
      },
      {
        day: 2,
        title: 'Tiger Falls & Deoban Trek',
        description: 'Trek to Tiger Falls and explore Deoban forest area'
      },
      {
        day: 3,
        title: 'Departure',
        description: 'Morning breakfast and return journey'
      }
    ]
  },
  {
    id: 'kedarnath',
    name: 'Kedarnath',
    image: 'https://images.unsplash.com/photo-1712388430474-ace0c16051e2?q=80&w=1074&auto=format&fit=crop',
    description: 'Sacred Himalayan pilgrimage site dedicated to Lord Shiva, known for its ancient temple and stunning mountain views.',
    price: 8000,
    duration: '4D/3N',
    season: 'May-Oct',
    highlights: [
      'Kedarnath Temple',
      'Holy Trek',
      'Mountain Views',
      'Spiritual Experience',
      'Gaurikund'
    ],
    bestTime: 'May to October',
    difficulty: 'Moderate',
    rating: 4.9,
    reviews: 234,
    includes: ['Accommodation', 'Pilgrim Guide', 'Meals', 'Transport', 'Pony/Horse Service'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Gaurikund',
        description: 'Arrive at Gaurikund, prepare for the pilgrimage'
      },
      {
        day: 2,
        title: 'Trek to Kedarnath',
        description: 'Scenic trek from Gaurikund to Kedarnath Temple'
      },
      {
        day: 3,
        title: 'Temple Darshan',
        description: 'Early morning temple visit, rituals, and return trek'
      },
      {
        day: 4,
        title: 'Return Journey',
        description: 'Return from Gaurikund to base camp'
      }
    ]
  },
  {
    id: 'tungnath',
    name: 'Tungnath',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600&auto=format&fit=crop',
    description: 'Highest Shiva temple in the world, offering breathtaking views of the Himalayas and a memorable trekking experience.',
    price: 6000,
    duration: '4D/3N',
    season: 'May-Oct',
    highlights: [
      'Highest Shiva Temple',
      'Chandrashila Peak',
      'Panoramic Himalayan Views',
      'Trekking Adventure',
      'Spiritual Experience'
    ],
    bestTime: 'May to October',
    difficulty: 'Moderate',
    rating: 4.8,
    reviews: 178,
    includes: ['Accommodation', 'Expert Trek Guide', 'All Meals', 'Transport', 'Trekking Gear'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Rishikesh',
        description: 'Arrive at Rishikesh, check-in to hotel, evening orientation'
      },
      {
        day: 2,
        title: 'Drive to Sari Village & Trek to Tungnath',
        description: 'Scenic drive to Sari village and trek to Tungnath Temple'
      },
      {
        day: 3,
        title: 'Chandrashila Summit & Return',
        description: 'Early morning trek to Chandrashila Peak for sunrise, then return trek'
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Drive back to Rishikesh for departure'
      }
    ]
  }
];