<template>
  <div id="map"></div>
</template>

<script>
const apiKey = process.env.FIREBASE_API_KEY; // Package: @nuxtjs/dotenv

export default {
  props: ["questId"],
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
      // The map, centered at the Learning Tree Farm
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: this.$store.state.quests[this.questId].region.zoom,
        center: this.$store.state.quests[this.questId].region.position,
        mapId: "b5c77f93da5a90ff"
      });
      // The marker, positioned at the Learning Tree Farm
      // const marker = new google.maps.Marker({
      //   position: this.$store.state.quests[this.questId].region.position,
      //   map: map
      // });

      var locations = this.$store.state.quests[this.questId].locations;
      var infowindow =  new google.maps.InfoWindow({});
      var marker, count;

      for (count = 0; count < locations.length; count++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            locations[count].position.lat,
            locations[count].position.lng
          ),
          map: map,
          title: locations[count].title
        });
        google.maps.event.addListener(
          marker,
          "click",
          (function(marker, count) {
            return function() {
              infowindow.setContent(locations[count][0]);
              infowindow.open(map, marker);
            };
          })(marker, count)
        );
      }
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
