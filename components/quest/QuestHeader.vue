<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6" class="my-12">
        <div v-if="quest.isFeatured || $route.path === '/quest/lNVAf14Ngq3JBSwaK0IA'" class="d-flex flex-row mb-2">
          <v-icon medium color="green darken-2">mdi-crown</v-icon>
          <h5 class="featured-quest green--text text--darken-2 mt-1 ml-1">
            Featured Quest
          </h5>
        </div>
        <h1 class="display-3 mb-3">{{ quest.title }}</h1>
        <h3 class="subtitle-1 mb-8 mb-lg-12">by {{ quest.author }}</h3>
        <v-btn
          color="primary"
          class="mr-2"
          large
          @click="$emit('play-quest')"
          :disabled="loading"
          >Play</v-btn
        >
        <v-btn
          outlined
          class="mr-2"
          large
          @click="$emit('read-quest')"
          :disabled="loading"
          >Read</v-btn
        >
        <v-btn
          v-if="authUser && authUser.uid == quest.authorId"
          outlined
          large
          @click="$emit('edit-quest')"
          :disabled="loading"
          >Edit</v-btn
        >
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
  props: ["quest", "loading"],
  computed: {
    ...mapState({
      categories: state => state.categories,
      authUser: state => state.authUser
    })
  }
};
</script>

<style></style>
