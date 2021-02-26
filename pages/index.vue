<template>
  <v-container fluid>
    <v-row v-if="featuredQuest">
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
                <nuxt-link class="quest-title-link" to="/quest/0">
                  {{ featuredQuest.title }}
                </nuxt-link>
              </h1>
              <h3 class="subtitle-1 mb-8 mb-lg-12">
                by {{ featuredQuest.author }}
              </h3>
              <v-btn nuxt color="primary" :to="'/quest/' + featuredQuest.questId">View Quest</v-btn>
            </v-col>
            <v-col cols="6" sm="6" class="pb-0 hidden-sm-and-down">
              <nuxt-link :to="'/quest/' + featuredQuest.questId">
                <v-img
                  class="mt-12"
                  :src="featuredQuest.image"
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
              v-for="quest in quests"
              :key="quest.id"
            >
              <v-card>
                <nuxt-link :to="'/quest/' + quest.id">
                  <v-img
                    height="250"
                    :src="quest.image"
                  ></v-img>
                </nuxt-link>

                <v-card-title class="quest-title" nuxt :to="'/quest/' + quest.id">
                  {{ quest.title }}
                </v-card-title>

                <v-card-subtitle>by {{ quest.author }}</v-card-subtitle>

                <!-- <v-card-actions>
                  <v-icon class="mr-2">mdi-tag</v-icon>
                  <v-chip
                    label
                    v-for="category in quest.categories"
                    :key="category.index"
                    small
                    class="mr-2"
                    >{{ categories[category].name }}</v-chip
                  >
                  <v-spacer></v-spacer>
                  <v-icon>mdi-heart-outline</v-icon>
                </v-card-actions> -->
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "home",
  layout: "fluid",
  data() {
    return {
      quests: []
    };
  },
  created() {
    this.fetchQuests();
  },
  computed: {
    ...mapState({
      categories: state => state.categories
    }),
    featuredQuest() {
      const featuredQuestArr = this.quests.filter(quest => quest.questId === 'lNVAf14Ngq3JBSwaK0IA');
      return featuredQuestArr[0];
    },
    // featuredQuests() {
    //   var featuredQuests = [];

    //   for (let q = 1; q <= 3; q++) {
    //     featuredQuests.push(this.quests[q]);
    //   }

    //   return featuredQuests;
    // }
  },
  methods: {
    async fetchQuests() {
      const snapshot = await this.$fire.firestore.collection('quests').get();
      this.quests = snapshot.docs.map(doc => {
        var newDoc = doc.data();
        newDoc.id = doc.id;
        return newDoc;
      });
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
