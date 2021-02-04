export default () => ({
  authUser: null,
  quests: [{
      id: 0,
      title: "Welcome to the Learning Tree Farm",
      author: "Learning Tree Farm",
      description: "Come on down to the Learning Tree Farm and we'll show you around all the places you can explore!",
      image: "welcome-sign.png",
      categories: ["family-friendly", "outdoor", "educational"],
      // favorite: true,
      featured: true,
      // mode: null,
      region: 0,
      objectives: [0, 1, 2, 3, 4, 5],
      locations: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      entries: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      items: [0],
    },
    {
      id: 1,
      title: "Celebrate the Spring Equinox",
      author: "Learning Tree Farm",
      description: "Celebrate the dawn of a new year by meeting all of the newborn animals and their proud parents.",
      image: "baby-goats.png",
      categories: ["family-friendly", "outdoor", "educational"],
      // favorite: false,
      featured: true,
      // mode: null,
      region: 0,
      objectives: [0, 1, 2, 3, 4, 5],
      locations: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      entries: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      items: [0],
    },
    {
      id: 2,
      title: "How Does Your Garden Grow?",
      author: "Learning Tree Farm",
      description: "Find out how the Learning Tree Farm uses centuries old techniques to help the garden thrive.",
      image: "garden.png",
      categories: ["family-friendly", "outdoor", "educational"],
      // favorite: false,
      featured: true,
      // mode: null,
      region: 0,
      objectives: [0, 1, 2, 3, 4, 5],
      locations: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      entries: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      items: [0],
    },
    {
      id: 3,
      title: "The Great Sheep Escape",
      author: "Learning Tree Farm",
      description: "Help the Learning Tree find all the missing sheep which are freely roaming around the farm.",
      image: "sheep.png",
      categories: ["family-friendly", "outdoor", "adventure"],
      // favorite: false,
      featured: true,
      // mode: null,
      region: 0,
      objectives: [0, 1, 2, 3, 4, 5],
      locations: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      entries: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      items: [0],
    }
  ],
  regions: [{
    id: 0,
    name: "Learning Tree Farm",
    position: {
      lat: 39.697556273873595,
      lng: -84.30619228020171,
    },
    zoom: 18
  }],
  objectives: [{
      id: 0,
      name: "Visit the Century House",
      description: "",
      isPrimary: true,
      isComplete: false,
    },
    {
      id: 1,
      name: "Check out the Play House",
      description: "",
      isPrimary: false,
      isComplete: false,
    },
    {
      id: 2,
      name: "Enter the Pavilion",
      description: "",
      isPrimary: true,
      isComplete: false,
    },
    {
      id: 3,
      name: "Walk through the Tobacco Barn",
      description: "",
      isPrimary: true,
      isComplete: false,
    },
    {
      id: 4,
      name: "Tour the Garden",
      description: "",
      isPrimary: true,
      isComplete: false,
    },
    {
      id: 5,
      name: "Walk through the Bank Barn",
      description: "",
      isPrimary: true,
      isComplete: false,
    },
  ],
  markers: {
    default: 'marker.png',
    barn: 'barn.png',
    house: 'house.png',
    school: 'school.png',
    road: 'road.png',
    trail: 'trail.png',
    parking: 'parking.png',
    corn: 'corn.png',
    tractor: 'tractor.png',
    info: 'info.png',
    restroom: 'restroom.png',
    smog: 'smog.png',
    houseOutline: 'house-outline.png',
    fire: 'fire.png',
    gate: 'gate.png'
  },
  locations: [{
      id: 0,
      name: "Main Entrance",
      isLandmark: true,
      position: {
        lat: 39.69705252378522,
        lng: -84.30895915916378,
      },
      image: null,
      marker: "road.png",
      entries: [],
    },
    {
      id: 1,
      name: "Event Parking Lot",
      isLandmark: true,
      position: {
        lat: 39.69669665514492,
        lng: -84.30802298163705,
      },
      image: null,
      marker: "parking.png",
      entries: [],
    },
    {
      id: 2,
      name: "Parking Lot",
      isLandmark: true,
      position: {
        lat: 39.69683532141846,
        lng: -84.30663546124721,
      },
      image: null,
      marker: "parking.png",
      entries: [],
    },
    {
      id: 3,
      name: "Information",
      isLandmark: true,
      position: {
        lat: 39.69698503159554,
        lng: -84.30554298831034,
      },
      image: null,
      marker: "info.png",
      entries: [],
    },
    {
      id: 4,
      name: "Century House",
      isLandmark: true,
      position: {
        lat: 39.697199918787966,
        lng: -84.30579653342916,
      },
      image: null,
      marker: "house.png",
      entries: [],
    },
    {
      id: 5,
      name: "Restrooms",
      isLandmark: true,
      position: {
        lat: 39.69731220085636,
        lng: -84.3058882373532,
      },
      image: null,
      marker: "restroom.png",
      entries: [],
    },
    {
      id: 6,
      name: "Smokehouse",
      isLandmark: true,
      position: {
        lat: 39.69733858404809,
        lng: -84.30582683559051,
      },
      image: null,
      marker: "smog.png",
      entries: [],
    },
    {
      id: 7,
      name: "Bank Barn",
      isLandmark: true,
      position: {
        lat: 39.697139635581166,
        lng: -84.30512614831034,
      },
      image: null,
      marker: "barn.png",
      entries: [],
    },
    {
      id: 8,
      name: "Tobacco Barn",
      isLandmark: true,
      position: {
        lat: 39.69733956075378,
        lng: -84.30457802856016,
      },
      image: null,
      marker: "barn.png",
      entries: [],
    },
    {
      id: 9,
      name: "Chicken Coop",
      isLandmark: true,
      position: {
        lat: 39.69743149695268,
        lng: -84.30468044539928,
      },
      image: null,
      marker: "gate.png",
      entries: [],
    },
    {
      id: 10,
      name: "Garden",
      isLandmark: true,
      position: {
        lat: 39.69697765198743,
        lng: -84.30461785733092,
      },
      image: null,
      marker: "corn.png",
      entries: [],
    },
    {
      id: 11,
      name: "Play House & Tractor",
      isLandmark: true,
      position: {
        lat: 39.69764999930142,
        lng: -84.30560789744072,
      },
      image: null,
      marker: "tractor.png",
      entries: [],
    },
    {
      id: 12,
      name: "Pavilion",
      isLandmark: true,
      position: {
        lat: 39.69758987042334,
        lng: -84.30520121044576,
      },
      image: null,
      marker: "house-outline.png",
      entries: [],
    },
    {
      id: 13,
      name: "Bonfire Pit",
      isLandmark: true,
      position: {
        lat: 39.697573917855074,
        lng: -84.3049683622055,
      },
      image: null,
      marker: "fire.png",
      entries: [],
    },
    {
      id: 14,
      name: "Trailhead to Preschool",
      isLandmark: true,
      position: {
        lat: 39.69782547715623,
        lng: -84.30554250855133,
      },
      image: null,
      marker: "trail.png",
      entries: [],
    },
    {
      id: 15,
      name: "Nature Preschool",
      isLandmark: true,
      position: {
        lat: 39.69833030551913,
        lng: -84.30776681747716,
      },
      image: null,
      marker: "school.png",
      entries: [],
    },
    {
      id: 16,
      name: "Preschool Entrance",
      isLandmark: true,
      position: {
        lat: 39.69814623917417,
        lng: -84.30895976599574,
      },
      image: null,
      marker: "road.png",
      entries: [],
    },
    {
      id: 17,
      name: "Trailhead to Tire Swing & Observation Deck",
      isLandmark: true,
      position: {
        lat: 39.69766082604324,
        lng: -84.30381321074795,
      },
      image: null,
      marker: "trail.png",
      entries: [],
    },
  ],
  entries: [{
      id: 0,
      title: 'Welcome to the Learning Tree Farm!',
      location: 0, // Main Entrance
      text: 'The large sign on the side of the road says, "Welcome to the Learning Tree Farm."',
      actions: ['Turn into the driveway.'],
      requirements: [],
      expiration: []
    },
    {
      id: 1,
      title: 'Overflow parking for large events.',
      location: 1, // Event Parking Lot
      text: 'A small field on the side of the driveway that is intended for large event parking.',
      actions: ['Continue up the driveway.'],
      requirements: [],
      expiration: []
    },
    {
      id: 2,
      title: 'Primary parking for our visitors.',
      location: 2, // Parking Lot
      text: 'The primary parking area is located next to the driveway before the loop.',
      actions: ['Find a parking spot.', 'Drive around the loop.'],
      requirements: [],
      expiration: []
    },
    {
      id: 3,
      title: 'Large billboard map of the farm.',
      location: 3, // Information
      text: 'A large billboard sign stands in the middle of the driveway loop. It shows the main locations around the farm.',
      actions: ['Take a closer look at the map.', 'Head towards the Century House.', 'Continue to the Bank Barn.'],
      requirements: [],
      expiration: []
    },
    {
      id: 4,
      title: '',
      location: 4, // Century House
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 5,
      title: '',
      location: 5, // Restrooms
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 6,
      title: '',
      location: 6, // Smokehouse
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 7,
      title: '',
      location: 7, // Bank Barn
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 8,
      title: '',
      location: 8, // Tobacco Barn
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 9,
      title: '',
      location: 9, // Chicken Coop
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 10,
      title: '',
      location: 10, // Garden
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 11,
      title: '',
      location: 11, // Play House & Tractor
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 12,
      title: '',
      location: 12, // Pavilion
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 13,
      title: '',
      location: 13, // Bonfire Pit
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 14,
      title: '',
      location: 14, // Trailhead to Preschool
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 15,
      title: '',
      location: 15, // Nature Preschool
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 16,
      title: '',
      location: 16, // Preschool Entrance
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    },
    {
      id: 17,
      title: '',
      location: 17, // Trailhead to Tire Swing & Observation Deck
      text: '',
      actions: [],
      requirements: [],
      expiration: []
    }
  ],
  items: [{
    id: 0,
    name: "",
    location: 0,
    image: null,
    entries: []
  }]
})
