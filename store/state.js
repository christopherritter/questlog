export default () => ({
  authUser: null,
  user: null,
  quest: null,
  objectives: null,
  locations: null,
  editor: {
    quest: {
      questId: null,
      title: "",
      description: "",
      image: "",
      categories: [],
      author: null,
      region: {
        name: "",
        coordinates: [
          39.828175,
          -98.5795
        ],
        zoom: 18,
        draggable: true,
        mapOptions: {}
      },
    },
    objectives: [],
    locations: [],
  },
  categories: [{
      id: 0,
      name: "family-friendly",
    },
    {
      id: 1,
      name: "outdoor",
    },
    {
      id: 2,
      name: "educational",
    },
    {
      id: 3,
      name: "adventure",
    }
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
  actionTypes: [
    // "Look",
    "Move",
    // "Place",
    // "Take",
    // "Use",
  ],
  icons: [
    'mdi-car-side',
    'mdi-directions-fork',
    'mdi-door',
    'mdi-eye',
    'mdi-hand-right',
    'mdi-run',
    'mdi-walk',
    'mdi-barn',
    'mdi-home',
    'mdi-corn',
    'mdi-smog',
    'mdi-tractor-variant',
    'mdi-fire'
  ],
})
