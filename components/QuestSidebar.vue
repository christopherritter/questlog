<template>
  <v-card width="480" light tile elevation="0">
    <v-navigation-drawer permanent width="480">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ location.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-expansion-panels accordion flat v-if="entries">
        <v-expansion-panel v-for="entry in entries" :key="entry.id">
          <v-expansion-panel-header>{{ entry.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>{{ entry.text }}</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-list dense nav>
        <v-list-item v-for="action in actions" :key="action.id" @click="$emit('view-location', action.forward)">
          <v-list-item-icon>
            <v-icon>{{ action.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ action.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "QuestSidebar",
  props: ['location', 'entries', 'actions'],
};
</script>
