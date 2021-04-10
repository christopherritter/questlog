import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - QuestLog',
    title: 'QuestLog Location-Based Adventures',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'QuestLog is a new project by Christopher Ritter which brings Choose-Your-Own-Adventures into the real world. Stay tuned to this channel for more updates!'
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://questlog-nine.vercel.app/"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "QuestLog Location-Based Adventures"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "QuestLog is a new project by Christopher Ritter which brings Choose-Your-Own-Adventures into the real world. Stay tuned to this channel for more updates!"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://questlog-nine.vercel.app/thumbnail.png",
      },
      {
        hid: "twitter:card",
        property: "twitter:card",
        content: "summary_large_image"
      },
      {
        hid: "twitter:url",
        property: "twitter:url",
        content: "https://questlog-nine.vercel.app/"
      },
      {
        hid: "twitter:title",
        property: "twitter:title",
        content: "QuestLog Location-Based Adventures"
      },
      {
        hid: "twitter:description",
        property: "twitter:description",
        content: "QuestLog is a new project by Christopher Ritter which brings Choose-Your-Own-Adventures into the real world. Stay tuned to this channel for more updates!"
      },
      {
        hid: "twitter:image",
        property: "twitter:image",
        content: "https://questlog-nine.vercel.app/thumbnail.png",
      },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      href: "https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css",
      rel: "stylesheet",
      type: "text/css"
    }]
  },

  hooks: {
    generate: {
      async before(generator) {
        const {
          default: firebase
        } = await import('firebase/app');

        await import('firebase/firestore');

        if (!firebase.apps.length) {
          firebase.initializeApp(generator.options.firebase.config);
        }

        generator.firebase = firebase.apps[0];
      },
      done(generator) {
        generator.firebase.firestore().terminate()
          .then(() => console.log('Firestore terminated'))
          .catch(console.error);
      }
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/firebase',
    ['nuxt-gmaps', {
      key: process.env.FIREBASE_API_KEY,
      //you can use libraries: ['places']
    }],
    'nuxt-leaflet',
  ],

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },

  publicRuntimeConfig: {
    // googleAnalytics: {
    //   id: process.env.GOOGLE_ANALYTICS_ID
    // }
    mapboxPublicToken: process.env.MAPBOX_PUBLIC_TOKEN,
  },

  privateRuntimeConfig: {
    mapboxToken: process.env.MAPBOX_ACCESS_TOKEN
  },

  firebase: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: "questlog-41105.firebaseapp.com",
      // databaseURL: '<databaseURL>',
      projectId: "questlog-41105",
      storageBucket: "questlog-41105.appspot.com",
      messagingSenderId: "74040077240",
      appId: "1:74040077240:web:c529fd977af88dd41c3d4d",
      measurementId: "G-6TZTKVC4M7"
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged',
        }
      },
      firestore: true,
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
