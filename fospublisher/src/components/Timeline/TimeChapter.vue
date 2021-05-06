<template>
  <div>
    <div :class="{ 'timeline-title': !preview, 'd-none': preview }">
      <p class="timeline-text-hidden" @mouseover="openPreview">
        {{ timeline.title }}
      </p>
    </div>
    <div
      :class="{ 'timeline-title-hover': preview, 'd-none': !preview }"
      @mouseleave="closePreview"
    >
      <div class="timeline-text-hidden text-h6 text-center">
        {{ timeline.title }}
      </div>
      <div class="timeline-preview-content timeline-text-hidden">
        {{ timeline.content }}
      </div>
      <div class="timeline-preview-button">
        <v-btn @click="sendTimeline">전문읽기</v-btn>
        <v-btn>수정</v-btn>
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
    openPreview() {
      this.preview = true;
    },
    closePreview() {
      this.preview = false;
    },
    sendTimeline() {
      this.$router.push({
        name: "ReadPast",
        params: { timeline: this.timeline },
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
