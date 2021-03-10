<template>
  <div id="map-wrap">
    <client-only>
      <l-map
        id="lMap"
        ref="lMap"
        :zoom="zoom"
        :center="[center[0], center[1]]"
        @click="$emit('mark-location', $event)"
        :options="mapOptions"
      >
        <l-tile-layer
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="(location, index) in locations"
          :key="index"
          :lat-lng="[location.coordinates[0], location.coordinates[1]]"
          :draggable="draggable"
          @click="$emit('select-location', location)"
          @dragstart="$emit('select-location', location)"
          @dragend="$emit('move-location', location)"
        ></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "LeafletMap",
  props: ["center", "zoom", "locations", "draggable", "mapOptions"],
  methods: {
    panTo(coordinates) {
      this.$nextTick(() => {
        this.$refs.lMap.mapObject.setView([coordinates[0], coordinates[1]]);
      });
    }
  }
};
</script>

<style>
  #lMap {
    z-index: inherit;
  }
</style>
