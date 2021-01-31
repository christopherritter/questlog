<template>
  <v-responsive :aspect-ratio="16 / 6">
    <v-sheet color="dark" elevation="1" width="100%" height="100%">
      <v-container>
        <v-row>
          <v-col>
            <h1>Home</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-responsive>
</template>

<script>
export default {
  name: "home",
  layout: "fluid"
};
</script>
