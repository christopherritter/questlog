<template>
  <v-card :width="width" :max-height="maxHeight" light tile elevation="0">
    <v-img
      v-if="location.image"
      height="240"
      :src="require('~/assets/img/' + location.image)"
    ></v-img>

    <v-card-title>
      {{ location.name }}
    </v-card-title>

    <v-card-text v-for="entry in entries" :key="entry.id">{{ entry.text }}</v-card-text>

    <v-list dense nav>
      <v-list-item
        v-for="action in actions"
        :key="action.id"
        @click="$emit('view-location', action.forward)"
      >
        <v-list-item-icon>
          <v-icon>{{ action.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ action.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "QuestSidebar",
  data() {
    return {
      panel: [0]
    };
  },
  mounted() {
    this.panel = [0];
  },
  props: ["location", "entries", "actions", "width", "maxHeight"],
  watch: {
    entries(newVal, oldVal) {
      if (newVal != oldVal) {
        this.panel = [0];
      }
    }
  }
};
</script>
