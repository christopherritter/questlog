export default {

  // Auth

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

  // Users

  async fetchUserProfile({
    state,
    commit
  }, uid) {
    const userRef = this.$fire.firestore.collection('users').doc(uid);

    const doc = await userRef.get();
    if (!doc.exists) {
      // console.log('No such document!');
      const newUserRef = this.$fire.firestore.collection('users').doc(uid);

      var newUser = {
        email: state.authUser.email,
        myFavorites: [],
        myQuests: [],
        name: "Anonymous",
        userId: uid
      }

      // Later...
      const res = await newUserRef.set(newUser);

      commit("SET_USER", newUser);
      this.$router.push("/");
    } else {
      var profile = doc.data();
      if (profile.name.length <= 0) this.$router.push({
        name: 'profile'
      });
      commit("SET_USER", profile);
      this.$router.push("/");
    }

  },

  async updateUserName({
    state,
    commit
  }, userName) {
    const userRef = this.$fire.firestore.collection('users').doc(state.authUser.uid);
    const result = await userRef.update({
      name: userName
    });
    commit("SET_USER_NAME", userName);
  },

  // Quest

  async publishQuest({
    state,
    commit
  }) {
    if (state.quest.questId.length > 0) {
      console.log("Found quest id " + state.quest.questId)
      const db = this.$fire.firestore;
      const questId = state.quest.questId;
      const questRef = db.collection('quests').doc(questId);
      const objectivesRef = questRef.collection("objectives");
      const locationsRef = questRef.collection("locations");
      const entriesRef = questRef.collection("entries");
      const itemsRef = questRef.collection("items");

      // Get a new write batch
      const batch = db.batch();

      batch.update(questRef, state.quest)

      state.objectives.forEach(objective => {
        batch.set(objectivesRef.doc(objective.objectiveId), objective)
      });

      state.locations.forEach(location => {
        batch.set(locationsRef.doc(location.locationId), location)
      });

      state.entries.forEach(entry => {
        batch.set(entriesRef.doc(entry.entryId), entry)
      });

      state.items.forEach(item => {
        batch.set(itemsRef.doc(item.itemId), item)
      });

      // Commit the batch
      await batch.commit();
    } else {
      console.log("No quest found")
      var quest = {};
      Object.assign(quest, state.quest)

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

      const result = await this.$fire.firestore.collection('quests').add(quest);
      const update = await this.$fire.firestore.collection('quests').doc(result.id).update({
        questId: result.id
      })

      console.log("Committing quest")

      quest.questId = result.id;

      console.log(quest)
      commit("SET_QUEST", quest);
    }
  },

  setQuest({
    commit
  }, obj) {
    commit('SET_QUEST', obj.quest);
    commit('SET_OBJECTIVES', obj.objectives);
    commit('SET_LOCATIONS', obj.locations);
    commit('SET_ENTRIES', obj.entries);
    commit('SET_ITEMS', obj.items);
  },

  // Objectives

  setObjective({ state, dispatch, commit }, obj) {
    dispatch("findWithAttr", {
      array: state.objectives,
      attr: "objectiveId",
      value: obj.objectiveId,
    }).then(index => {
      commit("SET_OBJECTIVE", { index: index, bool: obj.bool })
    })
  },

  async addObjective({
    state,
    commit
  }, objective) {
    const objectivesRef = this.$fire.firestore.collection('quests').doc(state.quest.questId).collection("objectives");
    var newObjective = objective;

    const result = await objectivesRef.add(objective);
    newObjective.objectiveId = result.id;
    commit("ADD_OBJECTIVE", newObjective);

    const update = objectivesRef.doc(result.id).update({
      objectiveId: result.id
    });
  },

  async updateObjective({
    state,
    commit
  }, objective) {
    const questId = state.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const objectiveId = state.objectives[objective.currentObjective].objectiveId;
    const objectivesRef = questRef.doc(questId).collection("objectives");

    var newObjective = objective.newObjective;
    var currentObjective = objective.currentObjective;

    commit("UPDATE_OBJECTIVE", {
      currentObjective: currentObjective,
      newObjective: newObjective
    });

    const update = await objectivesRef.doc(objectiveId).update(newObjective);
  },

  async deleteObjective({
    state,
    commit
  }, index) {
    const questId = state.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const objectiveId = state.objectives[index].objectiveId;
    const objectivesRef = questRef.doc(questId).collection("objectives");

    var newObjectives = state.objectives.filter(objective => objective.objectiveId != objectiveId)
    commit("SET_OBJECTIVES", newObjectives)

    const res = await objectivesRef.doc(objectiveId).delete();
  },

  // Locations

  selectLocation({
    state,
    commit
  }, location) {
    const locations = state.quest.locations;
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

    // commit('SET_LOCATION', newLocation);
    return selectedLocation;
  },

  async addLocation({
    state,
    commit
  }, location) {
    const locationsRef = this.$fire.firestore.collection('quests').doc(state.quest.questId).collection("locations");
    var newLocation = location;

    const result = await locationsRef.add(location);
    newLocation.locationId = result.id;
    commit("ADD_LOCATION", newLocation);

    const update = locationsRef.doc(result.id).update({
      locationId: result.id
    });
  },

  async updateLocation({
    state,
    commit
  }, location) {
    const questId = state.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const locationId = state.locations[location.selectedLocation].locationId;
    const locationsRef = questRef.doc(questId).collection("locations");

    var newLocation = location.newLocation;
    var currentLocation = location.selectedLocation;

    commit("UPDATE_LOCATION", {
      currentLocation: currentLocation,
      newLocation: newLocation
    });

    const update = await locationsRef.doc(locationId).update(newLocation);
  },

  async deleteLocation({
    state,
    commit
  }, index) {
    const questId = state.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const locationId = state.locations[index].locationId;
    const locationsRef = questRef.doc(questId).collection("locations");

    var newLocations = state.locations.filter(location => location.locationId != locationId)
    commit("SET_LOCATIONS", newLocations)

    const res = await locationsRef.doc(locationId).delete();
  },

  // Entries

  async addEntry({
    state,
    commit
  }, entry) {
    const questId = state.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const entriesRef = questRef.doc(questId).collection("entries");
    var newEntry = entry;

    const result = await entriesRef.add(newEntry);
    newEntry.entryId = result.id;
    commit("ADD_ENTRY", newEntry);

    const update = entriesRef.doc(result.id).update({
      entryId: result.id
    });
  },

  updateEntry({ state, dispatch, commit }, entry) {
    dispatch("findWithAttr", {
      array: state.entries,
      attr: "entryId",
      value: entry.entryId,
    }).then(index => {
      commit("UPDATE_ENTRY", { index, entry })
    })
  },

  async deleteEntry({
    state,
    commit
  }, entryId) {
    const questId = state.quest.questId;
    const questRef = this.$fire.firestore.collection('quests');
    const entriesRef = questRef.doc(questId).collection("entries");

    var newEntries = state.entries.filter(entry => entry.entryId != entryId)
    commit("SET_ENTRIES", newEntries)

    const res = await entriesRef.doc(entryId).delete();
  },

  // Items

  async addItem({
    state,
    commit
  }, item) {
    const questId = state.quest.questId;
    const questRef = this.$fire.firestore.collection("quests");
    const itemsRef = questRef.doc(questId).collection("items");
    var newItem = item;

    const result = await itemsRef.add(newItem);
    newItem.itemId = result.id;
    commit("ADD_ITEM", newItem);

    const update = itemsRef.doc(result.id).update({
      itemId: result.id
    });
  },

  updateItem({ state, dispatch, commit }, item) {
    dispatch("findWithAttr", {
      array: state.items,
      attr: "itemId",
      value: item.itemId,
    }).then(index => {
      commit("UPDATE_ITEM", { index, item })
    })
  },

  async deleteItem({
    state,
    commit
  }, itemId) {
    const questId = state.quest.questId;
    const questRef = this.$fire.firestore.collection("quests");
    const itemsRef = questRef.doc(questId).collection("items");

    var newItems = state.items.filter(item => item.itemId != itemId)
    commit("SET_ITEMS", newItems);

    const res = await itemsRef.doc(itemId).delete();
  },

  // Utils

  findWithAttr({}, {
    array,
    attr,
    value
  }) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

}
