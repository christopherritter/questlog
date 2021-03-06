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
                v-model="newItem.name"
                label="Name"
                outlined
              ></v-text-field>
              <v-autocomplete
                v-model="newItem.location"
                :items="locations"
                label="Location"
                item-text="name"
                item-value="locationId"
                outlined
              ></v-autocomplete>
              <v-textarea
                v-model="newItem.description"
                label="Description"
                outlined
              ></v-textarea>
              <v-text-field
                v-model="newItem.order"
                label="Order"
                outlined
                hide-details
              ></v-text-field>
              <ActionsPanel
                :objectives="objectives"
                :locations="locations"
                :actions="newItem.actions"
                @add-action="addAction($event)"
                @edit-action="editAction($event)"
                @delete-action="deleteAction($event)"
              />
              <v-autocomplete
                v-model="newItem.requirements"
                :items="objectives"
                label="Requirements"
                item-text="name"
                item-value="objectiveId"
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="newItem.expiration"
                :items="objectives"
                label="Expiration"
                item-text="name"
                item-value="objectiveId"
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="newItem.objectives"
                :items="objectives"
                label="Objectives"
                item-text="name"
                item-value="objectiveId"
                multiple
                outlined
              ></v-autocomplete>
              <div class="d-flex justify-end">
                <v-btn
                  v-if="selectedItem == 'undefined'"
                  :disabled="newItem.location == ''"
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
                <v-spacer></v-spacer>
                <v-btn dark outlined disabled>Reset</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="7" lg="8">
          <v-row class="mt-5 mb-4 align-center">
            <v-btn text dark :disabled="!selectedItem" @click="removeItem()">
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
                Add items to your quest with the form on the left.
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
                <v-list-item-group v-model="selectedItem" color="green">
                  <template v-for="(item, i) in location.items">
                    <v-list-item
                      :key="`item-${l}-${i}`"
                      :value="`item-${l}-${i}`"
                      @click="
                        selectItem({
                          locationIndex: l,
                          location: location,
                          itemIndex: i,
                          item: item
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
                          v-text="item.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="item.description"
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
                            item.order
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
  name: "ItemsTab",
  data() {
    return {
      newItem: {
        title: "",
        text: "",
        location: "",
        order: 1,
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      },
      selectedLocation: {},
      selectedItem: "undefined",
      locationIndex: null,
      itemIndex: null,
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
          this.$store.commit("SET_LOCATIONS", locations);
        }
      } else if (val === "Numerically") {
        locations.sort((a, b) => (a.order > b.order ? 1 : -1));

        if (locations != this.locations) {
          this.$store.commit("SET_LOCATIONS", locations);
        }
      }

      this.clearItem();
    },
    'newItem.location': function (val){
      const locationIndex = this.findWithAttr(val);
      this.selectedLocation = this.locations[locationIndex];
     },
  },
  methods: {
    ...mapActions(["publishQuest"]),
    ...mapMutations([
      "ADD_ITEM",
      "UPDATE_ITEM",
      "REMOVE_ITEM"
    ]),
    addItem() {
      const locationId = this.newItem.location;
      const locationIndex = this.findWithAttr(locationId);
      this.$store.commit("ADD_ITEM", {
        selectedLocation: locationIndex,
        item: this.newItem
      });
      this.clearItem();
    },
    selectItem(obj) {
      // const locationIndex = this.locations.indexOf(obj.location);
      this.newItem = obj.item;
      this.newItem.location = obj.location.locationId;
      if (!obj.location.order) {
        this.newItem.order = 1;
      }
      // this.locationIndex = locationIndex;
      this.itemIndex = obj.itemIndex;
    },
    updateItem() {
      const locationId = this.newItem.location;
      const locationIndex = this.findWithAttr(locationId);
      this.$store.commit("UPDATE_ITEM", {
        selectedLocation: locationIndex,
        selectedItem: this.itemIndex,
        item: this.newItem
      });
      this.clearItem();
    },
    removeItem() {
      const locationId = this.newItem.location;
      const locationIndex = this.findWithAttr(locationId);

      this.$store.commit("REMOVE_ITEM", {
        locationIndex: locationIndex,
        itemIndex: this.itemIndex
      });
      this.clearItem();
    },
    clearItem() {
      this.selectedItem = "undefined";
      this.newItem = {
        title: "",
        location: "",
        text: "",
        order: 1,
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      };

      this.selectedItem = "undefined";
      this.locationIndex = null;
      this.itemIndex = null;
    },
    addAction(event) {
      this.newItem.actions.push(event.action);
    },
    editAction(event) {
      Object.assign(this.newItem.actions[event.index], event.action);
    },
    deleteAction(index) {
      this.newItem.actions.splice(index, 1);
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
