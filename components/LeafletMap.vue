<template>
  <div id="map-wrap">
    <client-only>
      <l-map ref="lMap" :zoom="zoom" :center="center" @click="$emit('mark-location', $event)">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="(location, id) in locations"
          :key="id"
          :lat-lng="[location.coordinates.lat, location.coordinates.lng]"
          :draggable="location.draggable ? true : false"
          @click="$emit('select-location', $event)"
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
    releaseMarker(event) {
      var oldMarker = this.grabbedMarker, newMarker = event.target;
      var position = newMarker.getLatLng();

      newMarker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});

      this.$refs.lMap.setCenter(new L.LatLng(position.lat, position.lng))
      this.$emit('update-location', { oldMarker, newMarker });
    },
    dragMarker(event) {
      var coordinates = event.target.getLatLng();
      this.grabbedMarker = { coordinates }
    }
  }
};
</script>
