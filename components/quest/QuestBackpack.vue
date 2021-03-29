<template>
  <v-expansion-panels
    v-model="panels"
    :disabled="$vuetify.breakpoint.mdAndUp"
    tile
    flat
  >
    <v-expansion-panel>
      <v-expansion-panel-header>
        Backpack
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <v-list-item
            v-for="item in personalItems"
            :key="item.itemId"
            class="px-0"
            @click="selectedItem = item; dialog = true"
          >
            <v-list-item-icon>
              <v-icon>mdi-bag-personal</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
      <v-dialog v-model="dialog" max-width="480" dark>
        <v-card>
          <v-card-title class="headline">
            {{ selectedItem.name }}
          </v-card-title>

          <v-card-text>
            {{ selectedItem.description }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "QuestBackpack",
  data() {
    return {
      panels: 0,
      dialog: false,
      selectedItem: {}
    };
  },
  mounted() {
    this.setPanels();
  },
  props: ["items"],
  computed: {
    personalItems() {
      var personalItems = this.items.filter(item => item.isOwned == true);
      return personalItems;
    }
  },
  methods: {
    setPanels() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.panels = 0;
      }
    }
  }
};
</script>
