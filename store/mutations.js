import initialState from './state'

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    }
  },

  SET_QUEST: (state, quest) => {
    state.quest = {
      id: quest.id,
      title: quest.title,
      author: quest.author,
      description: quest.description,
      image: quest.image,
      categories: quest.categories,
      // favorite: quest.favorite,
      featured: quest.featured,
      region: quest.region,
      objectives: quest.objectives,
      locations: quest.locations,
      entries: quest.entries,
      items: quest.items,
      startingPoint: quest.startingPoint,
    }
  },

  SET_REGION: (state, region) => {
    state.region = {
      id: region.id,
      name: region.name,
      position: {
        lat: region.position.lat,
        lng: region.position.lng,
      },
      zoom: region.zoom
    }
  },

  SET_LOCATION: (state, location) => {
    state.location = {
      id: location.id,
      name: location.name,
      isLandmark: location.isLandmark,
      position: {
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      },
      zoom: location.zoom,
      image: location.image,
      marker: location.marker,
      entries: location.entries,
    }
  },

  ADD_LOCATION: (state, location) => {
    state.editor.locations.push(location);
  },

  UPDATE_LOCATION: (state, location) => {
    state.editor.locations[entry.selectedLocation] = {
      id: location.newLocation.id,
      name: location.newLocation.name,
      isLandmark: location.newLocation.isLandmark,
      position: {
        lat: location.newLocation.coordinates.lat,
        lng: location.newLocation.coordinates.lng,
      },
      zoom: location.newLocation.zoom,
      image: location.newLocation.image,
      marker: location.newLocation.marker,
      entries: location.newLocation.entries,
    },
    state.editor.location = state.editor.locations[location.selectedLocation];
  },

  CLEAR_LOCATION: (state) => {
    state.editor.location = {
      name: "Untitled",
      isLandmark: true,
      coordinates: {
        lat: null,
        lng: null
      },
      zoom: 18,
      image: "",
      isLandmark: false,
      mapOptions: {},
      draggable: true
    }
  },

  SET_LOCATIONS: (state, locations) => {
    state.editor.locations = locations;
  },

  SET_OBJECTIVE: (state, { id, bool }) => {
    state.objectives[id].isComplete = bool;
  },

  SET_ENTRY: (state, entry) => {
    state.editor.entry = entry;
  },

  ADD_ENTRY: (state, entry) => {
    state.editor.entries.push(entry);
  },

  UPDATE_ENTRY: (state, entry) => {
    state.editor.entries[entry.selectedEntry] = {
      title: entry.newEntry.title,
      location: entry.newEntry.location,
      text: entry.newEntry.text,
      requirements: entry.newEntry.requirements,
      expiration: entry.newEntry.expiration,
      objectives: entry.newEntry.objectives
    };
    state.editor.entry = state.editor.entries[entry.selectedEntry];
  },

  CLEAR_ENTRY: (state) => {
    state.editor.entry = null
  },

  SET_ENTRIES: (state, entries) => {
    state.editor.entries = entries;
  }
}
