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

  ADD_LOCATION: (state, location) => {
    state.editor.locations.push(location);
  },

  SET_LOCATION: (state, location) => {
    state.location = {
      name: location.name,
      isLandmark: location.isLandmark,
      coordinates: {
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      },
      zoom: location.zoom,
      image: location.image,
      marker: location.marker,
      draggable: location.draggable,
    }
  },

  UPDATE_LOCATION: (state, location) => {
    state.editor.locations[location.selectedLocation] = {
      name: location.newLocation.name,
      isLandmark: location.newLocation.isLandmark,
      coordinates: {
        lat: location.newLocation.coordinates.lat,
        lng: location.newLocation.coordinates.lng,
      },
      zoom: location.newLocation.zoom,
      image: location.newLocation.image,
      marker: location.newLocation.marker,
      draggable: location.newLocation.draggable,
    },
    state.editor.location = state.editor.locations[location.selectedLocation];
  },

  SET_COORDINATES: (state, location) => {
    state.editor.locations[location.index].coordinates = location.coordinates;
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

  ADD_OBJECTIVE: (state, objective) => {
    state.editor.objectives.push(objective);
  },

  UPDATE_OBJECTIVE: (state, objective) => {
    state.editor.objectives[objective.currentObjective] = {
      name: objective.newObjective.name,
      description: objective.newObjective.description,
      isPrimary: objective.newObjective.isPrimary,
    };
    // state.editor.entry = state.editor.entries[entry.selectedEntry];
  },

  SET_OBJECTIVES: (state, objectives) => {
    state.editor.objectives = objectives;
  },

  ADD_ENTRY: (state, entry) => {
    state.editor.entries.push(entry);
  },

  SET_ENTRY: (state, entry) => {
    state.editor.entry = entry;
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
  },

  ADD_ITEM: (state, item) => {
    state.editor.items.push(item);
  },

  SET_ITEM: (state, item) => {
    state.editor.item = item;
  },

  UPDATE_ITEM: (state, item) => {
    state.editor.items[item.selectedItem] = {
      name: item.newItem.name,
      location: item.newItem.location,
      text: item.newItem.text,
      requirements: item.newItem.requirements,
      expiration: item.newItem.expiration,
      objectives: item.newItem.objectives
    };
    state.editor.item = state.editor.items[item.selectedItem];
  },

  CLEAR_ITEM: (state) => {
    state.editor.item = null
  },

  SET_ITEMS: (state, items) => {
    state.editor.items = items;
  },

  ADD_ACTION: (state, action) => {
    state.editor.actions.push(action);
  },

  UPDATE_ACTION: (state, action) => {
    state.editor.actions[action.currentAction] = {
      name: action.newAction.name,
      type: action.newAction.type,
      target: action.newAction.target,
    };
  },

  SET_ACTIONS: (state, actions) => {
    state.editor.actions = actions;
  },
}
