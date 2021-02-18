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

  addLocation({ commit }, location) {
    commit('ADD_LOCATION', location)
  },

  selectLocation({ state, commit }, location) {
    const locations = state.editor.locations;
    var position = location.target.getLatLng();
    var selectedLocation;

    for (let i = 0; i < locations.length; i++) {
      var currentPosition = locations[i].coordinates;
      if (
        position.lat === currentPosition.lat &&
        position.lng === currentPosition.lng
      ) {
        selectedLocation = locations[i];
      }
    }

    commit('SET_LOCATION', selectedLocation);
    return selectedLocation;
  },

  clearLocation({ commit }) {
    commit('CLEAR_LOCATION');
  },

  updateObjective({ commit }, { id, bool } ) {
    commit("SET_OBJECTIVE", { id, bool } );
  },

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
    console.log("Updating Entry")
    commit('UPDATE_ENTRY', { selectedEntry, newEntry })
  },

  updateEntries({ commit }, entries) {
    console.log("Updating Entries")
    commit('SET_ENTRIES', entries)
  },

}
