<template>
  <!-- <div id="map"></div> -->
  <GMap
    ref="gMap"
    language="en"
    :cluster="{ options: { styles: clusterStyle } }"
    :center="{ lat: position.lat, lng: position.lng }"
    :options="{ fullscreenControl: false }"
    :zoom="zoom"
    class="fill-height"
    height="100%"
  >
    <GMapMarker
      v-for="location in locations"
      :key="location.id"
      :position="{ lat: location.position.lat, lng: location.position.lng }"
      :options="{ icon: require('~/assets/img/' + location.marker) }"
      @click="currentLocation = location"
    >
      <GMapInfoWindow :options="{ maxWidth: 200 }">
        <code> lat: {{ location.position.lat }}, lng: {{ location.position.lng }} </code>
      </GMapInfoWindow>
    </GMapMarker>
    <!-- <GMapCircle :options="circleOptions" /> -->
  </GMap>
</template>

<script>
// const apiKey = process.env.FIREBASE_API_KEY; // Package: @nuxtjs/dotenv

export default {
  data() {
    return {
      currentLocation: {},
      // circleOptions: {
      //   ...
      // },
      // locations: [
      //   {
      //     lat: 44.933076,
      //     lng: 15.629058
      //   },
      //   {
      //     lat: 45.815,
      //     lng: "15.9819"
      //   },
      //   {
      //     lat: "45.12",
      //     lng: "16.21"
      //   }
      // ],
      // pins: {
      //   selected: "data:image/png;base64,iVBORw0KGgo...",
      //   notSelected: "data:image/png;base64,iVBORw0KGgo..."
      // },
      // mapStyle: [...],
      clusterStyle: [
        {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 56,
          textColor: "#fff"
        }
      ]
    };
  },
  props: ["questId", "position", "location", "zoom"],
  computed: {
    locations () {
      return this.$store.state.locations
    }
  },
  // mounted() {
  //   // if (!process.server) {
  //   if (typeof google === "undefined") {
  //     const script = document.createElement("script");
  //     script.onload = this.onScriptLoaded;
  //     script.type = "text/javascript";
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  //     document.head.appendChild(script);
  //   } else {
  //     this.onScriptLoaded();
  //   }

  //   // }
  // },
  // methods: {
  //   onScriptLoaded(event = null) {
  //     const quest = this.$store.state.quests[this.questId];
  //     const region = this.$store.state.regions[quest.region];

  //     // The map, centered at the Learning Tree Farm
  //     const map = new google.maps.Map(document.getElementById("map"), {
  //       zoom: region.zoom,
  //       center: region.position,
  //       mapId: "b5c77f93da5a90ff"
  //     });
  //     // The marker, positioned at the Learning Tree Farm
  //     // const marker = new google.maps.Marker({
  //     //   position: this.$store.state.quests[this.questId].region.position,
  //     //   map: map
  //     // });

  //     const locations = this.$store.state.locations;
  //     var infowindow = new google.maps.InfoWindow({});
  //     var marker, count;

  //     for (count = 0; count < locations.length; count++) {
  //       marker = new google.maps.Marker({
  //         position: new google.maps.LatLng(
  //           locations[count].position.lat,
  //           locations[count].position.lng
  //         ),
  //         icon: {
  //           url: require("~/assets/img/" + locations[count].marker),
  //           anchor: new google.maps.Point(25, 25)
  //         },
  //         map: map,
  //         title: locations[count].name
  //       });
  //       google.maps.event.addListener(
  //         marker,
  //         "click",
  //         (function(marker, count) {
  //           return function() {
  //             infowindow.setContent(
  //               '<h4 class="grey--text text--darken-4">' +
  //                 locations[count].name +
  //                 "</h4>"
  //             );
  //             infowindow.open(map, marker);
  //           };
  //         })(marker, count)
  //       );
  //     }
  //   }
  // },
  watch: {
    position(newVal, oldVal) {
      // var map = google.maps.Map(document.getElementById("map"));
      // var latLng = new google.maps.LatLng(newVal.lat, newVal.lng);

      console.log(newVal.lat, newVal.lng);
      // map.setCenter(latLng);
    }
  }
};
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
.GMap__Wrapper {
  height: 100%;
}
</style>
