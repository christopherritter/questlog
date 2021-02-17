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
        lat: location.position.lat,
        lng: location.position.lng,
      },
      zoom: location.zoom,
      image: location.image,
      marker: location.marker,
      entries: location.entries,
    }
  },

  SET_OBJECTIVE: (state, { id, bool }) => {
    state.objectives[id].isComplete = bool;
  },

  ADD_ENTRY: (state, entry) => {
    state.editor.entries.push(entry);
  },

  SET_ENTRY: (state, entry) => {
    state.editor.entry = entry;
  },

  UPDATE_ENTRY: (state, entry) => {
    console.log(entry)
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
