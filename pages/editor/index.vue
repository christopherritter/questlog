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
    <v-row v-if="!loading">
      <v-col cols="12">
        <v-form>
          <v-tabs vertical v-model="tab">
            <v-tab href="#details">
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


            <v-tab-item value="details">
              <DetailsTab
                :quest="currentQuest"
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="region">
              <RegionTab
                :region="currentQuest.region"
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="objectives">
              <ObjectivesTab
                :objectives="currentQuest.objectives"
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="locations">
              <LocationsTab
                :region="currentQuest.region"
                :locations="currentQuest.locations"
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="entries">
              <EntriesTab
                :objectives="currentQuest.objectives"
                :locations="currentQuest.locations"
                @change-tab="changeTab($event)"
              />
            </v-tab-item>
            <v-tab-item value="items">
              <ItemsTab
                :objectives="currentQuest.objectives"
                :locations="currentQuest.locations"
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
import { mapState } from "vuex";
import DetailsTab from "@/components/editor/DetailsTab.vue";
import RegionTab from "@/components/editor/RegionTab.vue";
import ObjectivesTab from "@/components/editor/ObjectivesTab.vue";
import LocationsTab from "@/components/editor/LocationsTab.vue";
import EntriesTab from "@/components/editor/EntriesTab.vue";
import ItemsTab from "@/components/editor/ItemsTab.vue";

export default {
  name: "QuestEditor",
  layout: "fluid",
  middleware: "authenticated",
  data() {
    return {
      tab: "details",
      currentQuest: {},
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchQuest();
  },
  components: {
    DetailsTab,
    RegionTab,
    ObjectivesTab,
    LocationsTab,
    EntriesTab,
    ItemsTab
  },
  computed: {
    ...mapState({
      quest: state => state.editor.quest,
    })
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
    async fetchQuest() {
      this.error = null;
      this.loading = true;

      if (!this.quest) {
        this.loading = false;
        return;
      }

      if (this.quest.questId) {
        Object.assign(this.currentQuest, this.quest);
      }

      this.loading = false;
    }
  }
};
</script>
