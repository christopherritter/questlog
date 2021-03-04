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
                return-object
              ></v-autocomplete>
              <v-textarea
                v-model="newEntry.text"
                label="Text"
                hide-details="auto"
                outlined
              ></v-textarea>
              <ActionsPanel
                :objectives="objectives"
                :locations="locations"
                :actions="newEntry.actions"
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
                    v-model="sortLocations"
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
                v-for="(location, l) in filterByTerm"
                :key="l"
                subheader
                two-line
              >
                <v-subheader>{{ location.name }}</v-subheader>
                <v-list-item-group v-model="selectedEntry" color="green">
                  <template v-for="(entry, e) in location.entries">
                    <v-list-item
                      :key="`item-${l}-${e}`"
                      :value="`item-${l}-${e}`"
                      @click="
                        selectEntry({
                          locationIndex: l,
                          location: location,
                          entryIndex: e,
                          entry: entry
                        })
                      "
                    >
                      <v-list-item-avatar>
                        <v-icon
                          dark
                          color="grey darken-3"
                          class="grey lighten-1"
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
                        <v-btn icon>
                          <v-icon color="grey lighten-1"
                            >mdi-information</v-icon
                          >
                        </v-btn>
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
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      },
      selectedEntry: "undefined",
      locationIndex: null,
      entryIndex: null,
      searchTerm: "",
      sortLocations: "",
      sort: ["Alphabetically", "Numerically"]
    };
  },
  props: ["objectives", "locations"],
  computed: {
    filterByTerm() {
      let searchTerm = this.searchTerm.toLowerCase();
      let locations = this.locations.slice();

      return locations.filter(location => {
        return location.name.toLowerCase().includes(searchTerm);
      });
    }
  },
  components: { ActionsPanel },
  watch: {
    sortLocations(val) {
      let locations = this.locations.slice();

      if (val === "Alphabetically") {
        locations.sort((a, b) => (a.name > b.name ? 1 : -1));

        if (locations != this.locations) {
          this.$store.commit("SET_LOCATIONS_EDITOR", locations);
        }
      } else if (val === "Numerically") {
        locations.sort((a, b) => (a.order > b.order ? 1 : -1));

        if (locations != this.locations) {
          this.$store.commit("SET_LOCATIONS_EDITOR", locations);
        }
      }

      this.clearEntry();
    },
  },
  methods: {
    ...mapActions(["publishQuest"]),
    ...mapMutations([
      "ADD_ENTRY_EDITOR",
      "UPDATE_ENTRY_EDITOR",
      "REMOVE_ENTRY_EDITOR"
    ]),
    addEntry() {
      const locationId = this.newEntry.location.locationId;
      const locationIndex = this.findWithAttr(locationId);
      this.$store.commit("ADD_ENTRY_EDITOR", {
        selectedLocation: locationIndex,
        entry: this.newEntry
      });
      this.clearEntry();
    },
    selectEntry(obj) {
      const locationIndex = this.locations.indexOf(obj.location);
      Object.assign(this.newEntry, obj.entry);
      this.newEntry.location = obj.location.locationId;
      this.locationIndex = locationIndex;
      this.entryIndex = obj.entryIndex;
    },
    updateEntry() {
      const locationId = this.newEntry.location;
      const locationIndex = this.findWithAttr(locationId);
      this.$store.commit("UPDATE_ENTRY_EDITOR", {
        selectedLocation: locationIndex,
        selectedEntry: this.entryIndex,
        entry: this.newEntry
      });
      this.clearEntry();
    },
    removeEntry() {
      const locationId = this.newEntry.location;
      const locationIndex = this.findWithAttr(locationId);

      this.$store.commit("REMOVE_ENTRY_EDITOR", {
        locationIndex: locationIndex,
        entryIndex: this.entryIndex
      });
      this.clearEntry();
    },
    clearEntry() {
      this.selectedEntry = "undefined";
      this.newEntry = {
        title: "",
        location: "",
        text: "",
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      };

      this.selectedEntry = "undefined";
      this.locationIndex = null;
      this.entryIndex = null;
    },
    addAction(event) {
      this.newEntry.actions.push(event.action);
    },
    editAction(event) {
      Object.assign(this.newEntry.actions[event.index], event.action);
    },
    deleteAction(index) {
      this.newEntry.actions.splice(index, 1);
    },
    publishQuest() {
      this.$store.dispatch("publishQuest");
    },
    findWithAttr(value) {
      const array = this.locations;
      const attr = "locationId";
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
