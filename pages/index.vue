<template>
  <v-responsive :aspect-ratio="16 / 6">
    <v-sheet color="dark" elevation="1" width="100%" height="100%">
      <v-container style="height:100%">
        <v-row>
          <v-col cols="6" sm="6">
            <h5>Featured Quest</h5>
            <h1 class="display-3">Welcome to the Learning Tree Farm</h1>
            <h3>by The Learning Tree</h3>
            <v-btn color="primary">More Info</v-btn>
          </v-col>
          <v-col cols="6" sm="6">
            <v-img :src="require('~/assets/img/welcome-sign.png')" aspect-ratio="1.4"></v-img>
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
