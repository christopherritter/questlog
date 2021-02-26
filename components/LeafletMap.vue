<template>
  <div id="map-wrap">
    <client-only>
      <l-map
        ref="lMap"
        :zoom="zoom"
        :center="[center[0], center[1]]"
        @click="$emit('mark-location', $event)"
        :attributionControl="false"
        :scrollWheelZoom="false"
      >
        <l-tile-layer
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="(location, id) in locations"
          :key="id"
          :lat-lng="[location.coordinates[0], location.coordinates[1]]"
          :draggable="draggable"
          @click="$emit('select-location', $event)"
          @dragstart="$emit('select-location', $event)"
          @dragend="$emit('move-location', $event)"
        ></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["center", "zoom", "locations", "draggable"]
};
</script>
