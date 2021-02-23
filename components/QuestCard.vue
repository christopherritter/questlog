<template>
  <v-card>
    <nuxt-link :to="'/quest/' + quest.id">
      <v-img height="250" :src="require('~/assets/img/' + quest.image)"></v-img>
    </nuxt-link>

    <v-card-title class="quest-title"
      ><nuxt-link class="quest-title-link" :to="'/quest/' + quest.id">{{
        quest.title
      }}</nuxt-link></v-card-title
    >

    <v-card-subtitle>by {{ authors[quest.author].name }}</v-card-subtitle>
    <v-card-text></v-card-text>
    <v-card-actions>
      <v-icon class="mr-2">mdi-tag</v-icon>
      <v-chip
        label
        v-for="category in quest.categories"
        :key="category"
        small
        class="mr-2"
        >{{ categories[category].name }}</v-chip
      >
      <v-spacer></v-spacer>
      <v-icon>mdi-heart-outline</v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "QuestCard",
  props: [ 'quest' ],
    computed: {
    ...mapState({
      authors: state => state.demoData.authors,
      categories: state => state.categories
    }),
  }
};
</script>

<style></style>
