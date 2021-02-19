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
                item-value="id"
                clearable
                outlined
              ></v-autocomplete>
              <v-textarea
                v-model="newItem.description"
                label="Description"
                outlined
              ></v-textarea>
              <v-select :items="actions" label="Actions" outlined></v-select>
              <v-autocomplete
                v-model="newItem.requirements"
                :items="objectives"
                label="Requirements"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="newItem.expiration"
                :items="objectives"
                label="Expiration"
                item-text="name"
                item-value="id"
                clearable
                multiple
                outlined
              ></v-autocomplete>
              <v-autocomplete
                v-model="newItem.objectives"
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
                  v-if="!item"
                  :disable="newItem.name.length <= 0"
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
                  @click="updateItem(newItem)"
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
              :disabled="selectedItem == 'undefined'"
              @click="removeItem(newItem)"
            >
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
          </div>
          <div v-if="items.length <= 0">
            <v-card outlined>
              <v-card-text>
                Add items to your quest with the form on the left.
              </v-card-text>
            </v-card>
          </div>
          <v-list v-else subheader two-line>
            <span v-for="(location, l) in locations" :key="l">
              <v-subheader inset>{{ location.name }}</v-subheader>
              <v-list-item-group v-model="selectedItem" :group="location[l]" color="green">
                <template v-for="(item, i) in sortedItems(location)">
                  <v-list-item
                    :key="`item-${l}-${i}`"
                    :value="`item-${l}-${i}`"
                    @click="selectItem(item)"
                  >
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
              <v-divider inset class="mt-4 mb-2"></v-divider>
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
  name: "ItemsEditor",
  data() {
    return {
      newItem: {
        name: "",
        location: {},
        description: "",
        requirements: [],
        expiration: [],
        objectives: []
      },
      selectedItem: "undefined"
    };
  },
  computed: {
    ...mapState({
      objectives: state => state.editor.objectives,
      locations: state => state.editor.locations,
      item: state => state.editor.item,
      items: state => state.editor.items,
      actions: state => state.editor.actions
    }),
  },
  methods: {
    addItem() {
      console.log("Add item.")
      this.$store.dispatch("addItem", this.newItem);
      this.clearItem();
    },
    selectItem(item) {
      this.$store.dispatch("selectItem", item.itemIndex);
      this.newItem = {
        name: item.name,
        location: item.location,
        description: item.description,
        requirements: item.requirements,
        expiration: item.expiration,
        objectives: item.objectives,
        itemIndex: item.itemIndex,
      };
    },
    updateItem(item) {
      var index = item.itemIndex;
      this.$store.dispatch("updateItem", {
        selectedItem: index,
        newItem: this.newItem
      });
      this.clearItem();
    },
    removeItem(item) {
      var index = item.itemIndex;
      var items = this.items.map(e => e);
      items.splice(index, 1);
      this.$store.dispatch("updateItems", items);
      this.clearItem();
    },
    clearItem() {
      this.$store.dispatch("clearItem");
      this.selectedItem = null;
      this.newItem = {
        name: "",
        location: {},
        description: "",
        requirements: [],
        expiration: [],
        objectives: [],
      };
    },
    sortedItems(location) {
      const items = this.items;
      var sortedItems = [];

      for (let i = 0; i < items.length; i++ ) {
        if (location.name == items[i].location) {
          items[i].itemIndex = i;
          sortedItems.push(items[i])
        }
      }

      return sortedItems;
    }
  }
};
</script>

<style></style>
