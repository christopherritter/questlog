<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="pt-6 pb-2">Quest Editor</h1>
        <span v-if="$vuetify.breakpoint.mdAndUp">
          <p v-if="questSaved">
            Build your own quest using the sections below. Once you're finished
            you can publish it to share with other adventurers.
          </p>
          <p v-else>
            Fill out the form below then click on the create button to start
            building your quest.
          </p>
        </span>
        <span v-else>
          <v-select
            v-model="tab"
            :items="tabs"
            label="View"
            solo
            hide-details
          ></v-select>
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form>
          <v-tabs vertical v-model="tab">
            <v-tab href="#details" v-show="questSaved && $vuetify.breakpoint.mdAndUp">
              Quest
            </v-tab>
            <v-tab href="#region" v-show="questSaved && $vuetify.breakpoint.mdAndUp">
              Region
            </v-tab>
            <v-tab href="#objectives" v-show="questSaved && $vuetify.breakpoint.mdAndUp">
              Objectives
            </v-tab>
            <v-tab href="#locations" v-show="questSaved && $vuetify.breakpoint.mdAndUp">
              Locations
            </v-tab>
            <v-tab href="#entries" v-show="questSaved && $vuetify.breakpoint.mdAndUp">
              Entries
            </v-tab>
            <v-tab href="#items" v-show="questSaved && $vuetify.breakpoint.mdAndUp">
              Items
            </v-tab>

            <v-tab-item value="details" touchless>
              <DetailsTab
                :quest="quest"
                :locations="locations"
                @change-tab="changeTab($event)"
                @delete-quest="dialogDelete = true"
              />
            </v-tab-item>
            <v-tab-item value="region" touchless>
              <RegionTab
                :region="quest.region"
                :tab="tab"
                @change-tab="changeTab($event)"
                @delete-quest="dialogDelete = true"
              />
            </v-tab-item>
            <v-tab-item value="objectives" touchless>
              <ObjectivesTab
                :objectives="objectives"
                @change-tab="changeTab($event)"
                @delete-quest="dialogDelete = true"
              />
            </v-tab-item>
            <v-tab-item value="locations" touchless>
              <LocationsTab
                :region="quest.region"
                :locations="locations"
                @change-tab="changeTab($event)"
                @delete-quest="dialogDelete = true"
              />
            </v-tab-item>
            <v-tab-item value="entries" touchless>
              <EntriesTab
                :objectives="objectives"
                :locations="locations"
                :entries="entries"
                :items="items"
                @change-tab="changeTab($event)"
                @delete-quest="dialogDelete = true"
              />
            </v-tab-item>
            <v-tab-item value="items" touchless>
              <ItemsTab
                :objectives="objectives"
                :locations="locations"
                :items="items"
                @change-tab="changeTab($event)"
                @delete-quest="dialogDelete = true"
              />
            </v-tab-item>
          </v-tabs>
          <v-dialog v-model="dialogDelete" max-width="375px" class="z-index:50">
            <v-card light>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteQuest()"
                  >OK</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
      updatedQuest: false,
      dialogDelete: false,
      tabs: [
        {
          text: "Show Details",
          value: "details",
        },
        {
          text: "Show Region",
          value: "region",
        },
        {
          text: "Show Objectives",
          value: "objectives",
        },
        {
          text: "Show Locations",
          value: "locations",
        },
        {
          text: "Show Entries",
          value: "entries",
        },
        {
          text: "Show Items",
          value: "items",
        },
      ],
    };
  },
  components: {
    DetailsTab,
    RegionTab,
    ObjectivesTab,
    LocationsTab,
    EntriesTab,
    ItemsTab
  },
  watch: {
    selectedTab(val) {
      this.tab = val.value
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      quest: state => state.quest,
      objectives: state => state.objectives,
      locations: state => state.locations,
      entries: state => state.entries,
      items: state => state.items
    }),
    questSaved() {
      if (this.quest.questId) return true;
      return false;
    },
  },
  methods: {
    ...mapMutations([
      "CLEAR_QUEST"
    ]),
    changeTab(tab) {
      this.tab = tab;
    },
    async deleteQuest() {
      const questId = this.quest.questId;
      const res = await this.$fire.firestore.collection('quests').doc(questId).delete();
      this.$store.commit("CLEAR_QUEST");
      this.dialogDelete = false;
    }
  }
};
</script>
