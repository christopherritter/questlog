<template>
  <div id="map-wrap">
    <client-only>
      <l-map ref="lMap" :zoom="zoom" :center="center" @click="markLocation($event)">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="(location, id) in locations"
          :key="id"
          :lat-lng="[location.coordinates.lat, location.coordinates.lng]"
          :draggable="location.draggable ? true : false"
          @click="selectLocation($event)"
          @dragstart="dragMarker($event)"
          @dragend="releaseMarker($event)"
        ></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["center", "zoom", "locations"],
  data() {
    return {
      grabbedMarker: {
        coordinates: {
          lat: null,
          lng: null
        }
      },
    }
  },
  methods: {
    markLocation(event) {
      this.$emit('mark-location', event.latlng);
    },
    selectLocation(event) {
      this.$emit('select-location', event);
    },
    releaseMarker(event) {
      console.log("Drag End, Updating Location")
      var oldMarker = this.grabbedMarker, newMarker = event.target;
      var position = newMarker.getLatLng();
      newMarker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
      this.$refs.lMap.setCenter(new L.LatLng(position.lat, position.lng))
      this.$emit('update-location', { oldMarker, newMarker });
    },
    dragMarker(event) {
      console.log("Drag Start")
      var coordinates = event.target.getLatLng();
      this.grabbedMarker = { coordinates }
    }
  }
};
</script>
