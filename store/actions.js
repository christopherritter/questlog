export default {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

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

  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        // console.info('idToken', idToken)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', { authUser })
  },

  checkVuexStore(ctx) {
    if (this.$fire.auth === null) {
      throw 'Vuex Store example not working - this.$fire.auth cannot be accessed.'
    }

    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    )
  },

  beginQuest({ state, commit }, questId) {
    const quest = state.quests[questId];
    commit('SET_QUEST', quest);
  },

  // Editor Locations

  addLocation({ commit }, location) {
    commit('ADD_LOCATION', location)
  },

  selectLocation({ state, commit }, location) {
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

    commit('SET_LOCATION', newLocation);
    return selectedLocation;
  },

  clearLocation({ commit }) {
    commit('CLEAR_LOCATION');
  },

  updateCoordinates({ commit }, location) {
    commit('SET_COORDINATES', { index: location.index, coordinates: location.coordinates  });
  },

  updateLocation({ commit }, { selectedLocation, newLocation }) {
    commit('UPDATE_LOCATION', { selectedLocation, newLocation })
  },

  // Editor Objectives

  addObjective({ commit }, objective) {
    commit('ADD_OBJECTIVE', objective)
  },

  updateObjective({ commit }, objective ) {
    console.log(objective)
    console.log("Objective No. " + objective.currentObjective)
    console.log(objective.newObjective)
    commit('UPDATE_OBJECTIVE', {
      currentObjective: objective.currentObjective,
      newObjective: objective.newObjective
    })
  },

  updateObjectives({ commit }, objectives) {
    console.log("Updating Objectives")
    commit('SET_OBJECTIVES', objectives)
  },

  // Editor Entries

  addEntry({ commit }, entry ) {
    commit('ADD_ENTRY', entry)
  },

  selectEntry({ state, commit }, index) {
    const entry = state.editor.entries[index];
    commit('SET_ENTRY', entry);
  },

  clearEntry({ commit }) {
    commit('CLEAR_ENTRY');
  },

  removeEntry({ state, commit}, index) {
    console.log("Remove Entry No. " + index)
    var entries = state.editor.entries;
    var newEntries = entries.slice(index, 1)
    console.log(newEntries)
    commit('SET_ENTRIES', newEntries)
  },

  updateEntry({ commit }, { selectedEntry, newEntry }) {
    commit('UPDATE_ENTRY', { selectedEntry, newEntry })
  },

  updateEntries({ commit }, entries) {
    commit('SET_ENTRIES', entries)
  },

// Editor Items

  addItem({ commit }, item ) {
    commit('ADD_ITEM', item)
  },

  selectItem({ state, commit }, index) {
    const item = state.editor.items[index];
    commit('SET_ITEM', item);
  },

  clearItem({ commit }) {
    commit('CLEAR_ITEM');
  },

  removeItem({ state, commit}, index) {
    console.log("Remove Item No. " + index)
    var items = state.editor.items;
    var newItems = items.slice(index, 1)
    console.log(newItems)
    commit('SET_ITEMS', newItems)
  },

  updateItem({ commit }, { selectedItem, newItem }) {
    commit('UPDATE_ITEM', { selectedItem, newItem })
  },

  updateItems({ commit }, items) {
    commit('SET_ITEMS', items)
  },

}
