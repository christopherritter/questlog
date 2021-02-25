<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="5" lg="4">
          <v-row>
            <v-col>
              <div class="d-flex mt-5 mb-4 align-center">
                <h1>Objectives</h1>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="clearObjective()"
                  :disabled="currentObjective == null"
                >
                  <v-icon class="mr-2" dark>
                    mdi-plus-circle
                  </v-icon>
                  New
                </v-btn>
              </div>
              <v-text-field
                v-model="newObjective.name"
                label="Name"
                outlined
              ></v-text-field>
              <v-textarea
                v-model="newObjective.description"
                label="Description"
                outlined
              ></v-textarea>
              <v-checkbox
                v-model="newObjective.isPrimary"
                label="Primary Objective"
              ></v-checkbox>
              <div class="d-flex justify-end">
                <v-btn
                  v-if="currentObjective == null"
                  :disabled="newObjective.name.length <= 0"
                  dark
                  outlined
                  color="primary"
                  @click="addObjective()"
                  >Add</v-btn
                >
                <v-btn
                  v-else
                  dark
                  outlined
                  @click="updateObjective()"
                  color="primary"
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
            <v-btn
              text
              dark
              :disabled="!currentObjective"
              @click="removeObjective()"
            >
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
          </div>
          <div v-if="objectives.length <= 0">
            <v-card outlined>
              <v-card-text>
                Add objectives to your quest with the form on the left.
              </v-card-text>
            </v-card>
          </div>
          <v-radio-group class="flex-shrink-0" v-model="currentObjective">
            <v-radio
              v-for="(objective, index) in objectives"
              :key="index"
              :label="objective.name"
              :value="index"
              @click="selectObjective(index)"
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
              Publish
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ObjectivesTab",
  data() {
    return {
      newObjective: {
        name: "",
        description: "",
        isPrimary: false
      },
      currentObjective: null
    };
  },
  props: ["objectives"],
  methods: {
    ...mapMutations([
      "ADD_OBJECTIVE_EDITOR",
      "UPDATE_OBJECTIVE_EDITOR",
      "SET_OBJECTIVES_EDITOR"
    ]),
    addObjective() {
      this.$store.commit("ADD_OBJECTIVE_EDITOR", this.newObjective);
      this.clearObjective();
    },
    selectObjective(index) {
      const objective = this.objectives[index];
      this.newObjective = {
        name: objective.name,
        description: objective.description,
        isPrimary: objective.isPrimary
      };
    },
    updateObjective() {
      this.$store.commit("UPDATE_OBJECTIVE_EDITOR", {
        currentObjective: this.currentObjective,
        newObjective: this.newObjective
      });
      this.clearObjective();
    },
    clearObjective() {
      this.newObjective = {
        name: "",
        description: "",
        isPrimary: false
      };
      this.currentObjective = null;
    }
  }
};
</script>

<style></style>