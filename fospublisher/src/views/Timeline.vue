<template>
  <div ondragstart="return false" onselectstart="return false">
    <Navbar />
    <div class="timeline-container">
      <div class="timeline-header">
        <div class="timeline-header-title">
          일대기
        </div>
        <div class="timeline-header-content">
          ; 당신의 인생 여정을 한눈에 확인해보세요
        </div>
        <div class="timeline-header-option d-flex justify-content-between">
          <div class="timeline-header-btn d-flex align-center">
            <v-btn v-if="!edit" @click="changeEditMode">순서편집</v-btn>
            <v-btn v-else @click="changeEditMode">편집 중</v-btn>
          </div>
          <div class="timeline-header-toggle">
            <v-switch
              v-model="sliceContents"
              inset
              :label="sliceContents ? '부분' : '전체'"
            ></v-switch>
          </div>
        </div>
      </div>
      <TimeBody
        v-if="!sliceContents"
        :totalTimelines="totalTimelines"
        :birth="birth"
        :name="name"
        class="timeline-body"
      />
      <TimeBodySection
        v-else
        :totalTimelines="totalTimelines"
        :birth="birth"
        :name="name"
        class="timeline-body"
      />
      <v-row justify="center">
        <v-dialog :value="edit" width="600px">
          <TimeEditModal v-if="edit" @getTimeline="getTimeline" />
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
import TimeBody from "../components/Timeline/TimeBody.vue";
import { readTimeline } from "../api/timeline.js";
import "../assets/css/timeline.css";
import { mapState } from "vuex";
import TimeEditModal from "../components/Timeline/TimeEditModal.vue";
import TimeBodySection from "../components/Timeline/TimeBodySection.vue";
import Navbar from "@/components/main/Navbar.vue";

export default {
  name: "Timeline",
  components: { TimeBody, TimeEditModal, TimeBodySection, Navbar },
  data() {
    return {
      totalTimelines: null,
      birth: null,
      name: null,
      dialogue: false,
      sliceContents: false,
    };
  },
  created() {
    this.getTimeline();
  },
  mounted() {},
  methods: {
    getTimeline() {
      readTimeline(
        (res) => {
          this.totalTimelines = res.data.data;
          this.birth = res.data.birth;
          this.name = res.data.name;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    changeEditMode() {
      this.$store.commit("timeline/setEditMode", true);
    },
  },
  computed: {
    ...mapState({
      edit: (state) => state.timeline.edit,
    }),
  },
};
</script>

<style></style>
