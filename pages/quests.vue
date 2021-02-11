<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>Quests</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="questSearch"
          :items="quests"
          item-text="title"
          item-value="id"
          label="Search"
          clearable
          solo
        ></v-autocomplete>
      </v-col>
      <v-col
        ><v-combobox
          v-model="sortSelection"
          :items="sortBy"
          label="Sort"
          clearable
          solo
        ></v-combobox
      ></v-col>
      <v-col
        ><v-autocomplete
          v-model="authorSelection"
          :items="authors"
          item-text="name"
          item-value="id"
          label="Authors"
          clearable
          solo
        ></v-autocomplete
      ></v-col>
      <v-col
        ><v-autocomplete
          v-model="categorySelection"
          :items="categories"
          item-text="name"
          item-value="id"
          label="Categories"
          clearable
          solo
          multiple
        ></v-autocomplete
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="quest in filteredQuests" :key="quest.id">
        <QuestCard :quest="quest" :author="authors[quest.author]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import QuestCard from "@/components/QuestCard.vue";

export default {
  name: "quests",
  data() {
    return {
      questSearch: null,
      sortBy: ["Alphabetically", "Authors", "Categories"],
      sortSelection: null,
      authorSelection: null,
      categorySelection: []
    };
  },
  components: {
    QuestCard
  },
  computed: {
    ...mapState({
      quests: state => state.quests,
      authors: state => state.authors,
      categories: state => state.categories
    }),
    filteredQuests() {
      var filteredQuests = this.quests.slice();
      var questSearch = this.questSearch;
      var authorSelection = this.authorSelection;
      var categorySelection = this.categorySelection;
      var sortSelection = this.sortSelection;

      if (questSearch != null) {
        filteredQuests = filteredQuests.filter(
          quest => quest.id == questSearch
        );
      }

      if (authorSelection != null) {
        filteredQuests = filteredQuests.filter(
          quest => quest.author == authorSelection
        );
      }

      if (categorySelection > 0) {
        var categoryQuests = [];
        for (let f = 0; f < filteredQuests.length; f++) {
          for (let c = 0; c < categorySelection.length; c++) {
            let checker = (arr, target) => target.every(v => arr.includes(v));
            if (checker(filteredQuests[f].categories, categorySelection)) {
              categoryQuests.push(filteredQuests[f]);
            }
          }
        }
        filteredQuests = categoryQuests;
      }

      if (sortSelection == "Alphabetically") {
        filteredQuests.sort((a, b) => {
          let qa = a.title.toLowerCase(),
            qb = b.title.toLowerCase();

          if (qa < qb) {
            return -1;
          }
          if (qa > qb) {
            return 1;
          }
          return 0;
        });
      }

      return filteredQuests;
    }
  },
};
</script>
