<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout column fill-height>
      <v-flex
        v-if="!playQuest && !readQuest"
        class="white--text gray flex shrink darken-3"
      >
        <QuestHeader
          :quest-id="this.slug"
          @read-quest="readQuest = true"
          @play-quest="playQuest = true"
        />
      </v-flex>
      <v-flex class="flex">
        <v-container fluid class="fill-height pa-0">
          <v-layout fill-height>
            <v-flex v-if="playQuest || readQuest" shrink>
              <QuestSidebar id="QuestSidebar" class="fill-height" :quest-id="this.slug" />
            </v-flex>
            <v-flex>
              <GoogleMap :quest-id="this.slug" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestHeader from "@/components/QuestHeader.vue";
import QuestSidebar from "@/components/QuestSidebar.vue";
import GoogleMap from "@/components/GoogleMap.vue";

export default {
  async asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  },
  data() {
    return {
      readQuest: false,
      playQuest: false
    };
  },
  layout: "fluid",
  components: { QuestHeader, QuestSidebar, GoogleMap },
};
</script>

<style>
#QuestSidebar {
  max-height: calc(100vh - 100px)
}
</style>
