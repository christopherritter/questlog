<template>
  <div id="map"></div>
</template>

<script>
const apiKey = process.env.FIREBASE_API_KEY; // Package: @nuxtjs/dotenv

export default {
  props: ["questId", "position", "location", "zoom"],
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
      const quest = this.$store.state.quests[this.questId];
      const region = this.$store.state.regions[quest.region];

      // The map, centered at the Learning Tree Farm
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: region.zoom,
        center: region.position,
        mapId: "b5c77f93da5a90ff"
      });
      // The marker, positioned at the Learning Tree Farm
      // const marker = new google.maps.Marker({
      //   position: this.$store.state.quests[this.questId].region.position,
      //   map: map
      // });

      const locations = this.$store.state.locations;
      var infowindow =  new google.maps.InfoWindow({});
      var marker, count;

      for (count = 0; count < locations.length; count++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            locations[count].position.lat,
            locations[count].position.lng
          ),
          icon: {
            url: require('~/assets/img/' + locations[count].marker),
            anchor: new google.maps.Point(25, 25),
          },
          map: map,
          title: locations[count].name
        });
        google.maps.event.addListener(
          marker,
          "click",
          (function(marker, count) {
            return function() {
              infowindow.setContent('<h4 class="grey--text text--darken-4">' + locations[count].name + '</h4>');
              infowindow.open(map, marker);
            };
          })(marker, count)
        );
      }
    }
  },
  watch: {
    position(newVal, oldVal) {
      // var map = google.maps.Map(document.getElementById("map"));
      // var latLng = new google.maps.LatLng(newVal.lat, newVal.lng);

      console.log(newVal.lat, newVal.lng)
      // map.setCenter(latLng);
    }
  }
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
