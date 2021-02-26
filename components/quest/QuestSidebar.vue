<template>
  <v-sheet>
    <v-img
      v-if="location.image"
      height="240"
      :src="require('~/assets/img/' + location.image)"
    ></v-img>

    <v-card-title>
      {{ location.name }}
    </v-card-title>

    <v-layout v-if="objectives.length > 0">
      <v-flex class="px-4">
        <v-chip
          class="mr-2 mb-2"
          color="green"
          outlined
          v-for="objective in objectives"
          :key="objective.id"
          @click="$emit('view-objective', objective.id)"
        >
          <v-icon class="mr-1">mdi-check-bold</v-icon> {{ objective.name }}
        </v-chip>
      </v-flex>
    </v-layout>

    <v-card-text v-for="entry in entries" :key="entry.id">{{
      entry.text
    }}</v-card-text>

    <v-list>
      <v-list-item
        v-for="(action, index) in actions"
        :key="index"
        @click="$emit('select-action', action)"
      >
        <v-list-item-icon>
          <v-icon>{{ action.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ action.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
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
  props: ["location", "entries", "actions", "objectives"],
  watch: {
    entries(newVal, oldVal) {
      if (newVal != oldVal) {
        this.panel = [0];
      }
    }
  }
};
</script>
