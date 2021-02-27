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
                v-model="item.description"
                label="Description"
                hide-details="auto"
                outlined
              ></v-textarea>
              <ActionsPanel
                :objectives="objectives"
                :locations="locations"
                :actions="item.actions"
                @add-action="addAction($event)"
                @edit-action="editAction($event)"
                @delete-action="deleteAction($event)"
              />
              <v-autocomplete
                v-model="item.requirements"
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
                v-model="item.expiration"
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
                v-model="item.objectives"
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
                  v-if="selectedItem == 'undefined'"
                  :disable="!selectedLocation"
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
        <v-col cols="12" md="7" lg="8" class="d-flex flex-column">
          <div class="d-flex flex-shrink-0 mt-5 mb-4 align-center">
            <v-btn text dark :disabled="!selectedItem" @click="removeItem()">
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
          </div>
          <!-- <div v-if="sortedItems.length <= 0">
            <v-card outlined>
              <v-card-text>
                Add items to your quest with the form on the left.
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
            <v-list-item-group v-model="selectedItem" color="green">
              <template v-for="(item, e) in location.items">
                <v-list-item
                  :key="`item-${l}-${e}`"
                  :value="`item-${l}-${e}`"
                  @click="
                    selectItem({
                      locationIndex: l,
                      itemIndex: e,
                      item: item
                    })
                  "
                >
                  <v-list-item-avatar>
                    <v-icon dark color="grey darken-3" class="grey lighten-1">
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
            <v-btn dark @click="publishQuest()" color="primary" class="ml-2">
              Publish
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
  name: "ItemsTab",
  data() {
    return {
      item: {
        name: "",
        description: "",
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      },
      sortedItems: [],
      selectedItem: "undefined",
      selectedLocation: null,
      locationIndex: null,
      itemIndex: null
    };
  },
  props: ['objectives', 'locations'],
  components: { ActionsPanel },
  methods: {
    ...mapMutations([
      "ADD_ITEM_EDITOR",
      "UPDATE_ITEM_EDITOR",
      "REMOVE_ITEM_EDITOR"
    ]),
    addItem() {
      var index = this.locations.indexOf(this.selectedLocation);
      this.$store.commit("ADD_ITEM_EDITOR", {
        selectedLocation: index,
        item: this.item
      });
      this.clearItem();
    },
    selectItem(obj) {
      Object.assign(this.item, obj.item);
      this.selectedLocation = this.locations[obj.locationIndex];
      this.locationIndex = obj.locationIndex;
      this.itemIndex = obj.itemIndex;
    },
    updateItem() {
      this.$store.commit("UPDATE_ITEM_EDITOR", {
        selectedLocation: this.locationIndex,
        selectedItem: this.itemIndex,
        item: this.item
      });
      this.clearItem();
    },
    removeItem() {
      this.$store.commit("REMOVE_ITEM_EDITOR", {
        locationIndex: this.locationIndex,
        itemIndex: this.itemIndex
      });
      this.clearItem();
    },
    clearItem() {
      this.selectedItem = "undefined";
      this.selectedLocation = null;
      this.item = {
        name: "",
        location: {},
        description: "",
        actions: [],
        requirements: [],
        expiration: [],
        objectives: []
      };

      this.selectedItem = "undefined";
      this.selectedLocation = null;
      this.locationIndex = null;
      this.itemIndex = null;
    },
    addAction(event) {
      this.item.actions.push(event.action);
    },
    editAction(event) {
      Object.assign(this.item.actions[event.index], event.action);
    },
    deleteAction(index) {
      this.item.actions.splice(index, 1);
    },
    publishQuest() {
      this.$store.dispatch("publishQuest");
    }
  }
};
</script>

<style></style>
