<template>
  <div id="map-wrap">
    <client-only>
      <l-map
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
          @click="$emit('select-location', index)"
          @dragstart="$emit('select-location', index)"
          @dragend="$emit('move-location', { location: $event, index: index })"
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
      if ((this.$refs.lMap = "undefined")) {
        this.$nextTick(() => {
          this.$refs.lMap.mapObject.setView([coordinates[0], coordinates[1]]);
        });
      } else {
        this.$refs.lMap.mapObject.setView([coordinates[0], coordinates[1]]);
      }
    }
  }
};
</script>
