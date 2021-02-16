<template>
  <div id="map-wrap" style="height: 100%">
    <client-only>
      <l-map :zoom="zoom" :center="center" @click="markLocation($event)">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="(location, id) in locations"
          :key="id"
          :lat-lng="[location.coordinates.lat, location.coordinates.lng]"
        ></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: [39.56429074598017, -84.23503124009979]
    };
  },
  props: ["center", "zoom", "locations"],
  methods: {
    markLocation(event) {
      this.$emit('mark-location', event.latlng);
    }
  }
};
</script>

<style></style>
