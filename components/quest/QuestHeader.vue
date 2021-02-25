<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="my-4">
        <div class="d-flex flex-row mb-2 mt-4">
          <v-icon medium color="green darken-2">mdi-crown</v-icon>
          <h5 class="featured-quest green--text text--darken-2 mt-1 ml-1">
            Featured Quest
          </h5>
        </div>
        <h1 class="display-3 mb-3">{{ quest.title }}</h1>
        <h3 class="subtitle-1 mb-8 mb-lg-12">by {{ quest.author }}</h3>
        <v-btn color="primary" class="mr-2" disabled>Play Quest</v-btn>
        <v-btn outlined @click="readQuest(quest.id)">Read Story</v-btn>
      </v-col>
      <v-col cols="6" sm="6" class="pb-0 hidden-sm-and-down">
        <v-img class="mt-12" :src="quest.image" aspect-ratio="1.4"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "QuestHeader",
  props: ["quest"],
  computed: {
    ...mapState({
      categories: state => state.categories
    }),
  },
  methods: {
    readQuest(questId) {
      this.$store.dispatch("beginQuest", questId);
      this.$router.push("/quest/reader");
    }
  }
};
</script>

<style></style>
