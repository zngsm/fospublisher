<template>
  <div>
    <div v-for="(timelines, idx) in totalTimelines" :key="idx">
      <div v-if="idx == 0 && idx == Object.keys(totalTimelines).length - 1">
        <TimeNode :timelines="timelines" class="timeline" :idx="idx" />
        <div class="d-flex">
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
            src="@/assets/timeline/start_final.png"
            class="timeline-img-road-start-final"
          />
        </div>
      </div>
      <div v-else-if="idx == 0">
        <TimeNode :timelines="timelines" class="timeline" :idx="idx" />
        <div class="d-flex">
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
            src="@/assets/timeline/start_right.png"
            class="timeline-img-road-start"
          />
        </div>
      </div>
      <div v-else-if="idx % 2 && idx == Object.keys(totalTimelines).length - 1">
        <TimeNode
          :timelines="timelines"
          class="timeline timeline-reverse timeline-chapter timeline-final-right"
          :idx="idx"
        />
        <img
          src="@/assets/timeline/final_left.png"
          class="timeline-img-road-final-left"
        />
      </div>
      <div
        v-else-if="
          idx % 2 == 0 && idx == Object.keys(totalTimelines).length - 1
        "
      >
        <TimeNode
          :timelines="timelines"
          class="timeline timeline-chapter timeline-final-left"
          :idx="idx"
        />
        <img
          src="@/assets/timeline/final_right.png"
          class="timeline-img-road-final-right"
        />
      </div>
      <div v-else-if="idx % 2">
        <TimeNode
          :timelines="timelines"
          class="timeline timeline-reverse timeline-chapter"
          :idx="idx"
        />
        <img
          src="@/assets/timeline/right_left.png"
          class="timeline-img-road-right-left"
        />
      </div>
      <div v-else>
        <TimeNode
          :timelines="timelines"
          class="timeline timeline-chapter"
          :idx="idx"
        />
        <img
          src="@/assets/timeline/left_right.png"
          class="timeline-img-road-left-right"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TimeNode from "./TimeNode.vue";
export default {
  components: { TimeNode },
  name: "Timebody",
  props: {
    totalTimelines: Object,
    birth: String,
    name: String,
  },
  data() {
    return {
      year: null,
      month: null,
      monthSrc: null,
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
