var regions = [
  {
    id: 0,
    name: "Learning Tree Farm",
    position: {
      lat: 39.697556273873595,
      lng: -84.30619228020171,
    }
  }
]

var locations = [
  {
    id: 0,
    name: "Main Entrance",
    isLandmark: true,
    position: {
      lat: 39.69705252378522,
      lng: -84.30895915916378,
    },
    image: "",
    marker: "",
    entries: [],
  },
  {
    id: 1,
    name: "Event Parking",
    isLandmark: true,
    position: {
      lat: 39.69669665514492,
      lng: -84.30802298163705,
    },
    image: "",
    marker: "",
    entries: [],
  },
  {
    id: 2,
    name: "Parking",
    isLandmark: true,
    position: {
      lat: 39.69683532141846,
      lng: -84.30663546124721,
    },
    image: "",
    marker: "",
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
    image: "",
    marker: "",
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
    image: "",
    marker: "",
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
    image: "",
    marker: "",
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
    image: "",
    marker: "",
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
    image: "",
    marker: "",
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
    image: "",
    marker: "",
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
    image: "",
    marker: "",
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
    image: "",
    marker: "",
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
    image: "",
    marker: "",
    entries: [],
  },
  {
    id: 11,
    name: "Pavilion",
    isLandmark: true,
    position: {
      lat: 39.69758987042334,
      lng: -84.30520121044576,
    },
    image: "",
    marker: "",
    entries: [],
  },
  {
    id: 12,
    name: "Bonfire Pit",
    isLandmark: true,
    position: {
      lat: 39.697573917855074,
      lng: -84.3049683622055,
    },
    image: "",
    marker: "",
    entries: [],
  },
  {
    id: 13,
    name: "Trailhead to Preschool",
    isLandmark: true,
    position: {
      lat: 39.69782547715623,
      lng: -84.30554250855133,
    },
    image: "",
    marker: "",
    entries: [],
  },
  {
    id: 14,
    name: "Nature Preschool",
    isLandmark: true,
    position: {
      lat: 39.69833030551913,
      lng: -84.30776681747716,
    },
    image: "",
    marker: "",
    entries: [],
  },
  {
    id: 15,
    name: "Preschool Entrance",
    isLandmark: true,
    position: {
      lat: 39.69814623917417,
      lng: -84.30895976599574,
    },
    image: "",
    marker: "",
    entries: [],
  },
  {
    id: 16,
    name: "Trailhead to Tire Swing & Observation Deck",
    isLandmark: true,
    position: {
      lat: 39.69766082604324,
      lng: -84.30381321074795,
    },
    image: "",
    marker: "",
    entries: [],
  },
]

var entries = [
  {
    id: 0,
    title: "",
    location: 0,
    text: "",
    actions: [],
    requirements: [],
    expiration: []
  }
]

var items = [
  {
    id: 0,
    name: "",
    location: 0,
    image: "",
    entries: []
  }
]

export default () => ({
  authUser: null,
  quests: [
    {
      id: 0,
      title: "Welcome to the Learning Tree Farm",
      author: "Learning Tree Farm",
      description: "Come on down to the Learning Tree Farm and we'll show you around all the places you can explore!",
      image: "welcome-sign.png",
      categories: ["family-friendly", "outdoor", "educational"],
      favorite: true,
      featured: true,
      region: {
        name: regions[0].name,
        position: regions[0].position,
        zoom: 18
      },
      objectives: [
        {
          id: 0,
          name: "",
          description: "",
          isPrimary: true,
          isComplete: false,
        },
      ],
      locations: locations,
      entries: entries,
      items: items,
    },
    {
      id: 1,
      title: "Celebrate the Spring Equinox",
      author: "Learning Tree Farm",
      description: "Celebrate the dawn of a new year by meeting all of the newborn animals and their proud parents.",
      image: "baby-goats.png",
      categories: ["family-friendly", "outdoor", "educational"],
      favorite: false,
      featured: true,
      region: {
        name: regions[0].name,
        position: regions[0].position,
        zoom: 18
      },
      objectives: [
        {
          id: 0,
          name: "",
          description: "",
          isPrimary: true,
          isComplete: false,
        },
      ],
      locations: locations,
      entries: entries,
      items: items,
    },
    {
      id: 2,
      title: "How Does Your Garden Grow?",
      author: "Learning Tree Farm",
      description: "Find out how the Learning Tree Farm uses centuries old techniques to help the garden thrive.",
      image: "garden.png",
      categories: ["family-friendly", "outdoor", "educational"],
      favorite: false,
      featured: true,
      region: {
        name: regions[0].name,
        position: regions[0].position,
        zoom: 18
      },
      objectives: [
        {
          id: 0,
          name: "",
          description: "",
          isPrimary: true,
          isComplete: false,
        },
      ],
      locations: locations,
      entries: entries,
      items: items,
    },
    {
      id: 3,
      title: "The Great Sheep Escape",
      author: "Learning Tree Farm",
      description: "Help the Learning Tree find all the missing sheep which are freely roaming around the farm.",
      image: "sheep.png",
      categories: ["family-friendly", "outdoor", "adventure"],
      favorite: false,
      featured: true,
      region: {
        name: regions[0].name,
        position: regions[0].position,
        zoom: 18
      },
      objectives: [
        {
          id: 0,
          name: "",
          description: "",
          isPrimary: true,
          isComplete: false,
        },
      ],
      locations: locations,
      entries: entries,
      items: items,
    }
  ]
})
