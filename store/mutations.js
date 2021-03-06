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

  SET_USER: (state, user) => {
    state.user = user
  },

  SET_USER_NAME: (state, userName) => {
    state.user.name = userName;
  },

  SET_QUEST: (state, quest) => {
    state.quest = quest
  },

  SET_REGION: (state, region) => {
    state.region = region;
  },

  ADD_OBJECTIVE: (state, objective) => {
    state.objectives.push(objective);
  },

  UPDATE_OBJECTIVE: (state, objective) => {
    state.objectives[objective.currentObjective] = {
      name: objective.newObjective.name,
      description: objective.newObjective.description,
      isPrimary: objective.newObjective.isPrimary,
    };
  },

  SET_OBJECTIVE: (state, {
    index,
    bool
  }) => {
    state.objectives[index].isComplete = bool;
  },

  SET_OBJECTIVES: (state, objectives) => {
    state.objectives = objectives;
  },

  ADD_LOCATION: (state, location) => {
    state.locations.push(location);
  },

  UPDATE_LOCATION: (state, location) => {
    Object.assign(state.locations[location.selectedLocation],
      location.newLocation);
  },

  SET_LOCATION: (state, location) => {
    state.location = location;
  },

  SET_LOCATIONS: (state, locations) => {
    state.locations = locations;
  },

  SET_COORDINATES: (state, location) => {
    state.locations[location.index].coordinates = location.coordinates;
  },

  SET_LOCATIONS: (state, locations) => {
    state.locations = locations;
  },

  ADD_ENTRY: (state, entry) => {
    state.entries.push(entry);
  },

  UPDATE_ENTRY: (state, obj) => {
    Object.assign(state.entries[obj.index], obj.entry);
  },

  REMOVE_ENTRY: (state, obj) => {
    state.locations[obj.locationIndex].entries.splice(obj.entryIndex, 1);
  },

  SET_ENTRIES: (state, entries) => {
    state.entries = entries;
  },

  ADD_ITEM: (state, obj) => {
    state.locations[obj.selectedLocation].items.push(obj.item);
  },

  UPDATE_ITEM: (state, obj) => {
    Object.assign(state.locations[obj.selectedLocation].items[obj.selectedItem],
      obj.item);
  },

  REMOVE_ITEM: (state, obj) => {
    state.locations[obj.locationIndex].items.splice(obj.itemIndex, 1);
  },

  SET_ITEMS: (state, items) => {
    state.items = items;
  },

  CLEAR_QUEST: (state) => {
    state.quest = {};
    state.objectives = [];
    state.locations = [];
  },
}
