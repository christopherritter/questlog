<template>
  <GMap
    ref="gMap"
    language="en"
    class="fill-height"
    :cluster="{ options: { styles: clusterStyle } }"
    :center="{ lat: position.lat, lng: position.lng }"
    :options="options"
    :zoom="zoom"
    @click="markLocation($event)"
  >
    <GMapMarker
      v-for="location in locations"
      :key="location.id"
      :position="{ lat: location.position.lat, lng: location.position.lng }"
      :options="{}"
      @click="consoleLog($event)"
    >
      <!-- This was removed from the GMapMarker above: -->
      <!-- @click="$emit('view-location', location.id)" -->

      <!-- This was removed from the options in GMapMarker: -->
      <!-- icon: {
          url: require('~/assets/img/' + location.marker),
          anchor: { x: 25, y: 25 }
        } -->

      <!-- <GMapInfoWindow :options="{ maxWidth: 200 }">
        <code class="grey--text text--darken-4">
          lat: {{ location.position.lat }}, lng: {{ location.position.lng }}
        </code>
      </GMapInfoWindow> -->
    </GMapMarker>
  </GMap>
</template>

<script>
export default {
  data() {
    return {
      currentLocation: {},
      options: {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: "water",
            stylers: [
              {
                saturation: 43
              },
              {
                lightness: -11
              },
              {
                hue: "#0088ff"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                hue: "#ff0000"
              },
              {
                saturation: -100
              },
              {
                lightness: 99
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#808080"
              },
              {
                lightness: 54
              }
            ]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ece2d9"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ccdca1"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#767676"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on"
              },
              {
                color: "#b8cb93"
              }
            ]
          },
          {
            featureType: "poi.park",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi.sports_complex",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi.medical",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi.business",
            stylers: [
              {
                visibility: "simplified"
              }
            ]
          }
        ],
        disableDefaultUI: this.mapOptions.disableDefaultUI || false,
        gestureHandling: this.mapOptions.gestureHandling || "cooperative",
        keyboardShortcuts: this.mapOptions.keyboardShortcuts || true,
        clickableIcons: this.mapOptions.clickableIcons || true,
        draggableCursor: this.mapOptions.draggableCursor || "grab",
        draggingCursor: this.mapOptions.draggingCursor || "grabbing"
      },
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
  props: ["questId", "position", "locations", "zoom", "mapOptions"],
  watch: {
    locations() {
      console.log("Location updated!");
      this.toggleMarkers();
    }
  },
  methods: {
    markLocation(event) {

      console.log("Mark Location:")
      console.log(event)
      // this.$emit("mark-location", event);
      // this.setCenter(event.event.latLng);

      let marker = new this.$refs.gMap.Marker({
        map: this.$refs.gMap.map,
        position: event.event.latLng,
        draggable: true
      });

      this.$refs.gMap.markers.push(marker);
    },
    setCenter(position) {
      this.$refs.gMap.map.setCenter(position);
    },
    toggleMarkers() {
      // var gmarkers = this.$refs.gMap.markers;
      // console.log("Toggle Markers:")
      // console.log(gmarkers)
      // for (let i = 0; i < gmarkers.length; i++) {
      //   console.log("Setting map for:")
      //   gmarkers[i].setMap(this.$refs.gMap.map);
      //   console.log(gmarkers[i])
      // }
    },
    consoleLog(event) {
      console.log(event);
    },
    checkForMarkers() {
      this.locations.forEach((location, i) => {
        location.visible = this.$refs.gMap.map
          .getBounds()
          .contains(this.$refs.gMap.markers[i].getPosition());
      });

      this.locationsVisibleOnMap = this.locations
        .filter(l => l.visible)
        .map(l => l.name)
        .join(", ");
    }
  }
};
</script>

<style>
#map {
  height: 100%;
}
.GMap__Wrapper {
  height: 100%;
}
</style>
