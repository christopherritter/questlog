import initialState from './state'

export default {
  // USER

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

  // QUEST

  SET_QUEST: (state, quest) => {
    console.log("Set quest")
    console.log(quest)
    state.quest = quest
  },

  CLEAR_QUEST: (state) => {
    state.quest = {};
    state.objectives = [];
    state.locations = [];
    state.entries = [];
    state.items = [];
  },

  SET_REGION: (state, region) => {
    state.quest.region = region;
  },

  // OBJECTIVES

  ADD_OBJECTIVE: (state, objective) => {
    state.objectives.push(objective);
  },

  UPDATE_OBJECTIVE: (state, objective) => {
    Object.assign(state.objectives[objective.currentObjective],
      objective.newObjective);
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

  // LOCATIONS

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

  // ENTRIES

  ADD_ENTRY: (state, entry) => {
    state.entries.push(entry);
  },

  UPDATE_ENTRY: (state, obj) => {
    Object.assign(state.entries[obj.index], obj.entry);
  },

  SET_ENTRIES: (state, entries) => {
    state.entries = entries;
  },

  // ITEMS

  ADD_ITEM: (state, item) => {
    state.items.push(item);
  },

  UPDATE_ITEM: (state, obj) => {
    Object.assign(state.items[obj.index], obj.item);
  },

  SET_ITEMS: (state, items) => {
    state.items = items;
  },

  // ACTIONS

  ADD_ACTION: (state, { entryIndex, itemIndex, action }) => {
    if (entryIndex != null) {
      state.entries[entryIndex].actions.push(action);
    } else if (itemIndex != null) {
      state.items[itemIndex].actions.push(action);
    }
  },

  UPDATE_ACTION: (state, { entryIndex, itemIndex, actionIndex, action }) => {
    if (entryIndex != null) {
      Object.assign(state.entries[entryIndex].actions[actionIndex], action);
    } else if (itemIndex != null) {
      Object.assign(state.item[itemIndex].actions[actionIndex], action);
    }
  },

  DELETE_ACTION: (state, { entryIndex, itemIndex, actionIndex }) => {
    if (entryIndex != null) {
      state.entries[entryIndex].actions.splice(actionIndex, 1);
    } else if (itemIndex != null) {
      state.items[itemIndex].actions.splice(actionIndex, 1);
    }
  },

  // UTILS

  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

}
