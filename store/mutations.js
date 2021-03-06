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

  SET_OBJECTIVE: (state, {
    index,
    bool
  }) => {
    state.objectives[index].isComplete = bool;
  },

  SET_OBJECTIVES: (state, objectives) => {
    state.objectives = objectives;
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

  SET_LOCATIONS: (state, locations) => {
    state.locations = locations;
  },

  SET_ENTRIES: (state, entries) => {
    state.entries = entries;
  },

  SET_ITEMS: (state, items) => {
    state.items = items;
  },

  CLEAR_QUEST: (state) => {
    state.quest = {};
    state.objectives = [];
    state.locations = [];
  },

  // _EDITOR

  SET_QUEST_EDITOR: (state, quest) => {
    state.quest = quest;
  },

  CLEAR_QUEST_EDITOR: (state) => {
    state.quest = {};
    state.objectives = [];
    state.locations = [];
  },

  SET_DETAILS_EDITOR: (state, details) => {
    state.quest.title = details.title || "Untitled";
    state.quest.author = details.author || "Anonymous";
    state.quest.authorId = state.authUser.uid;
    state.quest.description = details.description || "";
    state.quest.image = details.image || "";
    state.quest.categories = details.categories || [];
    state.quest.startingPoint = details.startingPoint || "";
  },

  SET_REGION_EDITOR: (state, region) => {
    state.quest.region = region;
  },

  ADD_OBJECTIVE_EDITOR: (state, objective) => {
    state.objectives.push(objective);
  },

  UPDATE_OBJECTIVE_EDITOR: (state, objective) => {
    state.objectives[objective.currentObjective] = {
      name: objective.newObjective.name,
      description: objective.newObjective.description,
      isPrimary: objective.newObjective.isPrimary,
    };
  },

  SET_OBJECTIVES_EDITOR: (state, objectives) => {
    state.objectives = objectives;
  },

  ADD_LOCATION_EDITOR: (state, location) => {
    state.locations.push(location);
  },

  UPDATE_LOCATION_EDITOR: (state, location) => {
    Object.assign(state.locations[location.selectedLocation],
      location.newLocation);
  },

  SET_LOCATIONS_EDITOR: (state, locations) => {
    state.locations = locations;
  },

  SET_COORDINATES_EDITOR: (state, location) => {
    state.locations[location.index].coordinates = location.coordinates;
  },

  ADD_ENTRY_EDITOR: (state, obj) => {
    state.locations[obj.selectedLocation].entries.push(obj.entry);
  },

  UPDATE_ENTRY_EDITOR: (state, obj) => {
    Object.assign(state.locations[obj.selectedLocation].entries[obj.selectedEntry],
      obj.entry);
  },

  REMOVE_ENTRY_EDITOR: (state, obj) => {
    state.locations[obj.locationIndex].entries.splice(obj.entryIndex, 1);
  },

  ADD_ITEM_EDITOR: (state, obj) => {
    state.locations[obj.selectedLocation].items.push(obj.item);
  },

  UPDATE_ITEM_EDITOR: (state, obj) => {
    Object.assign(state.locations[obj.selectedLocation].items[obj.selectedItem],
      obj.item);
  },

  REMOVE_ITEM_EDITOR: (state, obj) => {
    state.locations[obj.locationIndex].items.splice(obj.itemIndex, 1);
  },

  ADD_ACTION_EDITOR: (state, action) => {
    state.actions.push(action);
  },

  UPDATE_ACTION_EDITOR: (state, action) => {
    state.actions[action.currentAction] = {
      name: action.newAction.name,
      type: action.newAction.type,
      target: action.newAction.target,
    };
  },

  SET_ACTIONS_EDITOR: (state, actions) => {
    state.actions = actions;
  },
}
