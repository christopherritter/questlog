<template>
  <v-list dense>
    <v-subheader>JOURNAL</v-subheader>
    <v-list-item v-for="objective in objectives" :key="objective.objectiveId">
      <v-list-item-icon>
        <v-icon>mdi-check</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ objective.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "QuestJournal",
  props: ["objectives"],
};
</script>
