export default () => ({
  authUser: null,
  user: null,
  quest: {},
  objectives: [],
  locations: [],
  entries: [],
  items: [],
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
  markers: [
    {
      text: "Barn",
      value: "barn",
    },
    {
      text: "Boom gate",
      value: "boom-gate",
    },
    {
      text: "Corn",
      value: "corn",
    },
    {
      text: "Fire",
      value: "fire",
    },
    {
      text: "Gate",
      value: "gate",
    },
    {
      text: "House",
      value: "home",
    },
    {
      text: "House (outline)",
      value: "home-outline",
    },
    {
      text: "Paper roll",
      value: "paper-roll",
    },
    {
      text: "Information",
      value: "information",
    },
    {
      text: "Parking",
      value: "parking",
    },
    {
      text: "Road",
      value: "road-variant",
    },
    {
      text: "School",
      value: "school",
    },
    {
      text: "Caution sign",
      value: "sign-caution",
    },
    {
      text: "Real estate sign",
      value: "sign-real-estate",
    },
    {
      text: "Sign",
      value: "sign-text",
    },
    {
      text: "Smog",
      value: "smog",
    },
    {
      text: "Tractor",
      value: "tractor-variant",
    },
    {
      text: "Traffic light",
      value: "traffic-light",
    },
    {
      text: "Trail",
      value: "routes",
    },
  ],
  actionTypes: [
    {
      text: "Look",
      value: "look",
      marker: "mdi-eye-outline",
    },
    {
      text: "Move",
      value: "move",
      marker: "mdi-walk",
    },
    {
      text: "Take",
      value: "take",
      marker: "mdi-bag-personal",
    }
  ]
})
