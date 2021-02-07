<template>
  <GMap
    ref="gMap"
    language="en"
    :cluster="{ options: { styles: clusterStyle } }"
    :center="{ lat: position.lat, lng: position.lng }"
    :options="{
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      styles: mapStyle,
      disableDefaultUI: true,
      gestureHandling: 'none',
      keyboardShortcuts: false,
      clickableIcons: false,
      draggableCursor: 'default',// this is for cursor type
      draggingCursor: 'default', // this is for dragging cursor type
    }"
    :zoom="zoom"
    class="fill-height"
    height="100%"
  >
    <GMapMarker
      v-for="location in locations"
      :key="location.id"
      :position="{ lat: location.position.lat, lng: location.position.lng }"
      :options="{
        icon: {
          url: require('~/assets/img/' + location.marker),
          anchor: { x: 25, y: 25 }
        }
      }"
    >
    <!-- This was removed from the GMapMarker above: -->
    <!-- @click="$emit('view-location', location.id)" -->

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
      mapStyle: [
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
  props: ["questId", "position", "locations", "location", "zoom"],
   methods: {
    setCenter(position) {
      this.$refs.gMap.map.setCenter(position);
    },
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
