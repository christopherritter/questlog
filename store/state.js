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
        position: {
          lat: 39.69731517786061,
          lng: -84.30524990191205
        },
        zoom: 19
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
      locations: [
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
      ],
      entries: [
        {
          id: 0,
          title: "",
          location: 0,
          text: "",
          actions: [],
          requirements: [],
          expiration: []
        }
      ],
      items: [
        {
          id: 0,
          name: "",
          location: 0,
          image: "",
          entries: []
        }
      ],
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
        position: {
          lat: 39.69731517786061,
          lng: -84.30524990191205
        },
        zoom: 19
      },
      objectives: [],
      locations: [],
      entries: [],
      items: [],
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
        position: {
          lat: 39.69731517786061,
          lng: -84.30524990191205
        },
        zoom: 19
      },
      objectives: [],
      locations: [],
      entries: [],
      items: [],
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
        position: {
          lat: 39.69731517786061,
          lng: -84.30524990191205
        },
        zoom: 19
      },
      objectives: [],
      locations: [],
      entries: [],
      items: [],
    }
  ]
})
