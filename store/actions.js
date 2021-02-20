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
    dispatch('fetchUserProfile', { userId: authUser.uid, email: authUser.email });
  },

  async fetchUserProfile(ctx, user) {
    const userRef = this.$fire.firestore.collection('users').doc(user.userId);

    userRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          userRef.onSnapshot((doc) => {
            if (!doc.name) this.$router.push({ name: 'profile' });
          });
        } else {
          userRef.set({
            userId: user.userId,
            email: user.email,
          })
        }
      });

  },

  beginQuest({
    state,
    commit
  }, questId) {
    const quest = state.quests[questId];
    commit('SET_QUEST', quest);
  },

  // Editor Locations

  selectLocation({
    state,
    commit
  }, location) {
    const locations = state.editor.locations;
    var position = location.sourceTarget.getLatLng();
    var newLocation, selectedLocation;

    for (let i = 0; i < locations.length; i++) {
      var currentPosition = locations[i].coordinates;
      if (
        position.lat === currentPosition.lat &&
        position.lng === currentPosition.lng
      ) {
        newLocation = locations[i];
        selectedLocation = i;
      }
    }

    commit('SET_LOCATION_EDITOR', newLocation);
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
    const item = state.editor.items[index];
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
    var items = state.editor.items;
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
