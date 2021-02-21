<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="5" lg="4">
          <v-row>
            <v-col>
              <div class="d-flex mt-5 mb-4 align-center">
                <h1>Entries</h1>
                <v-spacer></v-spacer>
                <v-btn text @click="clearEntry()">
                  <v-icon class="mr-2" dark>
                    mdi-plus-circle
                  </v-icon>
                  New
                </v-btn>
              </div>
              <v-text-field
                v-model="entry.title"
                label="Title"
                outlined
              ></v-text-field>
              <v-autocomplete
                v-model="entry.location"
                :items="locations"
                label="Location"
                item-text="name"
                item-value="id"
                clearable
                outlined
              ></v-autocomplete>
              <v-textarea
                v-model="entry.text"
                label="Text"
                hide-details="auto"
                outlined
              ></v-textarea>
              <ActionsPanel />
              <v-autocomplete
                v-model="entry.requirements"
                :items="objectives"
                label="Requirements"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="entry.expiration"
                :items="objectives"
                label="Expiration"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="entry.objectives"
                :items="objectives"
                label="Objectives"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
              ></v-autocomplete>
              <div class="d-flex justify-end">
                <v-btn dark outlined disabled>Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="selectedEntry == 'undefined'"
                  :disable="entry.title.length <= 0"
                  dark
                  outlined
                  @click="addEntry()"
                  >Add</v-btn
                >
                <v-btn
                  v-else
                  dark
                  outlined
                  color="primary"
                  @click="updateEntry()"
                  >Update</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7" lg="8" class="d-flex flex-column">
          <div class="d-flex flex-shrink-0 mt-5 mb-4 align-center">
            <v-btn text dark :disabled="!selectedEntry" @click="removeEntry()">
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
          </div>
          <div v-if="sortedEntries.length <= 0">
            <v-card outlined>
              <v-card-text>
                Add entries to your quest with the form on the left.
              </v-card-text>
            </v-card>
          </div>
          <v-list v-else subheader two-line>
            <span v-for="(location, s) in sortedEntries" :key="s">
              <v-subheader inset>{{ location.name }}</v-subheader>
            <v-list-item-group v-model="selectedEntry" color="green">
              <template v-for="(entry, e) in location.entries">
                <v-list-item :key="`item-${s}-${e}`" :value="`item-${s}-${e}`" @click="selectEntry(entry)">
                  <v-list-item-avatar>
                    <v-icon class="grey lighten-1">
                      mdi-feather
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="entry.title"></v-list-item-title>

                    <v-list-item-subtitle
                      v-text="entry.text"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list-item-group>
            <v-divider
              inset
              class="mt-4 mb-2"
              v-if="sortedEntries.length > 1"
            ></v-divider>
            </span>
          </v-list>
          <div class="d-flex flex-grow-1 flex-shrink-1 align-end justify-end">
            <v-btn outlined dark @click="$emit('change-tab', 'locations')">
              Back
            </v-btn>
            <v-btn
              outlined
              dark
              class="ml-2"
              @click="$emit('change-tab', 'items')"
            >
              Next
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn dark disabled color="primary" class="ml-2">
              Save
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ActionsPanel from "@/components/editor/ActionsPanel.vue";

export default {
  name: "EntriesEditor",
  data() {
    return {
      entry: {
        title: "",
        location: {},
        text: "",
        requirements: [],
        expiration: [],
        objectives: [],
        entryIndex: null
      },
      sortedEntries: [],
      selectedEntry: "undefined"
    };
  },
  components: { ActionsPanel },
  computed: {
    ...mapState({
      objectives: state => state.editor.objectives,
      locations: state => state.editor.locations,
      actions: state => state.editor.actions,
      entries: state => state.editor.entries
    })
  },
  mounted() {
    this.sortEntries();
  },
  methods: {
    ...mapMutations([
      "ADD_ENTRY_EDITOR",
      "UPDATE_ENTRY_EDITOR",
      "SET_ENTRIES_EDITOR"
    ]),
    addEntry() {
      this.$store.commit("ADD_ENTRY_EDITOR", this.entry);
      this.clearEntry();
    },
    selectEntry(entry) {
      this.entry = {
        title: entry.title,
        location: entry.location,
        text: entry.text,
        requirements: entry.requirements,
        expiration: entry.expiration,
        objectives: entry.objectives,
        entryIndex: entry.entryIndex
      };
    },
    updateEntry() {
      this.$store.commit("UPDATE_ENTRY_EDITOR", {
        selectedEntry: this.entry.entryIndex,
        newEntry: this.entry
      });
      this.clearEntry();
    },
    removeEntry() {
      var index = this.entry.entryIndex;
      var entries = this.entries.map(e => e);
      entries.splice(index, 1);
      this.$store.commit("SET_ENTRIES_EDITOR", entries);
      this.clearEntry();
    },
    clearEntry() {
      this.selectedEntry = "undefined";
      this.entry = {
        title: "",
        location: {},
        text: "",
        requirements: [],
        expiration: [],
        objectives: []
      };
      this.sortEntries();
    },
    sortEntries() {
      var entries = [], sortedEntries = [];

      for (let e = 0; e < this.entries.length; e++) {
        var entry = this.entries[e];
        entry.entryIndex = e;
        entries.push(entry);
      }

      for (let l = 0; l < this.locations.length; l++) {
        var sortedLocation = {};
        sortedLocation.name = this.locations[l].name;
        sortedLocation.entries = [];

        for (let s = 0; s < entries.length; s++) {
          if (entries[s].location == this.locations[l].name) {
            sortedLocation.entries.push(entries[s]);
          }
        }

        if (sortedLocation.entries.length > 0) {
          sortedEntries.push(sortedLocation);
        }
      }

      this.sortedEntries = sortedEntries;
    }
  }
};
</script>

<style></style>
