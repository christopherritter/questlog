<template>
  <v-row class="fill-height">
    <v-col>
      <div id="map"></div>
    </v-col>
  </v-row>
</template>

<script>
const apiKey = process.env.FIREBASE_API_KEY; // Package: @nuxtjs/dotenv
export default {
  mounted() {
    // if (!process.server) {
    if (typeof google === "undefined") {
      const script = document.createElement("script");
      script.onload = this.onScriptLoaded;
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      document.head.appendChild(script);
    } else {
      this.onScriptLoaded();
    }

    // }
  },
  methods: {
    onScriptLoaded(event = null) {
      // YOU HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
      // if (event) {
      //  console.log('Was added')
      // } else {
      //  console.log('Already existed')
      // }
      // The location of Uluru
      const uluru = { lat: -25.344, lng: 131.036 };
      // The map, centered at Uluru
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru
      });
      // The marker, positioned at Uluru
      const marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }
  }
};
</script>

<style scoped>
#map {
  height: 100%;
  min-height: 400px;
  width: 100%;
}
</style>
