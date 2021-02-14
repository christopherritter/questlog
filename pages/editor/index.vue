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
          <v-tabs vertical v-model="tab">
            <v-tab href="#about">
              About
            </v-tab>
            <v-tab href="#region">
              Region
            </v-tab>
            <v-tab href="#objectives">
              Objectives
            </v-tab>
            <v-tab href="#locations">
              Locations
            </v-tab>
            <v-tab href="#entries">
              Entries
            </v-tab>
            <v-tab href="#items">
              Items
            </v-tab>

            <v-tab-item value="about">
              <AboutEditor
                :quest="quest"
                :categories="categories"
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="region">
              <RegionEditor
                :region="region"
                :locations="locations"
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="objectives">
              <ObjectivesEditor
                :objectives="objectives"
                @change-tab="changeTab($event)"
                @add-objective="addObjective($event)"
              />
            </v-tab-item>
            <v-tab-item value="locations">
              <LocationsEditor
                :locations="locations"
                :entries="entries"
                @change-tab="changeTab($event)"
                @add-location="addLocation($event)"
              />
            </v-tab-item>
            <v-tab-item value="entries">
              <EntriesEditor
                :locations="locations"
                :entries="entries"
                :actions="actions"
                :requirements="objectives"
                :expiration="objectives"
                :objectives="objectives"
                @change-tab="changeTab($event)"
                @add-entry="addEntry($event)"
              />
            </v-tab-item>
            <v-tab-item value="items">
              <ItemsEditor
                :entries="entries"
                :items="items"
                @change-tab="changeTab($event)"
                @add-item="addItem($event)"
              />
            </v-tab-item>
          </v-tabs>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
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
      tab: "about",
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
  },
  computed: {
    ...mapState({
      categories: state => state.categories
    })
  },
  methods: {
    changeTab(tab) {
      console.log(tab);
      this.tab = tab;
    },
    addObjective(objective){
      this.objectives.push(objective);
    },
    addLocation(location){
      this.locations.push(location);
    },
    addEntry(entry){
      this.entry.push(entry);
    },
    addItem(item){
      this.location.push(item);
    },
  }
};
</script>
