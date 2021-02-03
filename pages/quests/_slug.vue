<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout column class="fill-height">
      <v-flex class="white--text gray flex shrink darken-3">
        <QuestHeader :quest-id="this.slug" />
      </v-flex>
      <v-flex class="flex">
        <GoogleMap :quest-id="this.slug" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestHeader from "@/components/QuestHeader.vue";
import GoogleMap from "@/components/GoogleMap.vue";

export default {
  async asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  },
  data() {
    return {
      readMode: false,
      playMode: false,
    }
  },
  layout: "fluid",
  components: { QuestHeader, GoogleMap },
};
</script>
