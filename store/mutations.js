import initialState from './state'

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, {
    authUser
  }) => {
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
    state.region = region;
  },

  SET_OBJECTIVE: (state, {
    id,
    bool
  }) => {
    state.objectives[id].isComplete = bool;
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

  // _EDITOR

  SET_QUEST_EDITOR: (state, quest) => {
    state.editor.quest = {
      title: quest.title,
      description: quest.description,
      image: quest.image,
      categories: quest.categories,
    }
  },

  SET_REGION_EDITOR: (state, region) => {
    state.editor.region = region;
  },

  ADD_OBJECTIVE_EDITOR: (state, objective) => {
    state.editor.objectives.push(objective);
  },

  UPDATE_OBJECTIVE_EDITOR: (state, objective) => {
    state.editor.objectives[objective.currentObjective] = {
      name: objective.newObjective.name,
      description: objective.newObjective.description,
      isPrimary: objective.newObjective.isPrimary,
    };
    // state.editor.entry = state.editor.entries[entry.selectedEntry];
  },

  SET_OBJECTIVES_EDITOR: (state, objectives) => {
    state.editor.objectives = objectives;
  },

  ADD_LOCATION_EDITOR: (state, location) => {
    state.editor.locations.push(location);
  },

  SET_LOCATION_EDITOR: (state, location) => {
    state.editor.location = {
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

  UPDATE_LOCATION_EDITOR: (state, location) => {
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
    }
  },

  SET_COORDINATES_EDITOR: (state, location) => {
    state.editor.locations[location.index].coordinates = location.coordinates;
  },

  ADD_ENTRY_EDITOR: (state, entry) => {
    state.editor.entries.push(entry);
  },

  UPDATE_ENTRY_EDITOR: (state, entry) => {
    state.editor.entries[entry.selectedEntry] = {
      title: entry.newEntry.title,
      location: entry.newEntry.location,
      text: entry.newEntry.text,
      requirements: entry.newEntry.requirements,
      expiration: entry.newEntry.expiration,
      objectives: entry.newEntry.objectives
    };
  },

  SET_ENTRIES_EDITOR: (state, entries) => {
    state.editor.entries = entries;
  },

  ADD_ITEM_EDITOR: (state, item) => {
    state.editor.items.push(item);
  },

  UPDATE_ITEM_EDITOR: (state, item) => {
    state.editor.items[item.selectedItem] = {
      name: item.newItem.name,
      location: item.newItem.location,
      description: item.newItem.description,
      requirements: item.newItem.requirements,
      expiration: item.newItem.expiration,
      objectives: item.newItem.objectives
    };
    state.editor.item = state.editor.items[item.selectedItem];
  },

  SET_ITEMS_EDITOR: (state, items) => {
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
