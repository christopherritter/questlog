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
                v-model="newEntry.title"
                label="Title"
                outlined
              ></v-text-field>
              <v-autocomplete
                v-model="newEntry.location"
                :items="locations"
                label="Location"
                item-text="name"
                item-value="locationId"
                outlined
              ></v-autocomplete>
              <v-textarea
                v-model="newEntry.text"
                label="Text"
                outlined
              ></v-textarea>
              <v-text-field
                v-model="newEntry.order"
                label="Order"
                outlined
                hide-details
              ></v-text-field>
              <ActionsPanel
                :objectives="objectives"
                :locations="locations"
                :actions="newEntry.actions"
                :items="items"
                @add-action="addAction($event)"
                @edit-action="editAction($event)"
                @delete-action="deleteAction($event)"
              />
              <v-autocomplete
                v-model="newEntry.requirements"
                :items="objectives"
                label="Requirements"
                item-text="name"
                item-value="objectiveId"
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="newEntry.expiration"
                :items="objectives"
                label="Expiration"
                item-text="name"
                item-value="objectiveId"
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="newEntry.objectives"
                :items="objectives"
                label="Objectives"
                item-text="name"
                item-value="objectiveId"
                multiple
                outlined
              ></v-autocomplete>
              <div class="d-flex justify-end">
                <v-btn
                  v-if="selectedEntry == 'undefined'"
                  :disabled="newEntry.location == ''"
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
                <v-spacer></v-spacer>
                <v-btn dark outlined disabled>Reset</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7" lg="8">
          <v-row class="mt-5 mb-4 align-center">
            <v-btn text dark :disabled="!selectedEntry" @click="removeEntry()">
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
          </v-row>
          <v-row>
            <v-col class="pt-0 pb-2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-text-field
                    v-model="searchTerm"
                    label="Find Location"
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col sm="4">
                  <v-select
                    v-model="sortBy"
                    :items="sort"
                    label="Sort Locations"
                    outlined
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- <div>
            <v-card outlined>
              <v-card-text>
                Add entries to your quest with the form on the left.
              </v-card-text>
            </v-card>
          </div> -->
          <v-row>
            <v-col>
              <v-list
                span
                v-for="location in sortedEntries"
                :key="location.locationId"
                subheader
                two-line
              >
                <v-subheader>
                  <v-btn icon rounded elevation="0" color="grey lighten-1">
                    <v-icon dark>
                      mdi-map-marker
                    </v-icon>
                  </v-btn>
                  {{ location.name }}
                  <v-spacer></v-spacer>
                  <v-avatar
                    rounded
                    size="24"
                    class="mr-2"
                    color="grey darken-3"
                  >
                    <span class="text--white">
                      {{ location.order }}
                    </span>
                  </v-avatar>
                </v-subheader>
                <v-list-item-group v-model="selectedEntry" color="green">
                  <template v-for="entry in location.entries">
                    <v-list-item
                      :key="entry.entryId"
                      :value="entry.entryId"
                      @click="selectEntry(entry)"
                    >
                      <v-list-item-avatar>
                        <v-icon
                          dark
                          color="white darken-1"
                          class="indigo darken-1"
                        >
                          mdi-feather
                        </v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="entry.title"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="entry.text"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-avatar
                          rounded
                          color="grey darken-2"
                          class="mr-2"
                          size="36"
                        >
                          <span class="white--text title">{{
                            entry.order
                          }}</span>
                        </v-list-item-avatar>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-list-item-group>
                <v-divider class="mt-4 mb-2"></v-divider>
              </v-list>
            </v-col>
          </v-row>
          <v-row class="my-2 mx-0 align-end justify-end">
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
            <v-btn dark class="mr-2" @click="$emit('delete-quest')" color="danger">
              Delete
            </v-btn>
            <v-btn dark @click="publishQuest()" color="primary" class="ml-2">
              Publish
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import ActionsPanel from "@/components/editor/ActionsPanel.vue";

export default {
  name: "EntriesTab",
  data() {
    return {
      newEntry: {
        title: "",
        text: "",
        location: "",
        order: 1,
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      },
      selectedEntry: "undefined",
      searchTerm: "",
      sortBy: "",
      sort: ["Alphabetically", "Numerically"]
    };
  },
  props: ["objectives", "locations", "entries", "items"],
  computed: {
    sortedEntries() {
      var sortedEntries = [];
      var searchTerm = this.searchTerm.toLowerCase();

      this.locations.forEach(location => {
        var newLocation = Object.assign({}, location);
        var filteredEntries = this.entries.filter(function(entry) {
          return entry.location === location.locationId;
        });
        newLocation.entries = filteredEntries.slice();
        sortedEntries.push(newLocation);
      });

      return sortedEntries.filter(location => {
        return location.name.toLowerCase().includes(searchTerm);
      });
    }
  },
  components: { ActionsPanel },
  watch: {
    sortBy(val) {
      let locations = this.locations.slice();

      if (val === "Alphabetically") {
        locations.sort((a, b) => (a.name > b.name ? 1 : -1));

        if (locations != this.locations) {
          this.$store.commit("SET_LOCATIONS", locations);
        }
      } else if (val === "Numerically") {
        locations.sort((a, b) => (a.order > b.order ? 1 : -1));

        if (locations != this.locations) {
          this.$store.commit("SET_LOCATIONS", locations);
        }
      }

      this.clearEntry();
    }
  },
  methods: {
    ...mapActions(["addEntry", "publishQuest", "findWithAttr"]),
    ...mapMutations([
      "ADD_ACTION",
      "UPDATE_ACTION",
      "REMOVE_ACTION"
    ]),
    addEntry() {
      this.$store.dispatch("addEntry", this.newEntry);
      this.clearEntry();
    },
    selectEntry(entry) {
      this.newEntry = Object.assign({}, entry);
    },
    updateEntry() {
      this.$store.dispatch("updateEntry", this.newEntry);
      this.clearEntry();
    },
    removeEntry() {
      this.$store.dispatch("deleteEntry", this.selectedEntry);
      this.clearEntry();
    },
    clearEntry() {
      this.newEntry = {
        title: "",
        location: "",
        text: "",
        order: 1,
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      };
      this.selectedEntry = "undefined";
    },
    addAction(event) {
      if (this.newEntry.entryId) {
        const entryIndex = this.findEntry(this.newEntry.entryId);
        this.$store.commit("ADD_ACTION", {
          entryIndex: entryIndex,
          action: event.action
        });
      } else {
        this.newEntry.actions.push(event.action);
      }
    },
    editAction(event) {
      if (this.newEntry.entryId) {
        const entryIndex = this.findEntry(this.newEntry.entryId);
        this.$store.commit("UPDATE_ACTION", {
          entryIndex: entryIndex,
          actionIndex: event.index,
          action: event.action,
        });
      } else {
        Object.assign(this.newEntry.actions[event.index], event.action);
      }
    },
    deleteAction(actionIndex) {
      if (this.newEntry.entryId) {
        const entryIndex = this.findEntry(this.newEntry.entryId);
        this.$store.commit("DELETE_ACTION", { entryIndex, actionIndex });
      } else {
        this.newEntry.actions.splice(actionIndex, 1);
      }
    },
    publishQuest() {
      this.$store.dispatch("publishQuest");
    },
    findEntry(value) {
      const array = this.entries;
      const attr = "entryId";
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }
  }
};
</script>

<style></style>
