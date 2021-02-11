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
      // filteredQuests: [],
      questSearch: null,
      sortBy: ["Alphabetically", "Authors", "Categories"],
      sortSelection: null,
      authorSelection: null,
      categorySelection: []
    };
  },
  created() {
    // this.fetchQuests();
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

      if (categorySelection != null) {
        // console.log(categorySelection)
        for (let c = 0; c < categorySelection.length; c++) {
          for (let f = 0; f < filteredQuests.length; f++) {
            // console.log(filteredQuests[f].categories)
            // console.log(categorySelection[c])
            // console.log(categorySelection[c], !filteredQuests[f].categories.includes(categorySelection[c]));
            if (!filteredQuests[f].categories.includes(categorySelection[c])) {
              // console.log(filteredQuests[f].title)
              filteredQuests = filteredQuests.splice(f, 1);
              // filteredQuests.splice(f, 1);
            }
          }
        }
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

      // console.log(filteredQuests);
      return filteredQuests;
    }
  },
  watch: {
    questSearch(newVar) {
      // this.filterQuests();
      // if (newVar != null) {
      //   let results = this.filteredQuests.filter(quest => quest.id == newVar);
      //   this.filteredQuests = results;
      // } else {
      //   this.fetchQuests();
      // }
    },
    authorSelection(newVar) {
      // this.filterQuests();
      // if (newVar != null) {
      //   let results = this.filteredQuests.filter(
      //     quest => quest.author == newVar
      //   );
      //   this.filteredQuests = results;
      // } else {
      //   this.fetchQuests();
      // }
    },
    categorySelection(newVar) {
      // this.filterQuests();
      // if (newVar != null) {
      //   let results = [];
      //   newVar.forEach(category => {
      //     console.log(category)
      //   })
      //   this.filteredQuests = results;
      // } else {
      //   this.fetchQuests();
      // }
    },
    sortSelection(newVar) {
      // this.filterQuests();
      // let filteredQuests = [];
      // if (newVar != null) {
      //   filteredQuests.sort((a, b) => {
      //     return a.title - b.title;
      //   });
      // }
      // this.filteredQuests = filteredQuests;
    }
  },
  methods: {
    // fetchQuests() {
    //   let filteredQuests = [];
    //   for (let q = 0; q < this.quests.length; q++) {
    //     filteredQuests.push(this.quests[q]);
    //   }
    //   this.filteredQuests = filteredQuests;
    // },
    // filterQuests() {
    //   var filteredQuests = this.filteredQuests.slice();
    //   if (this.questSearch != null) {
    //     for (let n = 0; n < this.quests.length; n++) {
    //       if (this.quests[n].id == this.questSearch) {
    //         filteredQuests.push(this.quests[n]);
    //       }
    //     }
    //   }
    //   if (this.authorSelection != null) {
    //     for (let a = 0; a < this.quests.length; a++) {
    //       if (this.quests[a].author == this.authorSelection) {
    //         filteredQuests.push(this.quests[a]);
    //       }
    //     }
    //   }
    //   if (this.questSearch == null && this.authorSelection == null) {
    //     for (let q = 0; q < this.quests.length; q++) {
    //       filteredQuests.push(this.quests[q]);
    //     }
    //   }
    //   if (this.categorySelection.length != 0) {
    //     for (let f = 0; f < filteredQuests.length; f++) {
    //       for (let c = 0; c < this.categorySelection.length; c++) {
    //         console.log(this.categorySelection[c]);
    //         if (
    //           !filteredQuests[f].categories.includes(this.categorySelection[c])
    //         ) {
    //           filteredQuests.splice(f, 1);
    //         }
    //       }
    //     }
    //   }
    //   if (this.sortSelection == "Alphabetically") {
    //     filteredQuests.sort();
    //   }
    //   return filteredQuests;
    // }
  }
};
</script>
