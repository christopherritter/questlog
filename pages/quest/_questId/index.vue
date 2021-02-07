<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout column fill-height>
      <v-flex class="white--text gray flex shrink darken-3">
        <QuestHeader :quest-id="this.questId" />
      </v-flex>
      <v-flex>
        <QuestMap
          :quest-id="this.questId"
          :position="position"
          :locations="locations"
          :zoom="zoom"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestHeader from "@/components/QuestHeader.vue";
import QuestMap from "@/components/QuestMap.vue";

export default {
  name: "quest",
  async asyncData({ params }) {
    const questId = params.questId; // When calling /abc the questId will be "abc"
    return { questId };
  },
  data() {
    return {
      quest: null,
      locations: null,
      zoom: null,
      entries: null,
      items: null,
      actions: null
    };
  },
  layout: "fluid",
  components: { QuestHeader, QuestMap },
  created() {
    const quest = this.$store.state.quests[this.questId];
    const region = this.$store.state.regions[quest.region];
    const locations = this.$store.state.locations;

    this.quest = quest;
    this.region = region;
    this.zoom = region.zoom;
    this.locations = locations;
  },
  computed: {
    position() {
      const regionId = this.$store.state.quests[this.questId].region;
      return this.$store.state.regions[regionId].position;
    }
  }
};
</script>
