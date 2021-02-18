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
          @dragstart="$emit('select-location', $event)"
          @dragend="$emit('move-location', $event)"
        ></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["center", "zoom", "locations"]
};
</script>
