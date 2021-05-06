<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">편집모드</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <div class="text-center d-flex pb-4">
            <v-btn @click="all">
              전체 펼치기
            </v-btn>
            <v-btn @click="none">
              접기
            </v-btn>
          </div>

          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel v-for="(year, i) in years" :key="i">
              <v-expansion-panel-header
                :class="{ 'v-panel-header': selectYear.includes(year) }"
                >{{ year }}</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-list flat>
                  <v-list-item-group>
                    <draggable :list="allData[year]" v-model="allData[year]">
                      <!-- <transition-group> -->
                      <div
                        class="v-list-item"
                        v-for="(data, idx) in allData[year]"
                        :key="idx"
                      >
                        <v-list-item-content
                          @mousedown="saveyear(year, data.title)"
                        >
                          <v-list-item-title
                            v-text="data.title"
                            :class="{
                              'v-list-item-selected': changedItems.includes(
                                data.title
                              ),
                            }"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </div>
                      <!-- </transition-group> -->
                    </draggable>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="changeEditMode">
          닫기
        </v-btn>
        <v-btn color="blue darken-1" text @click="changeList">
          수정하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { readTimlineEditMode } from "../../api/timeline.js";
import { updateTimeline } from "../../api/timeline.js";

import draggable from "vuedraggable";

export default {
  name: "TimeEditModal",
  components: {
    draggable,
  },
  data() {
    return {
      panel: [],
      years: [],
      originalData: {},
      allData: {},
      selectYear: [],
      changedItems: [],
      test: "hey!!",
      // drag
    };
  },
  mounted() {
    this.getTimelineEditList();
  },
  methods: {
    saveyear(y, title) {
      if (!this.selectYear.includes(y)) {
        this.selectYear.push(y);
      }
      this.changedItems.push(title);
    },
    changeList() {
      // console.log(this.allData);
      let context = {};
      for (let i of this.selectYear) {
        let selectedData = this.allData[i];
        for (let j in selectedData) {
          selectedData[j]["order"] = j;
        }
        context[i] = selectedData;
      }
      updateTimeline(context, this.$emit("getTimeline"), (err) => {
        console.log(err);
      });
      this.$store.commit("timeline/setEditMode", !this.edit);
    },
    changeEditMode() {
      this.$store.commit("timeline/setEditMode", !this.edit);
    },
    all() {
      this.panel = [...Array(this.years).keys()].map((k, i) => i);
    },
    // Reset the panel
    none() {
      this.panel = [];
    },
    getTimelineEditList() {
      readTimlineEditMode(
        (res) => {
          this.years = Object.keys(res.data);
          this.allData = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  computed: {
    ...mapState({
      edit: (state) => state.timeline.edit,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
