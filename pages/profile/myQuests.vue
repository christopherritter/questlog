<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>Custom Quests</h1>
      </v-col>
    </v-row>
    <!-- <v-row class="pb-4 pb-md-12">
      <v-col cols="12" md="4" class="pb-0">
        <v-autocomplete
          append-icon=""
          prepend-inner-icon="mdi-magnify"
          v-model="questSearch"
          :items="quests"
          item-text="title"
          item-value="id"
          label="Search"
          clearable
          solo
          hide-details
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="3" class="pb-0"
        ><v-autocomplete
          v-model="authors"
          :items="authorList"
          item-text="name"
          item-value="id"
          :label="this.user.name"
          disabled
          solo
          hide-details
        ></v-autocomplete
      ></v-col>
      <v-col cols="12" md="3" class="pb-0"
        ><v-autocomplete
          v-model="categorySelection"
          :items="categories"
          item-text="name"
          item-value="id"
          label="Categories"
          clearable
          solo
          multiple
          hide-details
        ></v-autocomplete
      ></v-col>
      <v-col cols="12" md="2" class="pb-0"
        ><v-combobox
          v-model="sortSelection"
          :items="sortBy"
          label="Sort"
          clearable
          solo
          hide-details
        ></v-combobox
      ></v-col>
    </v-row> -->
    <v-row v-if="quests">
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="quest in filteredQuests"
        :key="quest.id"
      >
        <QuestCard :quest="quest" :author="authors[quest.author]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import QuestCard from "@/components/QuestCard.vue";

export default {
  name: "myQuests",
  middleware: "authenticated",
  data() {
    return {
      quests: [],
      authors: [
        {
          name: "Christopher Ritter",
          authorId: "W8INchB9HLWxMHfgNVQ4mWE5P8v1"
        }
      ],
      questSearch: null,
      sortBy: ["Alphabetical", "Authors", "Categories"],
      sortSelection: null,
      authorSelection: null,
      categorySelection: []
    };
  },
  created() {
    this.fetchQuests();
  },
  components: {
    QuestCard
  },
  computed: {
    ...mapState({
      user: state => state.user,
      categories: state => state.categories
    }),
    filteredQuests() {
      var filteredQuests = this.quests.slice();
      // var questSearch = this.questSearch;
      // var categorySelection = this.categorySelection;
      // var sortSelection = this.sortSelection;

      // if (questSearch != null) {
      //   filteredQuests = filteredQuests.filter(
      //     quest => quest.id == questSearch
      //   );
      // }

      // filteredQuests = filteredQuests.filter(
      //   quest => quest.authorId == this.user.userId
      // );

      // if (categorySelection.length > 0) {
      //   var categoryQuests = [];
      //   for (let f = 0; f < filteredQuests.length; f++) {
      //     for (let c = 0; c < categorySelection.length; c++) {
      //       let checker = (arr, target) => target.every(v => arr.includes(v));
      //       if (checker(filteredQuests[f].categories, categorySelection)) {
      //         let exists = this.containsObject(filteredQuests[f], categoryQuests);
      //         if (!exists) {
      //           categoryQuests.push(filteredQuests[f]);
      //         }
      //       }
      //     }
      //   }
      //   filteredQuests = categoryQuests;
      // }

      // if (sortSelection == "Alphabetical") {
      //   filteredQuests.sort((a, b) => {
      //     let qa = a.title.toLowerCase(),
      //       qb = b.title.toLowerCase();

      //     if (qa < qb) {
      //       return -1;
      //     }
      //     if (qa > qb) {
      //       return 1;
      //     }
      //     return 0;
      //   });
      // }

      return filteredQuests;
    },
    authorList() {
      var authors = Object.entries(this.authors);
      var authorList = []

      for (let a = 0; a < authors.length; a++) {

        let author = {
          id: authors[a][0],
          name: authors[a][1].name,
          isAnonymous: authors[a][1].isAnonymous,
        }

        authorList.push(author);
      }

      return authorList;
    }
  },
  methods: {
    async fetchQuests() {
      const snapshot = await this.$fire.firestore.collection('quests').get();
      this.quests = snapshot.docs.map(doc => {
        var newDoc = doc.data();
        newDoc.id = doc.id;
        return newDoc;
      });
    },
    containsObject(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return true;
        }
      }

      return false;
    },
    containsObject(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return true;
        }
      }

      return false;
    }
  },
};
</script>
