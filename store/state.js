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
      startingPoint: 0,
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
      startingPoint: 0,
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
      startingPoint: 0,
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
      startingPoint: 0,
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
      zoom: 19,
      image: null,
      marker: "road.png",
      entries: [0],
    },
    {
      id: 1,
      name: "Event Parking Lot",
      isLandmark: true,
      position: {
        lat: 39.69669665514492,
        lng: -84.30802298163705,
      },
      zoom: 19,
      image: null,
      marker: "parking.png",
      entries: [1],
    },
    {
      id: 2,
      name: "Parking Lot",
      isLandmark: true,
      position: {
        lat: 39.69683532141846,
        lng: -84.30663546124721,
      },
      zoom: 19,
      image: null,
      marker: "parking.png",
      entries: [2],
    },
    {
      id: 3,
      name: "Information",
      isLandmark: true,
      position: {
        lat: 39.69698503159554,
        lng: -84.30554298831034,
      },
      zoom: 19,
      image: null,
      marker: "info.png",
      entries: [3],
    },
    {
      id: 4,
      name: "Century House",
      isLandmark: true,
      position: {
        lat: 39.697199918787966,
        lng: -84.30579653342916,
      },
      zoom: 19,
      image: null,
      marker: "house.png",
      entries: [4],
    },
    {
      id: 5,
      name: "Restrooms",
      isLandmark: true,
      position: {
        lat: 39.69731220085636,
        lng: -84.3058882373532,
      },
      zoom: 19,
      image: null,
      marker: "restroom.png",
      entries: [5],
    },
    {
      id: 6,
      name: "Smokehouse",
      isLandmark: true,
      position: {
        lat: 39.69733858404809,
        lng: -84.30582683559051,
      },
      zoom: 19,
      image: null,
      marker: "smog.png",
      entries: [6],
    },
    {
      id: 7,
      name: "Bank Barn",
      isLandmark: true,
      position: {
        lat: 39.697139635581166,
        lng: -84.30512614831034,
      },
      zoom: 19,
      image: null,
      marker: "barn.png",
      entries: [7],
    },
    {
      id: 8,
      name: "Tobacco Barn",
      isLandmark: true,
      position: {
        lat: 39.69733956075378,
        lng: -84.30457802856016,
      },
      zoom: 19,
      image: null,
      marker: "barn.png",
      entries: [8],
    },
    {
      id: 9,
      name: "Chicken Coop",
      isLandmark: true,
      position: {
        lat: 39.69743149695268,
        lng: -84.30468044539928,
      },
      zoom: 19,
      image: null,
      marker: "gate.png",
      entries: [9],
    },
    {
      id: 10,
      name: "Garden",
      isLandmark: true,
      position: {
        lat: 39.69697765198743,
        lng: -84.30461785733092,
      },
      zoom: 19,
      image: null,
      marker: "corn.png",
      entries: [10],
    },
    {
      id: 11,
      name: "Play House & Tractor",
      isLandmark: true,
      position: {
        lat: 39.69764999930142,
        lng: -84.30560789744072,
      },
      zoom: 19,
      image: null,
      marker: "tractor.png",
      entries: [11],
    },
    {
      id: 12,
      name: "Pavilion",
      isLandmark: true,
      position: {
        lat: 39.69758987042334,
        lng: -84.30520121044576,
      },
      zoom: 19,
      image: null,
      marker: "house-outline.png",
      entries: [12],
    },
    {
      id: 13,
      name: "Bonfire Pit",
      isLandmark: true,
      position: {
        lat: 39.697573917855074,
        lng: -84.3049683622055,
      },
      zoom: 19,
      image: null,
      marker: "fire.png",
      entries: [13],
    },
    {
      id: 14,
      name: "Trailhead to Preschool",
      isLandmark: true,
      position: {
        lat: 39.69782547715623,
        lng: -84.30554250855133,
      },
      zoom: 19,
      image: null,
      marker: "trail.png",
      entries: [14],
    },
    {
      id: 15,
      name: "Nature Preschool",
      isLandmark: true,
      position: {
        lat: 39.69833030551913,
        lng: -84.30776681747716,
      },
      zoom: 19,
      image: null,
      marker: "school.png",
      entries: [15],
    },
    {
      id: 16,
      name: "Preschool Entrance",
      isLandmark: true,
      position: {
        lat: 39.69814623917417,
        lng: -84.30895976599574,
      },
      zoom: 19,
      image: null,
      marker: "road.png",
      entries: [16],
    },
    {
      id: 17,
      name: "Trailhead to Tire Swing & Observation Deck",
      isLandmark: true,
      position: {
        lat: 39.69766082604324,
        lng: -84.30381321074795,
      },
      zoom: 19,
      image: null,
      marker: "trail.png",
      entries: [17],
    },
  ],
  entries: [{
      id: 0,
      title: 'Welcome to the Learning Tree Farm!',
      location: 0, // Main Entrance
      text: 'The large sign on the side of the road says, "Welcome to the Learning Tree Farm."',
      actions: [
        {
          id: 0,
          text: 'Turn into the driveway.',
          icon: 'mdi-image',
        },
      ],
      requirements: [],
      expiration: []
    },
    {
      id: 1,
      title: 'Overflow parking for large events.',
      location: 1, // Event Parking Lot
      text: 'A small field on the side of the driveway that is intended for large event parking.',
      actions: [
        {
          id: 0,
          text: 'Continue up the driveway.',
          icon: 'mdi-image',
        },
      ],
      requirements: [],
      expiration: []
    },
    {
      id: 2,
      title: 'Primary parking for our visitors.',
      location: 2, // Parking Lot
      text: 'The primary parking area is located next to the driveway before the loop.',
      actions: [
        {
          id: 0,
          text: 'Find a parking spot.',
          icon: 'mdi-image',
        },
        {
          id: 1,
          text: 'Drive around the loop.',
          icon: 'mdi-image',
        },
      ],
      requirements: [],
      expiration: []
    },
    {
      id: 3,
      title: 'Large billboard map of the farm.',
      location: 3, // Information
      text: 'A large billboard sign stands in the middle of the driveway loop. It shows the main locations around the farm.',
      actions: [
        {
          id: 0,
          text: 'Take a closer look at the map.',
          icon: 'mdi-image',
        },
        {
          id: 1,
          text: 'Head towards the Century House.',
          icon: 'mdi-image',
        },
        {
          id: 2,
          text: 'Continue to the Bank Barn.',
          icon: 'mdi-image',
        },
      ],
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
