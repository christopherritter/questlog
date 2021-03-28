<template>
  <v-list subheader two-line class="my-4">
    <v-subheader class="px-0">Actions</v-subheader>
    <v-list-item class="px-0" v-for="action in actions" :key="action.text">
      <v-list-item-avatar color="grey darken-3">
        <v-icon dark>{{ action.marker }}</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="action.text"></v-list-item-title>

        <v-list-item-subtitle v-text="action.targetName"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon @click="editAction(action)">
          <v-icon color="grey lighten-1">mdi-pencil</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-list-item class="px-0">
      <v-dialog v-model="dialog" light max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            block
            dark
            large
            outlined
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mr-2">mdi-plus-circle</v-icon>
            Add Action
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Action</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedAction.text"
                    label="Text"
                    outlined
                    hide-details="auto"
                    light
                  ></v-text-field>
                </v-col>

                <!-- <v-col cols="12" sm="12">
                  <v-select
                    v-model="editedAction.marker"
                    :items="markers"
                    label="Marker"
                    outlined
                    light
                    hide-details="auto"
                  ></v-select>
                </v-col> -->

                <v-col cols="12" sm="4">
                  <v-select
                    :items="types"
                    v-model="editedAction.type"
                    label="Type"
                    outlined
                    hide-details="auto"
                    light
                    @change="selectMarker"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-autocomplete
                    v-model="editedAction.target"
                    v-if="editedAction.type == 'move'"
                    :items="locations"
                    label="Target"
                    item-text="name"
                    item-value="locationId"
                    hide-details="auto"
                    outlined
                    light
                    @change="fetchTargetName($event)"
                  ></v-autocomplete>
                  <v-autocomplete
                    v-model="editedAction.target"
                    v-else-if="editedAction.type == 'look' || editedAction.type == 'open' || editedAction.type == 'take'"
                    :items="objectives"
                    label="Objective"
                    item-text="name"
                    item-value="objectiveId"
                    hide-details="auto"
                    outlined
                    light
                    @change="fetchTargetName($event)"
                  ></v-autocomplete>
                  <v-autocomplete
                    v-else
                    label="Target"
                    hide-details="auto"
                    outlined
                    disabled
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-btn color="red darken-1" text @click="deleteAction">
              Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="close">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="375px">
        <v-card light>
          <v-card-title class="headline"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteActionConfirm"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ActionsPanel",
  data() {
    return {
      editedAction: {
        text: "",
        type: "",
        target: "",
        targetName: "",
        marker: ""
      },
      editedIndex: -1,
      defaultAction: {
        text: "",
        type: "",
        target: "",
        targetName: "",
        marker: ""
      },
      dialog: false,
      dialogDelete: false
    };
  },
  props: ["objectives", "locations", "items", "actions"],
  computed: {
    ...mapState({
      types: state => state.actionTypes,
      markers: state => state.markers
    })
  },
  methods: {
    selectMarker() {
      let result = this.types.find(type => type.value == this.editedAction.type);
      this.editedAction.marker = result.marker;
    },
    save() {
      if (this.editedIndex > -1) {
        this.$emit("edit-action", {
          action: this.editedAction,
          index: this.editedIndex
        });
      } else {
        this.$emit("add-action", { action: this.editedAction });
      }
      this.close();
    },
    editAction(action) {
      this.editedIndex = this.actions.indexOf(action);
      this.editedAction = Object.assign({}, action);
      this.dialog = true;
    },
    fetchTargetName(event) {
      if (this.editedAction.type == "move") {
        var targets = this.locations.filter(
          target => target.locationId == event
        );
        this.editedAction.targetName = targets[0].name;
      } else if (this.editedAction.type == "look" || this.editedAction.type == "open" || this.editedAction.type == "take") {
        var targets = this.objectives.filter(
          target => target.objectiveId == event
        );
        this.editedAction.targetName = targets[0].name;
      }
    },
    deleteAction() {
      this.dialog = false;
      this.dialogDelete = true;
    },
    deleteActionConfirm() {
      this.$emit("delete-action", this.editedIndex);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedAction = Object.assign({}, this.defaultAction);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedAction = Object.assign({}, this.defaultAction);
        this.editedIndex = -1;
      });
    }
  }
};
</script>

<style></style>
