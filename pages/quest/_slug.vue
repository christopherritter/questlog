<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout column fill-height>
      <v-flex class="white--text gray flex shrink darken-3">
        <QuestHeader :quest-id="this.slug" />
      </v-flex>
      <v-flex>
        <QuestMap
          id="QuestMap"
          ref="QuestMap"
          :quest-id="this.slug"
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
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  },
  data() {
    return {
      quest: null,
      locations: null,
      location: null,
      zoom: null,
      entries: null,
      items: null,
      actions: null
    };
  },
  layout: "fluid",
  components: { QuestHeader, QuestMap },
  created() {
    const quest = this.$store.state.quests[this.slug];
    const region = this.$store.state.regions[quest.region];
    const locations = this.$store.state.locations;

    this.quest = quest;
    this.region = region;
    this.zoom = region.zoom;
    this.locations = locations;
  },
  computed: {
    position() {
      const regionId = this.$store.state.quests[this.slug].region;
      return this.$store.state.regions[regionId].position;
    }
  }
};
</script>
