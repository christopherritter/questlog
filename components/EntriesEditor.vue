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
                <v-btn text>
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
                outlined
              ></v-textarea>
              <v-select :items="actions" label="Actions" outlined></v-select>
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
                <v-btn v-if="!isSelected" dark outlined @click="addEntry()"
                  >Add</v-btn
                >
                <v-btn v-else dark outlined color="primary">Update</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7" lg="8" class="d-flex flex-column">
          <div class="d-flex flex-shrink-0 mt-5 mb-4 align-center">
            <v-btn text dark :disabled="!isSelected">
              <v-icon class="mr-2">
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
            <v-btn text dark :disabled="!isSelected">
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
          <v-radio-group class="flex-shrink-0" v-model="radioGroup">
            <v-radio
              v-for="(entry, index) in entries"
              :key="index"
              :label="entry.title"
              :value="index"
              @click="selectEntry(index)"
            ></v-radio>
          </v-radio-group>
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
      },
      radioGroup: null
    };
  },
  props: ["locations", "entries", "actions", "objectives"],
  computed: {
    isSelected() {
      if (this.entry == this.entries[this.radioGroup]) return true;
      return false;
    }
  },
  methods: {
    addEntry() {
      let newEntry = JSON.parse(JSON.stringify(this.entry));
      this.$emit("add-entry", newEntry);
      this.radioGroup = this.entries.length;
    },
    selectEntry(index) {
      this.entry = this.entries[index];
    }
  }
};
</script>

<style></style>
