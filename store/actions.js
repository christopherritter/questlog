export default {
  async nuxtServerInit({
    dispatch
  }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const {
        allClaims: claims,
        ...authUser
      } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },

  async onAuthStateChanged({
    commit,
    dispatch
  }, {
    authUser
  }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        // const idToken = await authUser.getIdToken(true)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', {
      authUser
    })
    dispatch('fetchUserProfile', authUser.uid);
  },

  async fetchUserProfile({
    commit
  }, uid) {
    const userRef = this.$fire.firestore.collection('users').doc(uid);

    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      var profile = doc.data();
      if (profile.name.length <= 0) this.$router.push({
        name: 'profile'
      });
      commit("SET_USER", profile);
      // this.$router.back();
    }

    // userRef.get()
    //   .then((docSnapshot) => {
    //     if (docSnapshot.exists) {
    //       console.log(docSnapshot)
    //       userRef.onSnapshot((doc) => {
    //         console.log(doc.data)
    //         if (!doc.data.name) this.$router.push({ name: 'profile' });
    //       });
    //     } else {
    //       this.$router.back();
    //     }
    //   });

  },

  async updateUserName({
    state
  }, name) {
    const userRef = this.$fire.firestore.collection('users').doc(state.authUser.uid);
    const result = await userRef.update({
      name: name
    });
  },

  // Quest

  // There is no 'BEGIN QUEST'
  // There is only:
  // 'READ QUEST'

  readQuest({
    commit
  }, quest) {
    commit('SET_QUEST', quest);
  },

  // 'PLAY QUEST'
  // 'EDIT QUEST'

  editQuest({
    commit
  }, obj) {
    commit('SET_QUEST_EDITOR', {
      quest: obj.quest,
      questId: obj.questId
    });
  },

  // Editor

  async publishQuest({
    state,
    commit
  }) {
    if (!state.editor.quest.questId) {
      var quest = {};
      Object.assign(quest, state.editor.quest)

      if (!quest.title) quest.title = "Untitled";

      if (!quest.author) {
        quest.author = state.user.name;
        quest.authorId = state.user.userId;
      }

      if (!quest.description) quest.description = "";

      if (!quest.image) quest.image = "";

      if (!quest.categories) quest.categories = [];

      if (!quest.region) {
        quest.region = {
          name: "Center of America",
          coordinates: [39.828175, -98.5795],
          zoom: 18,
          draggable: true
        }
      }

      // if (!quest.locations) {
      //   quest.locations = [];
      // }

      // if (!quest.objectives) {
      //   quest.objectives = [];
      // }

      const result = await this.$fire.firestore.collection('quests').add(quest);
      const update = await this.$fire.firestore.collection('quests').doc(result.id).update({
        questId: result.id
      })

      commit('SET_QUEST_EDITOR', {
        quest: quest,
        questId: result.id
      })
    } else {
      const db = this.$fire.firestore;
      const questId = state.editor.quest.questId;
      const questRef = db.collection('quests').doc(questId);
      const objectivesRef = questRef.collection("objectives");
      const locationsRef = questRef.collection("locations");

      // Get a new write batch
      const batch = db.batch();

      batch.update(questRef, state.editor.quest)

      state.editor.objectives.forEach(objective => {
        batch.set(objectivesRef.doc(objective.objectiveId), objective )
      });

      state.editor.locations.forEach(location => {
        batch.set(locationsRef.doc(location.locationId), location )
      });

      // Commit the batch
      await batch.commit();
    }
  },

  // Editor Objectives

  async addObjective({
    state,
    commit
  }, objective) {
    const objectivesRef = this.$fire.firestore.collection('quests').doc(state.editor.quest.questId).collection("objectives");
    var newObjective = objective;

    const result = await objectivesRef.add(objective);
    newObjective.objectiveId = result.id;
    commit("ADD_OBJECTIVE_EDITOR", newObjective);

    const update = objectivesRef.doc(result.id).update({
      objectiveId: result.id
    });
  },

  async updateObjective({
    state,
    commit
  }, objective) {
    const questId = state.editor.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const objectiveId = state.editor.objectives[objective.currentObjective].objectiveId;
    const objectivesRef = questRef.doc(questId).collection("objectives");

    var newObjective = objective.newObjective;
    var currentObjective = objective.currentObjective;

    commit("UPDATE_OBJECTIVE_EDITOR", {
      currentObjective: currentObjective,
      newObjective: newObjective
    });

    const update = await objectivesRef.doc(objectiveId).update(newObjective);
  },

  async deleteObjective({ state, commit }, index) {
    const questId = state.editor.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const objectiveId = state.editor.objectives[index].objectiveId;
    const objectivesRef = questRef.doc(questId).collection("objectives");

    var newObjectives = state.editor.objectives.filter(objective => objective.objectiveId != objectiveId)
    commit("SET_OBJECTIVES_EDITOR", newObjectives)

    const res = await objectivesRef.doc(objectiveId).delete();
  },

  // Editor Locations

  selectLocation({
    state,
    commit
  }, location) {
    const locations = state.editor.quest.locations;
    var position = location.sourceTarget.getLatLng();
    var newLocation, selectedLocation;

    for (let i = 0; i < locations.length; i++) {
      var currentPosition = locations[i].coordinates;
      if (
        position.lat === currentPosition[0] &&
        position.lng === currentPosition[1]
      ) {
        newLocation = locations[i];
        selectedLocation = i;
      }
    }

    // commit('SET_LOCATION_EDITOR', newLocation);
    return selectedLocation;
  },

  async addLocation({
    state,
    commit
  }, location) {
    const locationsRef = this.$fire.firestore.collection('quests').doc(state.editor.quest.questId).collection("locations");
    var newLocation = location;

    const result = await locationsRef.add(location);
    newLocation.locationId = result.id;
    commit("ADD_LOCATION_EDITOR", newLocation);

    const update = locationsRef.doc(result.id).update({
      locationId: result.id
    });
  },

  async updateLocation({
    state,
    commit
  }, location) {
    const questId = state.editor.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const locationId = state.editor.locations[location.currentLocation].locationId;
    const locationsRef = questRef.doc(questId).collection("locations");

    var newLocation = location.newLocation;
    var currentLocation = location.currentLocation;

    commit("UPDATE_LOCATION_EDITOR", {
      currentLocation: currentLocation,
      newLocation: newLocation
    });

    const update = await locationsRef.doc(locationId).update(newLocation);
  },

  async deleteLocation({ state, commit }, index) {
    const questId = state.editor.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const locationId = state.editor.locations[index].locationId;
    const locationsRef = questRef.doc(questId).collection("locations");

    var newLocations = state.editor.locations.filter(location => location.locationId != locationId)
    commit("SET_LOCATIONS_EDITOR", newLocations)

    const res = await locationsRef.doc(locationId).delete();
  },

  // Editor Items

  addItem({
    commit
  }, item) {
    commit('ADD_ITEM', item)
  },

  selectItem({
    state,
    commit
  }, index) {
    const item = state.editor.quest.items[index];
    commit('SET_ITEM', item);
  },

  clearItem({
    commit
  }) {
    commit('CLEAR_ITEM');
  },

  removeItem({
    state,
    commit
  }, index) {
    console.log("Remove Item No. " + index)
    var items = state.editor.quest.items;
    var newItems = items.slice(index, 1)
    console.log(newItems)
    commit('SET_ITEMS', newItems)
  },

  updateItem({
    commit
  }, {
    selectedItem,
    newItem
  }) {
    commit('UPDATE_ITEM', {
      selectedItem,
      newItem
    })
  },

  updateItems({
    commit
  }, items) {
    commit('SET_ITEMS', items)
  },

  // Editor Actions

  addAction({
    commit
  }, action) {
    commit('ADD_ACTION', action)
  },

  updateAction({
    commit
  }, action) {
    console.log(action)
    console.log("Action No. " + action.currentAction)
    console.log(action.newAction)
    commit('UPDATE_ACTION', {
      currentAction: action.currentAction,
      newAction: action.newAction
    })
  },

  updateActions({
    commit
  }, actions) {
    console.log("Updating Actions")
    commit('SET_ACTIONS', actions)
  },

}
