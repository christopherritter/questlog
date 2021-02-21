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
                <v-btn text @click="clearItem()">
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
              <v-autocomplete
                v-model="item.location"
                :items="locations"
                label="Location"
                item-text="name"
                item-value="id"
                clearable
                outlined
              ></v-autocomplete>
              <v-textarea
                v-model="item.description"
                label="Description"
                outlined
              ></v-textarea>
              <v-select :items="actions" label="Actions" outlined></v-select>
              <v-autocomplete
                v-model="item.requirements"
                :items="objectives"
                label="Requirements"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="item.expiration"
                :items="objectives"
                label="Expiration"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="item.objectives"
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
                  v-if="selectedItem == 'undefined'"
                  :disable="item.name.length <= 0"
                  dark
                  outlined
                  @click="addItem()"
                  >Add</v-btn
                >
                <v-btn
                  v-else
                  dark
                  outlined
                  color="primary"
                  @click="updateItem()"
                  >Update</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7" lg="8" class="d-flex flex-column">
          <div class="d-flex flex-shrink-0 mt-5 mb-4 align-center">
            <v-btn text dark :disabled="!selectedItem" @click="removeItem()">
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
          </div>
          <div v-if="sortedItems.length <= 0">
            <v-card outlined>
              <v-card-text>
                Add items to your quest with the form on the left.
              </v-card-text>
            </v-card>
          </div>
          <v-list v-else subheader two-line>
            <span v-for="(location, s) in sortedItems" :key="s">
              <v-subheader inset>{{ location.name }}</v-subheader>
            <v-list-item-group v-model="selectedItem" color="green">
              <template v-for="(item, e) in location.items">
                <v-list-item :key="`item-${s}-${e}`" :value="`item-${s}-${e}`" @click="selectItem(item)">
                  <v-list-item-avatar>
                    <v-icon class="grey lighten-1">
                      mdi-feather
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>

                    <v-list-item-subtitle
                      v-text="item.description"
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
              v-if="sortedItems.length > 1"
            ></v-divider>
            </span>
          </v-list>
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
import { mapState, mapMutations } from "vuex";

export default {
  name: "ItemsEditor",
  data() {
    return {
      item: {
        name: "",
        location: {},
        description: "",
        requirements: [],
        expiration: [],
        objectives: [],
        itemIndex: null
      },
      sortedItems: [],
      selectedItem: "undefined"
    };
  },
  computed: {
    ...mapState({
      objectives: state => state.editor.objectives,
      locations: state => state.editor.locations,
      actions: state => state.editor.actions,
      items: state => state.editor.items
    })
  },
  mounted() {
    this.sortItems();
  },
  methods: {
    ...mapMutations([
      "ADD_ITEM_EDITOR",
      "UPDATE_ITEM_EDITOR",
      "SET_ITEMS_EDITOR"
    ]),
    addItem() {
      this.$store.commit("ADD_ITEM_EDITOR", this.item);
      this.clearItem();
    },
    selectItem(item) {
      this.item = {
        name: item.name,
        location: item.location,
        description: item.description,
        requirements: item.requirements,
        expiration: item.expiration,
        objectives: item.objectives,
        itemIndex: item.itemIndex
      };
    },
    updateItem() {
      this.$store.commit("UPDATE_ITEM_EDITOR", {
        selectedItem: this.item.itemIndex,
        newItem: this.item
      });
      this.clearItem();
    },
    removeItem() {
      var index = this.item.itemIndex;
      var items = this.items.map(e => e);
      items.splice(index, 1);
      this.$store.commit("SET_ITEMS_EDITOR", items);
      this.clearItem();
    },
    clearItem() {
      this.selectedItem = "undefined";
      this.item = {
        name: "",
        location: {},
        description: "",
        requirements: [],
        expiration: [],
        objectives: []
      };
      this.sortItems();
    },
    sortItems() {
      var items = [], sortedItems = [];

      for (let e = 0; e < this.items.length; e++) {
        var item = this.items[e];
        item.itemIndex = e;
        items.push(item);
      }

      for (let l = 0; l < this.locations.length; l++) {
        var sortedLocation = {};
        sortedLocation.name = this.locations[l].name;
        sortedLocation.items = [];

        for (let s = 0; s < items.length; s++) {
          if (items[s].location == this.locations[l].name) {
            sortedLocation.items.push(items[s]);
          }
        }

        if (sortedLocation.items.length > 0) {
          sortedItems.push(sortedLocation);
        }
      }

      this.sortedItems = sortedItems;
    }
  }
};
</script>

<style></style>
