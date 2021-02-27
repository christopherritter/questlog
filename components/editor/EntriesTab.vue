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
                v-model="selectedLocation"
                :items="locations"
                label="Location"
                item-text="name"
                clearable
                outlined
                no-filter
                return-object
              ></v-autocomplete>
              <v-textarea
                v-model="entry.text"
                label="Text"
                hide-details="auto"
                outlined
              ></v-textarea>
              <ActionsPanel
                :actions="entry.actions"
                @add-action="addAction($event)"
                @edit-action="editAction($event)"
                @delete-action="deleteAction($event)"
              />
              <v-autocomplete
                v-model="entry.requirements"
                :items="objectives"
                label="Requirements"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
                no-filter
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
                no-filter
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
                no-filter
              ></v-autocomplete>
              <div class="d-flex justify-end">
                <v-btn
                  v-if="selectedEntry == 'undefined'"
                  :disable="!selectedLocation"
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
        <v-col cols="12" md="7" lg="8" class="d-flex flex-column">
          <div class="d-flex flex-shrink-0 mt-5 mb-4 align-center">
            <v-btn text dark :disabled="!selectedEntry" @click="removeEntry()">
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
          </div>
          <!-- <div v-if="sortedEntries.length <= 0">
            <v-card outlined>
              <v-card-text>
                Add entries to your quest with the form on the left.
              </v-card-text>
            </v-card>
          </div> -->
          <v-list
            span
            v-for="(location, l) in locations"
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
                      entryIndex: e,
                      entry: entry
                    })
                  "
                >
                  <v-list-item-avatar>
                    <v-icon dark color="grey darken-3" class="grey lighten-1">
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
            <v-btn
              dark
              @click="publishQuest()"
              color="primary"
              class="ml-2"
            >
              Publish
            </v-btn>
          </div>
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
      entry: {
        title: "",
        text: "",
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      },
      sortedEntries: [],
      selectedEntry: "undefined",
      selectedLocation: null,
      locationIndex: null,
      entryIndex: null
    };
  },
  props: ["objectives", "locations"],
  components: { ActionsPanel },
  methods: {
    ...mapActions(["publishQuest"]),
    ...mapMutations([
      "ADD_ENTRY_EDITOR",
      "UPDATE_ENTRY_EDITOR",
      "REMOVE_ENTRY_EDITOR"
    ]),
    addEntry() {
      var index = this.locations.indexOf(this.selectedLocation);
      this.$store.commit("ADD_ENTRY_EDITOR", {
        selectedLocation: index,
        entry: this.entry
      });
      this.clearEntry();
    },
    selectEntry(obj) {
      Object.assign(this.entry, obj.entry);
      this.selectedLocation = this.locations[obj.locationIndex];
      this.locationIndex = obj.locationIndex;
      this.entryIndex = obj.entryIndex;
    },
    updateEntry() {
      this.$store.commit("UPDATE_ENTRY_EDITOR", {
        selectedLocation: this.locationIndex,
        selectedEntry: this.entryIndex,
        entry: this.entry
      });
      this.clearEntry();
    },
    removeEntry() {
      this.$store.commit("REMOVE_ENTRY_EDITOR", {
        locationIndex: this.locationIndex,
        entryIndex: this.entryIndex
      });
      this.clearEntry();
    },
    clearEntry() {
      this.selectedEntry = "undefined";
      this.selectedLocation = null;
      this.entry = {
        title: "",
        location: {},
        text: "",
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      };

      this.selectedEntry = "undefined";
      this.selectedLocation = null;
      this.locationIndex = null;
      this.entryIndex = null;
    },
    addAction(event) {
      this.entry.actions.push(event.action);
    },
    editAction(event) {
      Object.assign(this.entry.actions[event.index], event.action);
    },
    deleteAction(index) {
      this.entry.actions.splice(index, 1);
    },
    publishQuest() {
      this.$store.dispatch("publishQuest");
    }
  }
};
</script>

<style></style>
