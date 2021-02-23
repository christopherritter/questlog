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


            <v-tab-item value="quest">
              <QuestEditor
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="region">
              <RegionEditor
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="objectives">
              <ObjectivesEditor
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="locations">
              <LocationsEditor
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="entries">
              <EntriesEditor
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="items">
              <ItemsEditor
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
          </v-tabs>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      tab: "quest"
    };
  },
  methods: {
    changeTab(tab) {
      console.log(tab);
      this.tab = tab;
    },
  }
};
</script>
