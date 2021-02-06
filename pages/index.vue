<template>
  <v-container fluid>
    <v-row>
      <v-sheet color="dark" elevation="1" height="100%" width="100%">
        <v-container style="height:100%">
          <v-row>
            <v-col cols="12" sm="12" md=6 class="my-auto">
              <div class="d-flex flex-row mb-2">
                <v-icon medium color="green darken-2">mdi-crown</v-icon>
                <h5 class="featured-quest green--text text--darken-2 mt-1 ml-1">
                  Featured Quest
                </h5>
              </div>
              <h1 class="quest-title display-3 mb-3">
                <nuxt-link class="quest-title-link" to="/quests/0">
                  {{ featuredQuest.title }}
                </nuxt-link>
              </h1>
              <h3 class="subtitle-1 mb-sm-8 mb-lg-12">
                by {{ featuredQuest.author }}
              </h3>
              <v-btn nuxt color="primary" to="/quests/0">More Info</v-btn>
            </v-col>
            <v-col cols="6" sm="6" class="pb-0 hidden-sm-and-down">
              <nuxt-link to="/quests/0">
                <v-img
                  class="mt-12"
                  :src="require('~/assets/img/' + featuredQuest.image)"
                  aspect-ratio="1.4"
                ></v-img>
              </nuxt-link>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
    <v-row>
      <v-sheet color="grey darken-4" elevation="1" width="100%">
        <v-container style="height:100%">
          <v-row class="py-8">
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              v-for="quest in featuredQuests"
              :key="quest.id"
            >
              <v-card>
                <nuxt-link :to="'/quests/' + quest.id">
                  <v-img
                    height="250"
                    :src="require('~/assets/img/' + quest.image)"
                  ></v-img>
                </nuxt-link>

                <v-card-title class="quest-title"
                  ><nuxt-link
                    class="quest-title-link"
                    :to="'/quests/' + quest.id"
                    >{{ quest.title }}</nuxt-link
                  ></v-card-title
                >

                <v-card-subtitle>by {{ quest.author }}</v-card-subtitle>
                <v-card-text></v-card-text>
                <v-card-actions>
                  <v-icon class="mr-2">mdi-tag</v-icon>
                  <v-chip
                    label
                    v-for="category in quest.categories"
                    :key="category.index"
                    small
                    class="mr-2"
                    >{{ category }}</v-chip
                  >
                  <v-spacer></v-spacer>
                  <v-icon>mdi-heart-outline</v-icon>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "home",
  layout: "fluid",
  computed: {
    featuredQuest() {
      return this.$store.state.quests[0];
    },
    featuredQuests() {
      var featuredQuests = [];

      for (let q = 1; q <= 3; q++) {
        featuredQuests.push(this.$store.state.quests[q]);
      }

      return featuredQuests;
    }
  }
};
</script>

<style>
.featured-quest {
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.1666666667rem;
  line-height: 2rem;
  text-transform: uppercase;
}
.v-application a.quest-title-link {
  color: #fff;
  text-decoration: none;
}
</style>
