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
            <v-tab href="#actions">
              Actions
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
                @change-tab="changeTab($event)"
                @update-region="updateRegion($event)"
                @mark-location="updateRegion($event)"
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
                :region="region"
                :location="location"
                :locations="locations"
                :entries="entries"
                :markers="markers"
                @change-tab="changeTab($event)"
                @select-location="selectLocation($event)"
                @mark-location="addLocation($event)"
                @update-location="updateLocation($event)"
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
            <v-tab-item value="actions">
              <ActionsEditor
                :actions="actions"
                @change-tab="changeTab($event)"
                @add-action="addAction($event)"
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
import ActionsEditor from "@/components/ActionsEditor.vue";
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
    ActionsEditor,
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
        draggable: true,
        mapOptions: {}
      },
      location: {
        name: "",
        isLandmark: true,
        coordinates: {
          lat: null,
          lng: null
        },
        zoom: 18,
        image: "",
        isLandmark: false,
        mapOptions: {},
        draggable: true
      },
      objectives: [],
      locations: [],
      markers: [],
      entries: [],
      actions: [],
      items: []
    };
  },
  computed: {
    ...mapState({
      categories: state => state.categories
    }),
  },
  methods: {
    changeTab(tab) {
      console.log(tab);
      this.tab = tab;
    },
    updateRegion(region) {
      this.region.coordinates = region;
    },
    addObjective(objective) {
      this.objectives.push(objective);
    },
    addLocation(location) {
      var newLocation = {
        name: this.location.name || "Untitled",
        isLandmark: this.location.isLandmark,
        coordinates: location,
        zoom: this.location.zoom,
        image: this.location.image,
        isLandmark: this.location.isLandmark,
        mapOptions: this.location.mapOptions,
        draggable: true
      }
      this.locations.push(newLocation);
    },
    selectLocation(location) {
      var position = location.target.getLatLng();
      for (let l = 0; l < this.locations.length; l++) {
        var currentPosition = this.locations[l].coordinates;
        if (
          position.lat === currentPosition.lat &&
          position.lng === currentPosition.lng
        ) {
          this.location = this.locations[l];
        }
      }
    },
    updateLocation(location) {
      var position = location.oldMarker.coordinates;
      for (let l = 0; l < this.locations.length; l++) {
        var currentPosition = this.locations[l].coordinates;
        if (
          position.lat === currentPosition.lat &&
          position.lng === currentPosition.lng
        ) {
          var newPosition = location.newMarker.getLatLng();
          this.locations[l].coordinates = newPosition;
        }
      }
    },
    addEntry(entry) {
      this.entries.push(entry);
    },
    addAction(action) {
      this.actions.push(action);
    },
    addItem(item) {
      this.items.push(item);
    }
  }
};
</script>
