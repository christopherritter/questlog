<template>
  <v-expansion-panels v-model="panels" :disabled="$vuetify.breakpoint.smAndUp" tile flat>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Backpack
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <v-list-item v-for="item in items" :key="item.itemId" class="px-0">
            <v-list-item-icon>
              <v-icon>mdi-bag-personal</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "QuestBackpack",
  data() {
    return {
      panels: 0
    }
  },
  mounted() {
    if (this.$vuetify.breakpoint.mobile) {
      this.panels = null;
    }
  },
  props: ["items"]
};
</script>
