<template>
  <v-list dense>
    <v-subheader>BACKPACK</v-subheader>
    <v-list-item v-for="item in items" :key="item.itemId">
      <v-list-item-icon>
        <v-icon>mdi-bag-personal</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "QuestBackpack",
  props: ["items"],
};
</script>
