<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="5" lg="4">
          <v-row>
            <v-col>
              <div class="d-flex mt-5 mb-4 align-center">
                <h1>Actions</h1>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="clearAction()"
                  :disabled="currentAction == null"
                >
                  <v-icon class="mr-2" dark>
                    mdi-plus-circle
                  </v-icon>
                  New
                </v-btn>
              </div>
              <v-text-field
                v-model="newAction.name"
                label="Name"
                outlined
              ></v-text-field>
              <v-select :items="actionTypes" label="Type" outlined></v-select>
              <v-select v-if="newAction.type='Move'" :items="locations" label="Locations" outlined></v-select>
              <div class="d-flex justify-end">
                <v-btn dark outlined disabled>Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="currentAction == null"
                  :disabled="newAction.name.length <= 0"
                  dark
                  outlined
                  color="primary"
                  @click="addAction()"
                  >Add</v-btn
                >
                <v-btn
                  v-else
                  dark
                  outlined
                  @click="updateAction()"
                  color="primary"
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
              :disabled="!currentAction"
              @click="removeAction()"
            >
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
          </div>
          <div v-if="actions.length <= 0">
            <v-card outlined>
              <v-card-text>
                Add actions to your quest with the form on the left.
              </v-card-text>
            </v-card>
          </div>
          <v-radio-group class="flex-shrink-0" v-model="currentAction">
            <v-radio
              v-for="(action, index) in actions"
              :key="index"
              :label="action.name"
              :value="index"
              @click="selectAction(index)"
            ></v-radio>
          </v-radio-group>
          <div class="d-flex flex-grow-1 flex-shrink-1 align-end justify-end">
            <v-btn outlined dark @click="$emit('change-tab', 'region')">
              Back
            </v-btn>
            <v-btn
              outlined
              dark
              class="ml-2"
              @click="$emit('change-tab', 'locations')"
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
  name: "ActionsEditor",
  data() {
    return {
      newAction: {
        name: "",
        type: "",
        target: ""
      },
      currentAction: null
    };
  },
  computed: {
    ...mapState({
      actions: state => state.editor.actions,
      actionTypes: state => state.actionTypes,
      locations: state => state.editor.locations,
      items: state => state.editor.items,
    })
  },
  methods: {
    addAction() {
      this.$store.dispatch("addAction", this.newAction);
      this.clearAction();
    },
    selectAction(index) {
      this.newAction = {
        name: this.actions[index].name,
        type: this.actions[index].type,
        target: this.actions[index].target
      };
    },
    updateAction() {
      this.$store.dispatch("updateAction", {
        currentAction: this.currentAction,
        newAction: this.newAction
      });
      this.clearAction();
    },
    removeAction() {
      var actions = this.actions.map(e => e);
      actions.splice(this.currentAction, 1);
      this.$store.dispatch("updateActions", actions);
      this.clearAction();
    },
    clearAction() {
      this.newAction = {
        name: "",
        type: "",
        target: ""
      };
      this.currentAction = null;
    }
  }
};
</script>

<style></style>
