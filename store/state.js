export default () => ({
  authUser: null,
  user: null,
  quest: null,
  // region: null,
  // location: null,
  // entry: null,
  // item: null,
  editor: {
    quest: {
      title: "",
      description: "",
      image: "",
      categories: [],
      author: null,
      region: {
        name: "",
        coordinates: {
          lat: 39.828175,
          lng: -98.5795
        },
        zoom: 18,
        draggable: true,
        mapOptions: {}
      },
      objectives: [],
      locations: [],
    },
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
    "Look",
    "Move",
    "Place",
    "Take",
    "Use",
  ],
  icons: [
    'mdi-car-side',
    'mdi-directions-fork',
    'mdi-door',
    'mdi-eye',
    'mdi-hand-right',
    'mdi-run'
  ],
  colors: [
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deep-orange',
    'brown',
    'blue-grey',
    'grey',
    'black'
  ]
})
