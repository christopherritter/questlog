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
    state,
    commit
  }, questId) {
    const quest = state.demoData.quests[questId];
    commit('SET_QUEST', {
      quest,
      questId
    });
  },


  // 'PLAY QUEST'
  // 'EDIT QUEST'

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

      if (!quest.locations) {
        quest.locations = [];
      }

      if (!quest.objectives) {
        quest.objectives = [];
      }

      const result = await this.$fire.firestore.collection('quests').add(quest);
      const update = await this.$fire.firestore.collection('quests').doc(result.id).update({
        questId: result.id
      })

      commit('SET_QUEST_EDITOR', {
        quest: quest,
        questId: result.id
      })
    } else {
      const quest = state.editor.quest;
      const questId = quest.questId;
      const questRef = this.$fire.firestore.collection('quests').doc(questId);
      const result = await questRef.update(quest);
    }
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
