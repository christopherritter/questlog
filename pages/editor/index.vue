<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="pt-6 pb-2">Quest Editor</h1>
        <p>
          Build your own quest using the sections below. Once you're finished
          you can save it to share with other adventurers.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form>
          <v-tabs vertical>
            <v-tab>
              About
            </v-tab>
            <v-tab>
              Region
            </v-tab>
            <v-tab>
              Objectives
            </v-tab>
            <v-tab>
              Locations
            </v-tab>
            <v-tab>
              Entries
            </v-tab>
            <v-tab>
              Items
            </v-tab>

            <v-tab-item>
              <AboutEditor :quest="quest" />
            </v-tab-item>
            <v-tab-item>
              <RegionEditor :region="region" :locations="locations" />
            </v-tab-item>
            <v-tab-item>
              <ObjectivesEditor />
            </v-tab-item>
            <v-tab-item>
              <LocationsEditor :entries="entries" />
            </v-tab-item>
            <v-tab-item>
              <EntriesEditor
                :locations="locations"
                :actions="actions"
                :requirements="objectives"
                :expiration="objectives"
              />
            </v-tab-item>
            <v-tab-item>
              <ItemsEditor :entries="entries" />
            </v-tab-item>
          </v-tabs>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AboutEditor from "@/components/AboutEditor.vue";
import RegionEditor from "@/components/RegionEditor.vue";
import ObjectivesEditor from "@/components/ObjectivesEditor.vue";
import LocationsEditor from "@/components/LocationsEditor.vue";
import EntriesEditor from "@/components/EntriesEditor.vue";
import ItemsEditor from "@/components/ItemsEditor.vue";

export default {
  name: "questEditor",
  layout: "fluid",
  middleware: "authenticated",
  components: {
    AboutEditor,
    RegionEditor,
    ObjectivesEditor,
    LocationsEditor,
    EntriesEditor,
    ItemsEditor
  },
  data() {
    return {
      quest: {
        title: "",
        description: "",
        image: "",
        categories: []
      },
      author: {
        authorId: this.$store.state.users[this.$store.state.authUser.uid]
          .authorId,
        isAnonyous: false
      },
      region: {
        name: "",
        coordinates: {
          lat: 39.828175,
          lng: -98.5795
        },
        zoom: 18,
        mapOptions: {}
      },
      objectives: [],
      locations: [],
      entries: [],
      actions: [],
      items: []
    };
  }
};
</script>
