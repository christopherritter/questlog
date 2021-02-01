<template>
  <div id="map"></div>
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
      // The location of the Learning Tree Farm
      const learningTreeFarm = {
        lat: 39.69731517786061,
        lng: -84.30524990191205
      };
      // The map, centered at the Learning Tree Farm
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 19,
        center: learningTreeFarm,
        mapId: 'b5c77f93da5a90ff',
      });
      // The marker, positioned at the Learning Tree Farm
      const marker = new google.maps.Marker({
        position: learningTreeFarm,
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
