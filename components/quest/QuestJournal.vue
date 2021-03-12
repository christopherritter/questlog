<template>
  <v-expansion-panels v-model="panels" :disabled="$vuetify.breakpoint.mdAndUp" tile flat>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Journal
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <v-list-item
            v-for="objective in objectives"
            :key="objective.objectiveId"
             class="px-0"
          >
            <v-list-item-icon>
              <v-icon>mdi-check</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ objective.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "QuestJournal",
  data() {
    return {
      panels: 0
    }
  },
  mounted() {
    this.setPanels();
  },
  props: ["objectives"],
  methods: {
    setPanels() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.panels = 0;
      }
    },
  }
};
</script>
