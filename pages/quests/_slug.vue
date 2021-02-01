<template>
  <v-container fluid class="fill-height">
    <v-row style="height:auto">
      <v-sheet color="dark" elevation="1" height="100%" width="100%">
        <v-container>
          <v-row>
            <v-col cols="6" sm="6" class="my-auto">
              <div class="d-flex flex-row mb-2">
                <v-icon medium color="green darken-2">mdi-crown</v-icon>
                <h5
                  class="featured-quest green--text text--darken-2 mt-1 ml-1"
                >
                  Featured Quest
                </h5>
              </div>
              <h1 class="display-3 mb-3">{{ quests[this.slug].title }}</h1>
              <h3 class="subtitle-1 mb-sm-8 mb-lg-12">
                by {{ quests[this.slug].author }}
              </h3>
              <v-btn color="primary">Play Quest</v-btn>
              <v-btn outlined>Read Story</v-btn>
            </v-col>
            <v-col cols="6" sm="6" class="pb-0">
              <v-img
                class="mt-12"
                :src="require('~/assets/img/' + quests[this.slug].image)"
                aspect-ratio="1.4"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
    <v-row style="height:52%">
      <GoogleMap :quest-id="this.slug" />
    </v-row>
  </v-container>
</template>

<script>
import GoogleMap from "@/components/GoogleMap.vue";

export default {
  async asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  },
  layout: "fluid",
  components: { GoogleMap },
  computed: {
    quests() {
      return this.$store.state.quests;
    }
  }
};
</script>
