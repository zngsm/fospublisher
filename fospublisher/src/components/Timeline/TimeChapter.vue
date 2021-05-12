<template>
  <div>
    <div :class="{ 'timeline-title': !preview, 'd-none': preview }">
      <v-badge
        v-if="!timeline.check"
        bordered
        color="#030352"
        icon="mdi-pencil-outline"
      >
        <p class="timeline-text-hidden" @mouseover="openPreview">
          {{ timeline.title ? timeline.title : "제목없음" }}
        </p>
      </v-badge>
      <p v-else class="timeline-text-hidden" @mouseover="openPreview">
        {{ timeline.title ? timeline.title : "제목없음" }}
      </p>
    </div>
    <div
      :class="{ 'timeline-title-hover': preview, 'd-none': !preview }"
      @mouseleave="closePreview"
    >
      <div class="timeline-text-hidden text-h6 text-center">
        {{ timeline.title ? timeline.title : "제목없음" }}
      </div>
      <div
        class="timeline-preview-content timeline-text-hidden"
        v-html="timeline.content"
      >
        <!-- {{ timeline.content }} -->
      </div>
      <div class="timeline-preview-button">
        <v-btn @click="sendTimeline">전문읽기</v-btn>
        <v-btn v-if="!timeline.check" @click="goToEdit">수정</v-btn>
      </div>
    </div>
    <div class="timeline-title-bottom" @mouseover="closePreview"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Timechapter",
  data() {
    return {
      preview: false,
    };
  },
  props: { timeline: Object },
  mounted() {},
  methods: {
    goToEdit() {
      sessionStorage.setItem("title", this.timeline.title);
      sessionStorage.setItem("content", this.timeline.content);
      sessionStorage.setItem("year", this.timeline.year);
      sessionStorage.setItem("share", this.timeline.share);
      sessionStorage.setItem("question", this.timeline.question);
      this.$router.push({
        name: "CreatePast",
        params: { id: this.timeline.id, status: "PAST" },
      });
    },
    openPreview() {
      this.preview = true;
    },
    closePreview() {
      this.preview = false;
    },
    sendTimeline() {
      this.$router.push({
        name: "ReadPast",
        params: { id: this.timeline.id },
      });
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
