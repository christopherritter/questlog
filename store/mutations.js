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

  SET_QUEST: (state, quest) => {
    state.quest = quest
  },

  SET_REGION: (state, region) => {
    state.region = region;
  },

  SET_OBJECTIVE: (state, {
    id,
    bool
  }) => {
    state.demoData.objectives[id].isComplete = bool;
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

  // _EDITOR

  SET_QUEST_EDITOR: (state, quest) => {
    state.editor.quest = quest;
  },

  CLEAR_QUEST_EDITOR: (state) => {
    state.editor.quest = {};
    state.editor.objectives = [];
    state.editor.locations = [];
  },

  SET_DETAILS_EDITOR: (state, details) => {
    state.editor.quest.title = details.title || "Untitled";
    state.editor.quest.author = details.author || "Anonymous";
    state.editor.quest.authorId = state.authUser.uid;
    state.editor.quest.description = details.description || "";
    state.editor.quest.image = details.image || "";
    state.editor.quest.categories = details.categories || [];
    state.editor.quest.featured = false;
  },

  SET_REGION_EDITOR: (state, region) => {
    state.editor.quest.region = region;
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
  },

  SET_OBJECTIVES_EDITOR: (state, objectives) => {
    state.editor.objectives = objectives;
  },

  ADD_LOCATION_EDITOR: (state, location) => {
    state.editor.locations.push(location);
  },

  UPDATE_LOCATION_EDITOR: (state, location) => {
    Object.assign(state.editor.locations[location.selectedLocation],
      location.newLocation);
  },

  SET_LOCATIONS_EDITOR: (state, locations) => {
    state.editor.locations = locations;
  },

  SET_COORDINATES_EDITOR: (state, location) => {
    state.editor.locations[location.index].coordinates = location.coords;
  },

  ADD_ENTRY_EDITOR: (state, obj) => {
    state.editor.locations[obj.selectedLocation].entries.push(obj.entry);
  },

  UPDATE_ENTRY_EDITOR: (state, obj) => {
    Object.assign(state.editor.locations[obj.selectedLocation].entries[obj.selectedEntry],
      obj.entry);
  },

  REMOVE_ENTRY_EDITOR: (state, obj) => {
    state.editor.locations[obj.locationIndex].entries.splice(obj.entryIndex, 1);
  },

  ADD_ITEM_EDITOR: (state, obj) => {
    state.editor.locations[obj.selectedLocation].items.push(obj.item);
  },

  UPDATE_ITEM_EDITOR: (state, obj) => {
    Object.assign(state.editor.locations[obj.selectedLocation].items[obj.selectedItem],
      obj.item);
  },

  REMOVE_ITEM_EDITOR: (state, obj) => {
    state.editor.locations[obj.locationIndex].entries.splice(obj.itemIndex, 1);
  },

  ADD_ACTION_EDITOR: (state, action) => {
    state.editor.actions.push(action);
  },

  UPDATE_ACTION_EDITOR: (state, action) => {
    state.editor.actions[action.currentAction] = {
      name: action.newAction.name,
      type: action.newAction.type,
      target: action.newAction.target,
    };
  },

  SET_ACTIONS_EDITOR: (state, actions) => {
    state.editor.actions = actions;
  },
}
