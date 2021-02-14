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
                <v-btn text>
                  <v-icon class="mr-2" dark>
                    mdi-plus-circle
                  </v-icon>
                  New
                </v-btn>
              </div>
              <v-text-field
                v-model="action.name"
                label="Name"
                outlined
              ></v-text-field>
              <v-autocomplete
                v-model="action.type"
                :items="activities"
                label="Type"
                item-text="name"
                item-value="id"
                clearable
                outlined
              ></v-autocomplete>
              <div class="d-flex justify-end">
                <v-btn dark outlined disabled>Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="!isSelected" dark outlined @click="addAction()"
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
          <div v-if="actions.length <= 0">
            <v-card outlined>
              <v-card-text>
                Add actions to your quest with the form on the left.
              </v-card-text>
            </v-card>
          </div>
          <v-radio-group class="flex-shrink-0" v-model="radioGroup">
            <v-radio
              v-for="(action, index) in actions"
              :key="index"
              :label="action.name"
              :value="index"
              @click="selectAction(index)"
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
  name: "ActionsEditor",
  data() {
    return {
      action: {
        name: "",
        type: "",
      },
      radioGroup: null
    };
  },
  props: ['actions', 'activities'],
  computed: {
    isSelected() {
      if (this.action == this.actions[this.radioGroup]) return true;
      return false;
    }
  },
  methods: {
    addAction() {
      let newAction = JSON.parse(JSON.stringify(this.action));
      this.actions.push(newAction);
      this.radioGroup = this.actions.length;
    },
    selectAction(index) {
      this.action = this.actions[index];
    }
  }
};
</script>

<style></style>
