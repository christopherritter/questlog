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
      text: "Cannabis",
      value: "cannabis",
    },
    {
      text: "Caution sign",
      value: "sign-caution",
    },
    {
      text: "Church",
      value: "church",
    },
    {
      text: "Corn",
      value: "corn",
    },
    {
      text: "Door",
      value: "door",
    },
    {
      text: "Drama",
      value: "drama-masks",
    },
    {
      text: "Easter egg",
      value: "egg-easter",
    },
    {
      text: "Flower",
      value: "flower-tulip",
    },
    {
      text: "Fire",
      value: "fire",
    },
    {
      text: "Food",
      value: "food",
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
      text: "Pine tree",
      value: "pine-tree",
    },
    {
      text: "Rabbit",
      value: "rabbit",
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
      text: "Real estate sign",
      value: "sign-real-estate",
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
      text: "Seesaw",
      value: "seesaw",
    },
    {
      text: "Sprout",
      value: "sprout",
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
    {
      text: "Tree",
      value: "tree",
    },
    {
      text: "Wall",
      value: "wall",
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
    },
    {
      text: "Use",
      value: "use",
      marker: "mdi-hand-pointing-right"
    }
  ]
})
