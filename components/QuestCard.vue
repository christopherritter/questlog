<template>
  <v-card>
    <nuxt-link :to="'/quest/' + quest.questId">
      <v-img height="250" :src="quest.image"></v-img>
    </nuxt-link>

    <v-card-title class="quest-title"
      ><nuxt-link class="quest-title-link" :to="'/quest/' + quest.questId">{{
        quest.title
      }}</nuxt-link></v-card-title
    >

    <v-card-subtitle>by {{ quest.author }}</v-card-subtitle>

    <!-- <v-card-actions>
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
    </v-card-actions> -->
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "QuestCard",
  props: [ 'quest' ],
    computed: {
    ...mapState({
      categories: state => state.categories
    }),
  }
};
</script>

<style></style>
