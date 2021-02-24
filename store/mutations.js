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

  SET_USER: ( state, user) => {
    state.user = user
  },

  SET_QUEST: (state, obj) => {
    state.quest = {
      questId: obj.questId,
      title: obj.quest.title,
      author: obj.quest.author,
      description: obj.quest.description,
      image: obj.quest.image,
      categories: obj.quest.categories,
      // favorite: obj.quest.favorite,
      featured: obj.quest.featured,
      region: obj.quest.region,
      objectives: obj.quest.objectives,
      locations: obj.quest.locations,
      entries: obj.quest.entries,
      items: obj.quest.items,
      startingPoint: obj.quest.startingPoint,
    }
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
    state.editor.quest.region = region;
  },

  ADD_OBJECTIVE_EDITOR: (state, objective) => {
    state.editor.quest.objectives.push(objective);
  },

  UPDATE_OBJECTIVE_EDITOR: (state, objective) => {
    state.editor.quest.objectives[objective.currentObjective] = {
      name: objective.newObjective.name,
      description: objective.newObjective.description,
      isPrimary: objective.newObjective.isPrimary,
    };
  },

  SET_OBJECTIVES_EDITOR: (state, objectives) => {
    state.editor.quest.objectives = objectives;
  },

  ADD_LOCATION_EDITOR: (state, location) => {
    state.editor.quest.locations.push(location);
  },

  UPDATE_LOCATION_EDITOR: (state, location) => {
    Object.assign(state.editor.quest.locations[location.selectedLocation],
      location.newLocation);
  },

  SET_COORDINATES_EDITOR: (state, location) => {
    state.editor.quest.locations[location.index].coordinates = location.coordinates;
  },

  ADD_ENTRY_EDITOR: (state, obj) => {
    state.editor.quest.locations[obj.selectedLocation].entries.push(obj.entry);
  },

  UPDATE_ENTRY_EDITOR: (state, obj) => {
    Object.assign(state.editor.quest.locations[obj.selectedLocation].entries[obj.selectedEntry],
      obj.entry);
  },

  REMOVE_ENTRY_EDITOR: (state, obj) => {
    state.editor.quest.locations[obj.locationIndex].entries.splice(obj.entryIndex, 1);
  },

  ADD_ITEM_EDITOR: (state, obj) => {
    state.editor.quest.locations[obj.selectedLocation].items.push(obj.item);
  },

  UPDATE_ITEM_EDITOR: (state, obj) => {
    Object.assign(state.editor.quest.locations[obj.selectedLocation].items[obj.selectedItem],
      obj.item);
  },

  REMOVE_ITEM_EDITOR: (state, obj) => {
    state.editor.quest.locations[obj.locationIndex].entries.splice(obj.itemIndex, 1);
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
