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
                item-value="id"
                clearable
                outlined
              ></v-autocomplete>
              <v-textarea
                v-model="newEntry.text"
                label="Text"
                outlined
              ></v-textarea>
              <v-select :items="actions" label="Actions" outlined></v-select>
              <v-autocomplete
                v-model="newEntry.requirements"
                :items="objectives"
                label="Requirements"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="newEntry.expiration"
                :items="objectives"
                label="Expiration"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="newEntry.objectives"
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
                  v-if="!entry"
                  :disable="newEntry.title.length <= 0"
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
            <v-btn
              text
              dark
              :disabled="selectedEntry == 'undefined'"
              @click="removeEntry()"
            >
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
          </div>
          <div v-if="entries.length <= 0">
            <v-card outlined>
              <v-card-text>
                Add entries to your quest with the form on the left.
              </v-card-text>
            </v-card>
          </div>
          <v-list v-else subheader two-line>
            <span>
              <v-subheader inset>Location</v-subheader>
              <v-list-item-group v-model="selectedEntry" color="green">
                <v-list-item
                  v-for="(entry, index) in entries"
                  :key="index"
                  @click="selectEntry(index)"
                >
                  <v-list-item-avatar>
                    <v-icon class="grey lighten-1" dark>
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
              </v-list-item-group>
              <v-divider inset></v-divider>
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
import { mapState } from "vuex";

export default {
  name: "EntriesEditor",
  data() {
    return {
      newEntry: {
        title: "",
        location: {},
        text: "",
        requirements: [],
        expiration: [],
        objectives: []
      },
      selectedEntry: "undefined"
    };
  },
  computed: {
    ...mapState({
      objectives: state => state.editor.objectives,
      locations: state => state.editor.locations,
      entry: state => state.editor.entry,
      entries: state => state.editor.entries,
      actions: state => state.editor.actions
    })
  },
  methods: {
    addEntry() {
      this.$store.dispatch("addEntry", this.newEntry);
      this.clearEntry();
    },
    selectEntry(index) {
      this.$store.dispatch("selectEntry", index);
      this.newEntry = {
        title: this.entries[index].title,
        location: this.entries[index].location,
        text: this.entries[index].text,
        requirements: this.entries[index].requirements,
        expiration: this.entries[index].expiration,
        objectives: this.entries[index].objectives
      };
    },
    updateEntry() {
      this.$store.dispatch("updateEntry", {
        selectedEntry: this.selectedEntry,
        newEntry: this.newEntry
      });
      this.clearEntry();
    },
    removeEntry() {
      var entries = this.entries.map(e => e);
      entries.splice(this.selectedEntry, 1);
      this.$store.dispatch("updateEntries", entries);
      this.clearEntry();
    },
    clearEntry() {
      this.$store.dispatch("clearEntry");
      this.selectedEntry = null;
      this.newEntry = {
        title: "",
        location: {},
        text: "",
        requirements: [],
        expiration: [],
        objectives: []
      };
    }
  }
};
</script>

<style></style>
