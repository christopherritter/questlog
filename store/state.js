export default () => ({
  authUser: null,
  quest: null,
  region: null,
  location: null,
  entry: null,
  item: null,
  editor: {
    quest: {
      title: "",
      description: "",
      image: "",
      categories: []
    },
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
    location: {
      name: "",
      isLandmark: true,
      coordinates: {
        lat: 39.828175,
        lng: -98.5795
      },
      zoom: 18,
      image: "",
      isLandmark: false,
      mapOptions: {},
      draggable: true
    },
    entry: null,
    action: null,
    item: null,
    objectives: [],
    locations: [],
    markers: [],
    entries: [],
    actions: [],
    items: []
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
    "Put",
    "Take",
  ],
})
