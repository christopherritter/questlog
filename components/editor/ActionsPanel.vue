<template>
  <v-list subheader two-line class="my-4">
    <v-subheader class="px-0">Actions</v-subheader>
    <v-list-item class="px-0" v-for="action in actions" :key="action.text">
      <v-list-item-avatar>
        <v-icon :class="action.color" dark v-text="action.icon"></v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="action.text"></v-list-item-title>

        <v-list-item-subtitle v-text="action.target"></v-list-item-subtitle>
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
          <v-btn block dark large outlined class="mb-2" v-bind="attrs" v-on="on">
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
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedAction.text"
                    label="Text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedAction.type"
                    label="Type"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedAction.target"
                    label="Target"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedAction.icon"
                    label="Icon"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedAction.color"
                    label="Color"
                  ></v-text-field>
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
export default {
  name: "actionsPanel",
  data() {
    return {
      editedIndex: -1,
      editedAction: {
        text: "",
        type: "",
        target: "",
        icon: "",
        color: "",
      },
      defaultAction: {
        text: "",
        type: "",
        target: "",
        icon: "",
        color: "",
      },
      dialog: false,
      dialogDelete: false
    };
  },
  props: ['actions'],
  methods: {
    editAction(action) {
      this.editedIndex = this.actions.indexOf(action);
      this.editedAction = Object.assign({}, action);
      this.dialog = true;
    },

    deleteAction() {
      this.dialog = false;
      this.dialogDelete = true;
    },

    deleteActionConfirm() {
      this.$emit('delete-action', this.editedIndex );
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
    },

    save() {
      if (this.editedIndex > -1) {
        this.$emit('edit-action', { action: this.editedAction, index: this.editedIndex })
      } else {
        this.$emit('add-action', { action: this.editedAction })
      }
      this.close();
    }
  }
};
</script>

<style></style>
