import initialState from './state'

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    }
  },

  SET_QUEST: (state, quest) => {
    state.quest = {
      id: quest.id,
      title: quest.title,
      author: quest.author,
      description: quest.description,
      image: quest.image,
      categories: quest.categories,
      // favorite: quest.favorite,
      featured: quest.featured,
      region: quest.region,
      objectives: quest.objectives,
      locations: quest.locations,
      entries: quest.entries,
      items: quest.items,
      startingPoint: quest.startingPoint,
    }
  },

  SET_REGION: (state, region) => {
    state.region = {
      id: region.id,
      name: region.name,
      position: {
        lat: region.position.lat,
        lng: region.position.lng,
      },
      zoom: region.zoom
    }
  },

  SET_LOCATION: (state, location) => {
    state.location = {
      id: location.id,
      name: location.name,
      isLandmark: location.isLandmark,
      position: {
        lat: location.position.lat,
        lng: location.position.lng,
      },
      zoom: location.zoom,
      image: location.image,
      marker: location.marker,
      entries: location.entries,
    }
  },
}
