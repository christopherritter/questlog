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
            <v-tab href="#quest">
              Quest
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
            <v-tab href="#actions">
              Actions
            </v-tab>


            <v-tab-item value="quest">
              <QuestEditor
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
                :actions="actions"
                :requirements="objectives"
                :expiration="objectives"
                :objectives="objectives"
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="items">
              <ItemsEditor
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
import QuestEditor from "@/components/editor/QuestEditor.vue";
import RegionEditor from "@/components/editor/RegionEditor.vue";
import ObjectivesEditor from "@/components/editor/ObjectivesEditor.vue";
import LocationsEditor from "@/components/editor/LocationsEditor.vue";
import EntriesEditor from "@/components/editor/EntriesEditor.vue";
import ActionsEditor from "@/components/editor/ActionsEditor.vue";
import ItemsEditor from "@/components/editor/ItemsEditor.vue";

export default {
  name: "questEditor",
  layout: "fluid",
  middleware: "authenticated",
  components: {
    QuestEditor,
    RegionEditor,
    ObjectivesEditor,
    LocationsEditor,
    EntriesEditor,
    ActionsEditor,
    ItemsEditor
  },
  data() {
    return {
      tab: "quest",
      author: {
        authorId: this.$store.state.users[this.$store.state.authUser.uid]
          .authorId,
        isAnonyous: false
      },
    };
  },
  computed: {
    ...mapState({
      categories: state => state.categories,
      quest: state => state.editor.quest,
      region: state => state.editor.region,
      location: state => state.editor.location,
      objectives: state => state.editor.objectives,
      locations: state => state.editor.locations,
      markers: state => state.editor.markers,
      actions: state => state.editor.actions,
      items: state => state.editor.items,
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
  }
};
</script>
