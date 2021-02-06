<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="6" class="my-auto">
        <div class="d-flex flex-row mb-2">
          <v-icon medium color="green darken-2">mdi-crown</v-icon>
          <h5 class="featured-quest green--text text--darken-2 mt-1 ml-1">
            Featured Quest
          </h5>
        </div>
        <h1 class="display-3 mb-3">{{ quest.title }}</h1>
        <h3 class="subtitle-1 mb-sm-8 mb-lg-12">
          by {{ quest.author }}
        </h3>
        <v-btn color="primary" disabled>Play Quest</v-btn>
        <v-btn outlined @click="$emit('read-quest', quest.id);">Read Story</v-btn>
      </v-col>
      <v-col cols="6" sm="6" class="pb-0">
        <v-img
          class="mt-12"
          :src="require('~/assets/img/' + quest.image)"
          aspect-ratio="1.4"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "QuestHeader",
  props: ["questId"],
  computed: {
    quest() {
      return this.$store.state.quests[this.questId];
    }
  },
};
</script>

<style></style>
