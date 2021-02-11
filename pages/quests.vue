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
          v-model="questSelection"
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
      questSelection: null,
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
      var filteredQuests = [];

      if (this.questSelection != null) {
        for (let n = 0; n < this.quests.length; n++) {
          if (this.quests[n].id == this.questSelection) {
            filteredQuests.push(this.quests[n]);
          }
        }
      }

      if (this.authorSelection != null) {
        for (let a = 0; a < this.quests.length; a++) {
          if (this.quests[a].author == this.authorSelection) {
            filteredQuests.push(this.quests[a]);
          }
        }
      }

      if (this.questSelection == null && this.authorSelection == null) {
        for (let q = 0; q < this.quests.length; q++) {
          filteredQuests.push(this.quests[q]);
        }
      }

      if (this.categorySelection.length != 0) {
        for (let f = 0; f < filteredQuests.length; f++) {
          for (let c = 0; c < this.categorySelection.length; c++) {
            console.log(this.categorySelection[c])
            if (!filteredQuests[f].categories.includes(this.categorySelection[c]) ) {
              filteredQuests.splice(f, 1);
            }
          }
        }
      }

      return filteredQuests;
    }
  }
};
</script>
