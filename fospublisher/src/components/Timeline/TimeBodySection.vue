<template>
  <div v-if="totalTimelines" :class="{ prev: start, next: end }">
    <div v-if="totalTimelines[page] && page % 3 == 0">
      <div class="d-flex" v-if="page == 0">
        <TimeNode
          :timelines="totalTimelines[page]"
          class="timeline"
          :idx="String(page)"
        />
        <div class="timeline-img-start">
          <div>
            <h3 style="margin: 5px;">Train Ticket</h3>
            <v-row style="margin: -1px;">
              <v-col style="padding: 0;">
                <h4 style="margin: 10px;">{{ name }}</h4>
              </v-col>
              <div
                style="width: 0.1px; border: 1px solid brown; height: 50px;"
              ></div>
              <v-col style="margin-top: 5px; padding: 0;">
                <h5>발행일</h5>
                <h5>
                  {{
                    birth.split("-")[0] +
                      "-" +
                      birth.split("-")[1] +
                      "-" +
                      birth.split("-")[2].split(" ")[0]
                  }}
                </h5>
              </v-col>
            </v-row>
          </div>
        </div>
        <img
          v-if="page == Object.keys(totalTimelines).length - 1"
          src="@/assets/timeline/start_final.png"
          class="timeline-img-road-start-final"
        />
        <img
          v-else
          src="@/assets/timeline/start_right.png"
          class="timeline-img-road-start"
        />
      </div>
      <div
        v-else-if="page == Object.keys(totalTimelines).length - 1"
        class="timeline-img-start-ing"
      >
        <TimeNode
          :timelines="totalTimelines[page]"
          class="timeline timeline-chapter"
          :idx="String(page)"
        />
        <img
          @click="prevPage"
          src="@/assets/timeline/tunnel_cut.png"
          class="timeline-img-tunnel timeline-img-tunnel-prev-position"
        />
        <span @click="prevPage" class="timeline-img-tunnel-prev">
          <img
            src="https://img.icons8.com/metro/40/ffffff/long-arrow-left.png"
          />
        </span>
        <img
          src="@/assets/timeline/final_right.png"
          class="timeline-img-road-left-right"
        />
      </div>
      <div v-else class="timeline-img-start-ing">
        <TimeNode
          :timelines="totalTimelines[page]"
          class="timeline timeline-chapter"
          :idx="String(page)"
        />
        <img
          @click="prevPage"
          src="@/assets/timeline/tunnel_cut.png"
          class="timeline-img-tunnel timeline-img-tunnel-prev-position"
        />
        <span @click="prevPage" class="timeline-img-tunnel-prev">
          <img
            src="https://img.icons8.com/metro/40/ffffff/long-arrow-left.png"
          />
        </span>
        <img
          src="@/assets/timeline/left_right.png"
          class="timeline-img-road-left-right"
        />
      </div>
    </div>
    <div v-if="totalTimelines[page + 1] && (page + 1) % 3 == 1">
      <div v-if="page + 1 == Object.keys(totalTimelines).length - 1">
        <TimeNode
          :timelines="totalTimelines[page + 1]"
          class="timeline timeline-reverse timeline-chapter"
          :class="{
            ' timeline-final-right': totalTimelines[page + 1].length < 3,
          }"
          :idx="String(page + 1)"
        />
        <img
          src="@/assets/timeline/final_left.png"
          class="timeline-img-road-final-left"
        />
      </div>
      <div v-else>
        <TimeNode
          :timelines="totalTimelines[page + 1]"
          class="timeline timeline-reverse timeline-chapter"
          :idx="String(page + 1)"
        />
        <img
          src="@/assets/timeline/right_left.png"
          class="timeline-img-road-right-left"
        />
      </div>
    </div>
    <div v-if="totalTimelines[page + 2] && (page + 2) % 3 == 2">
      <div v-if="page + 2 == Object.keys(totalTimelines).length - 1">
        <TimeNode
          :timelines="totalTimelines[page + 2]"
          class="timeline timeline-chapter"
          :class="{
            'timeline-final-left': totalTimelines[page + 2].length < 3,
          }"
          :idx="String(page + 2)"
        />
        <img
          src="@/assets/timeline/final_right.png"
          class="timeline-img-road-final-right"
        />
      </div>
      <div v-else>
        <TimeNode
          :timelines="totalTimelines[page + 2]"
          class="timeline timeline-chapter"
          :idx="String(page + 2)"
        />
        <img
          src="@/assets/timeline/left_right.png"
          class="timeline-img-road-left-right"
        />
        <img
          @click="nextPage"
          src="@/assets/timeline/tunnel_short.png"
          class="timeline-img-tunnel timeline-img-tunnel-next-position"
        />
        <span @click="nextPage" class="timeline-img-tunnel-next">
          <img
            src="https://img.icons8.com/metro/40/ffffff/long-arrow-right.png"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import TimeNode from "./TimeNode.vue";
export default {
  name: "Timebodysection",
  components: { TimeNode },
  props: {
    totalTimelines: Object,
    birth: String,
    name: String,
    selectedTimelines: {},
  },
  data() {
    return {
      page: 0,
      start: false,
      end: false,
      year: null,
      month: null,
      monthSrc: null,
    };
  },
  created() {},
  methods: {
    prevPage() {
      this.page = this.page -= 3;
    },
    nextPage() {
      if (this.page + 1 <= Object.keys(this.totalTimelines).length - 1) {
        this.page = this.page + 3;
      }
    },
  },
};
</script>

<style></style>
