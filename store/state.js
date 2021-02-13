export default () => ({
  authUser: null,
  quest: null,
  region: null,
  location: null,
  entry: null,
  item: null,
  users: {
    'W8INchB9HLWxMHfgNVQ4mWE5P8v1': {
      name: "Christopher Ritter",
      role: "Administrator",
      favorites: [0, 1, 2, 3],
      authored: []
    },
    'a': {
      name: "Learning Tree Farm",
      role: "Author",
      favorites: [0, 1, 2, 3],
      authored: [0, 1, 2, 3]
    }
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
  quests: [{
      id: 0,
      title: "Welcome to the Learning Tree Farm",
      author: 1,
      description: "Come on down to the Learning Tree Farm and we'll show you around all the places you can explore!",
      image: "welcome-sign.png",
      categories: [0, 1, 2],
      // favorite: true,
      featured: true,
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
      author: 1,
      description: "Celebrate the dawn of a new year by meeting all of the newborn animals and their proud parents.",
      image: "baby-goats.png",
      categories: [0, 1, 2],
      // favorite: false,
      featured: true,
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
      author: 1,
      description: "Find out how the Learning Tree Farm uses centuries old techniques to help the garden thrive.",
      image: "garden.png",
      categories: [0, 1, 2],
      // favorite: false,
      featured: true,
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
      author: 1,
      description: "Help the Learning Tree find all the missing sheep which are freely roaming around the farm.",
      image: "sheep.png",
      categories: [0, 1, 3],
      // favorite: false,
      featured: true,
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
      lat: 39.697153058061296,
      lng: -84.3054835792886,
    },
    zoom: 19
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
        lat: 39.69718650553957,
        lng: -84.3090084688364,
      },
      zoom: 19,
      image: "welcome-sign.png",
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
      image: "event-parking-lot.png",
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
      image: "parking-lot.png",
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
      image: "information.png",
      marker: "info.png",
      entries: [3],
    },
    {
      id: 4,
      name: "Century House",
      isLandmark: true,
      position: {
        lat: 39.697184805057965,
        lng: -84.30578406787144,
      },
      zoom: 19,
      image: "century-house.png",
      marker: "house.png",
      entries: [4],
    },
    {
      id: 5,
      name: "Smokehouse",
      isLandmark: true,
      position: {
        lat: 39.69734793440454,
        lng: -84.30588556356814,
      },
      zoom: 19,
      image: "smokehouse.png",
      marker: "smog.png",
      entries: [5],
    },
    {
      id: 6,
      name: "Bank Barn",
      isLandmark: true,
      position: {
        lat: 39.697139635581166,
        lng: -84.30512614831034,
      },
      zoom: 19,
      image: "bank-barn.png",
      marker: "barn.png",
      entries: [6],
    },
    {
      id: 7,
      name: "Tobacco Barn",
      isLandmark: true,
      position: {
        lat: 39.69733956075378,
        lng: -84.30457802856016,
      },
      zoom: 19,
      image: "tobacco-barn.png",
      marker: "barn.png",
      entries: [7],
    },
    {
      id: 8,
      name: "Garden",
      isLandmark: true,
      position: {
        lat: 39.69697765198743,
        lng: -84.30461785733092,
      },
      zoom: 19,
      image: "garden.png",
      marker: "corn.png",
      entries: [8],
    },
    {
      id: 9,
      name: "Play House & Tractor",
      isLandmark: true,
      position: {
        lat: 39.69764999930142,
        lng: -84.30560789744072,
      },
      zoom: 19,
      image: "play-tractor.png",
      marker: "tractor.png",
      entries: [9],
    },
    {
      id: 10,
      name: "Pavilion",
      isLandmark: true,
      position: {
        lat: 39.69758987042334,
        lng: -84.30520121044576,
      },
      zoom: 19,
      image: "pavilion.png",
      marker: "house-outline.png",
      entries: [10],
    },
    {
      id: 11,
      name: "Bonfire Pit",
      isLandmark: true,
      position: {
        lat: 39.697573917855074,
        lng: -84.3049683622055,
      },
      zoom: 19,
      image: "bonfire-pit.png",
      marker: "fire.png",
      entries: [11],
    },
    {
      id: 12,
      name: "Trailhead to Preschool",
      isLandmark: true,
      position: {
        lat: 39.69782547715623,
        lng: -84.30554250855133,
      },
      zoom: 19,
      image: "trailhead-to-preschool.png",
      marker: "trail.png",
      entries: [12],
    },
    {
      id: 13,
      name: "Nature Preschool",
      isLandmark: true,
      position: {
        lat: 39.69833030551913,
        lng: -84.30776681747716,
      },
      zoom: 19,
      image: null,
      marker: "school.png",
      entries: [13],
    },
    {
      id: 14,
      name: "Preschool Entrance",
      isLandmark: true,
      position: {
        lat: 39.69814623917417,
        lng: -84.30895976599574,
      },
      zoom: 19,
      image: null,
      marker: "road.png",
      entries: [14],
    },
    {
      id: 15,
      name: "Trailhead to Tire Swing & Observation Deck",
      isLandmark: true,
      position: {
        lat: 39.69766082604324,
        lng: -84.30381321074795,
      },
      zoom: 19,
      image: "trailhead-to-tire-swing.png",
      marker: "trail.png",
      entries: [15],
    },
  ],
  entries: [{
      id: 0,
      title: 'Welcome to the Learning Tree Farm!',
      location: 0, // Main Entrance
      text: 'The large sign on the side of the road says, "Welcome to the Learning Tree Farm."',
      actions: [{
        id: 0,
        text: 'Turn into the driveway.',
        icon: 'mdi-road-variant',
        forward: 1, // Event Parking Lot
        back: null,
      }, ],
      requirements: [],
      expiration: [],
      objectives: null,
    },
    {
      id: 1,
      title: 'Overflow parking for large events.',
      location: 1, // Event Parking Lot
      text: 'A small field on the side of the driveway that is intended for large event parking.',
      actions: [{
        id: 0,
        text: 'Continue up the driveway.',
        icon: 'mdi-road-variant',
        forward: 2, // Parking Lot
      }, ],
      requirements: [],
      expiration: [],
      objectives: null,
    },
    {
      id: 2,
      title: 'Primary parking for our visitors.',
      location: 2, // Parking Lot
      text: 'The primary parking area is located next to the driveway before the loop.',
      actions: [
        // {
        //   id: 0,
        //   text: 'Find a parking spot.',
        //   icon: 'mdi-image',
        //   forward: 4, // Century House
        // },
        {
          id: 0,
          text: 'Drive around the loop.',
          icon: 'mdi-road-variant',
          forward: 3, // Information
        },
      ],
      requirements: [],
      expiration: [],
      objectives: null,
    },
    {
      id: 3,
      title: 'Large billboard map of the farm.',
      location: 3, // Information
      text: 'A large billboard sign stands in the middle of the driveway loop. It shows the main locations around the farm.',
      actions: [
        // {
        //   id: 0,
        //   text: 'Take a closer look at the map.',
        //   icon: 'mdi-image',
        // },
        {
          id: 0,
          text: 'Head towards the Century House.',
          icon: 'mdi-home',
          forward: 4, // Century House
        },
        {
          id: 1,
          text: 'Continue to the Bank Barn.',
          icon: 'mdi-barn',
          forward: 6, // Bank Barn
        },
      ],
      requirements: [],
      expiration: [],
      objectives: null,
    },
    {
      id: 4,
      title: 'Century House',
      location: 4, // Century House
      text: 'Step into the original farmhouse, built in 1829, and into the lives of early Ohio settlers. The Century House is a pioneer museum to be explored when farm staff is on site!',
      actions: [{
        id: 0,
        text: 'Walk to the Smoke House.',
        icon: 'mdi-smog',
        forward: 5, // Smokehouse
      }, ],
      requirements: [],
      expiration: [],
      objectives: [0],
    },
    {
      id: 5,
      title: 'Smoke House',
      location: 5, // Smokehouse
      text: 'The Smoke House was one of the original buildings on site. It currently is closed for the season. ',
      actions: [{
        id: 0,
        text: 'Walk towards the Play House.',
        icon: 'mdi-tractor-variant',
        forward: 9, // Play House & Tractor
      }, ],
      requirements: [],
      expiration: [],
      objectives: null,
    },
    {
      id: 6,
      title: 'Bank Barn',
      location: 6, // Bank Barn
      text: 'The Bank Barn is an old wooden barn built atop of a 5 ft stone base. A green door on the side leads to the main interior of the barn.',
      actions: [{
        id: 0,
        text: 'Head towards the Garden.',
        icon: 'mdi-corn',
        forward: 8, // Garden
      }, ],
      requirements: [],
      expiration: [],
      objectives: [5],
    },
    {
      id: 7,
      title: 'Tobacco Barn',
      location: 7, // Tobacco Barn
      text: 'The Tobacco Barn is an elongated barn that houses the smaller farm animals including chickens and other baby animals. It also serves as a nursing area for any animals that require special attention.',
      actions: [{
        id: 0,
        text: 'Head towards the Bonfire Pit.',
        icon: 'mdi-fire',
        forward: 11, // Bonfire Pit
      }, ],
      requirements: [],
      expiration: [],
      objectives: [3],
    },
    {
      id: 8,
      title: 'The Garden',
      location: 8, // Garden
      text: 'The Garden is where we grow most of the food we need to support the animals who live on the farm. It is located next to the Tobacco Barn, which has numerous rain spouts on its roof that lead to a large white container that is used to gather rain water.',
      actions: [{
        id: 0,
        text: 'Head towards the Tobacco Barn.',
        icon: 'mdi-barn',
        forward: 7, // Tobacco Barn
      }, ],
      requirements: [],
      expiration: [],
      objectives: [4],
    },
    {
      id: 9,
      title: 'Play House & Tractor',
      location: 9, // Play House & Tractor
      text: 'This area contains a varity of interactive entertainment for the younger visitors. The main feature of the play area is a tractor that is safe enough to climb on. Towards the back is an old Play House with enough room to allow your imagines to run wild.',
      actions: [{
        id: 0,
        text: 'Walk towards the Century House.',
        icon: 'mdi-home',
        forward: 4, // Century House
      }, ],
      requirements: [],
      expiration: [],
      objectives: [1],
    },
    {
      id: 10,
      title: 'The Pavilion',
      location: 10, // Pavilion
      text: 'The Pavilion is a large open wooden structure built on top of a concrete base. It largely serves as a gathering spot for our guests to begin their many adventures on the farm.',
      actions: [{
        id: 0,
        text: 'Walk towards the Play House.',
        icon: 'mdi-tractor-variant',
        forward: 9, // Play House & Tractor
      }, ],
      requirements: [],
      expiration: [],
      objectives: [2],
    },
    {
      id: 11,
      title: 'Bonfire Pit',
      location: 11, // Bonfire Pit
      text: 'A large circle of stones surrounds the charred circle in the grass that serves as the bon fire pit on cold nights, or whenever a bon fire is in order.',
      actions: [{
        id: 0,
        text: 'Walk into the Pavilion.',
        icon: 'mdi-home-outline',
        forward: 10, // Pavilion
      }, ],
      requirements: [],
      expiration: [],
      objectives: null,
    },
    {
      id: 12,
      title: 'Trailhead to Preschool',
      location: 12, // Trailhead to Preschool
      text: 'The trailhead leads through the grass and trees towards our Nature Preschool.',
      actions: [{
        id: 0,
        text: 'Walk towards the Preschool.',
        icon: 'mdi-school',
        forward: 13, // Nature Preschool
      }, ],
      requirements: [],
      expiration: [],
      objectives: null,
    },
    {
      id: 13,
      title: 'Nature Preschool',
      location: 13, // Nature Preschool
      text: 'A small house that was somewhoat recently in comparison to the other buildings on the farm. It currently serves as a school house for day care students.',
      actions: [{
        id: 0,
        text: 'Head towards the Enrance.',
        icon: 'mdi-road-variant',
        forward: 14, // Preschool Entrance
      }, ],
      requirements: [],
      expiration: [],
      objectives: null,
    },
    {
      id: 14,
      title: 'Preschool Entrance',
      location: 14, // Preschool Entrance
      text: 'The thick of trees on the side of the road clears to reveal a small sign that says "Preschool Entrance." A driveway just past the sign leads to a small house with a fenced in playground.',
      actions: [{
        id: 0,
        text: 'Drive back to the Main Entrance.',
        icon: 'mdi-road-variant',
        forward: 0, // Main Entrance
      }, ],
      requirements: [],
      expiration: [],
      objectives: null,
    },
    {
      id: 15,
      title: 'Trailhead to Tire Swing & Observation Deck',
      location: 15, // Trailhead to Tire Swing & Observation Deck
      text: 'On the side of the trail you see a sign that reads, "Trailhead to Tire Swing & Observation Deck." A little further up the trail you see wooden planks laid into the ground to protect your shoes from getting muddy.',
      actions: [{
        id: 0,
        text: 'Head towards the Bonfire Pit.',
        icon: 'mdi-fire',
        forward: 11, // Bonfire Pit
      }, ],
      requirements: [],
      expiration: [],
      objectives: null,
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
