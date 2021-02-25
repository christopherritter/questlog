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
              <QuestTab
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="region">
              <RegionTab
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="objectives">
              <ObjectivesTab
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="locations">
              <LocationsTab
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="entries">
              <EntriesTab
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="items">
              <ItemsTab
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
import QuestTab from "@/components/editor/QuestTab.vue";
import RegionTab from "@/components/editor/RegionTab.vue";
import ObjectivesTab from "@/components/editor/ObjectivesTab.vue";
import LocationsTab from "@/components/editor/LocationsTab.vue";
import EntriesTab from "@/components/editor/EntriesTab.vue";
import ItemsTab from "@/components/editor/ItemsTab.vue";

export default {
  name: "questEditor",
  layout: "fluid",
  middleware: "authenticated",
  components: {
    QuestTab,
    RegionTab,
    ObjectivesTab,
    LocationsTab,
    EntriesTab,
    ItemsTab
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
