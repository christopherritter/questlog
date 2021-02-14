<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="5" lg="4">
          <v-row>
            <v-col>
              <div class="d-flex mt-5 mb-4 align-center">
                <h1>Items</h1>
                <v-spacer></v-spacer>
                <v-btn text>
                  <v-icon class="mr-2" dark>
                    mdi-plus-circle
                  </v-icon>
                  New
                </v-btn>
              </div>
              <v-text-field
                v-model="item.name"
                label="Name"
                outlined
              ></v-text-field>
              <v-select :items="locations" label="Location" outlined></v-select>
              <v-text-field
                v-model="item.image"
                label="Image"
                outlined
              ></v-text-field>
              <v-select :items="entries" label="Entries" outlined></v-select>
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
            <v-btn outlined dark @click="$emit('change-tab', 'entries')">
              Back
            </v-btn>
            <v-btn
              outlined
              dark
              class="ml-2"
              disabled
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
  name: "ItemsEditor",
  data() {
    return {
      item: {
        name: "",
        image: "",
      },
      items: [],
      radioGroup: null
    };
  },
  props: ['locations', 'entries'],
  computed: {
    isSelected() {
      if (this.item == this.items[this.radioGroup]) return true;
      return false;
    }
  },
  methods: {
    addItem() {
      let newItem = JSON.parse(JSON.stringify(this.item));
      this.items.push(newItem);
      this.radioGroup = this.items.length;
    },
    selectItem(index) {
      this.item = this.items[index];
    }
  }
};
</script>

<style></style>
