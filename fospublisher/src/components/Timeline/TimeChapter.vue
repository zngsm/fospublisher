<template>
  <div>
    <div :class="{ 'timeline-title': !preview, 'd-none': preview }">
      <v-icon size="20" color="brown" v-if="timeline.check && timeline.share"
        >train</v-icon
      >
      <v-icon size="18" v-else-if="timeline.check && !timeline.share"
        >lock</v-icon
      >

      <v-badge
        v-if="!timeline.check"
        bordered
        Dot
        color="rgba(0,0,0,0.3)"
        icon="mdi-pencil-outline"
        title="작성중입니다."
      >
        <div class="timeline-text-hidden" @mouseover="openPreview">
          {{ timeline.title ? timeline.title : "제목없음" }}
        </div>
      </v-badge>
      <div v-else class="timeline-text-hidden" @mouseover="openPreview">
        {{ timeline.title ? timeline.title : "제목없음" }}
      </div>
      <!-- <div class="timeline-text-hidden" @mouseover="openPreview">
        {{ timeline.title ? timeline.title : "제목없음" }}
      </div> -->
    </div>
    <div
      :class="{ 'timeline-title-hover': preview, 'd-none': !preview }"
      @mouseleave="closePreview"
    >
      <div class="timeline-text-hidden text-center">
        {{ timeline.title ? timeline.title : "제목없음" }}
      </div>
      <div class="timeline-preview-content" v-if="!timeline.check">
        임시저장된 글입니다.<br /><br />
        글을 완성해볼까요?
      </div>
      <div class="timeline-preview-content" v-else-if="!timeline.share">
        <v-icon>lock</v-icon>
        나만 볼 수 있는 글입니다.<br /><br />
        공유를 원하신다면 전문읽기에서 수정창으로 들어가 <b>자서전에 담기</b>를
        눌러주세요
      </div>
      <div
        class="timeline-preview-content"
        v-else
        v-html="timeline.content"
      ></div>
      <div class="timeline-preview-button">
        <v-btn v-if="!timeline.check" @click="goToEdit">수정</v-btn>
        <v-btn v-else @click="sendTimeline">전문읽기</v-btn>
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
