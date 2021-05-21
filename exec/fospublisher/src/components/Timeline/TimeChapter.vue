<template>
  <div>
    <div :class="{ 'timeline-title': !preview, 'd-none': preview }">
      <v-icon size="20" color="brown" v-if="timeline.check && timeline.share"
        >train</v-icon
      >
      <v-icon size="18" v-else-if="timeline.check && !timeline.share"
        >lock</v-icon
      >

      <div class="timeline-text-hidden" @mouseover="openPreview">
        {{ timeline.title ? timeline.title : "제목없음" }}
      </div>
    </div>
    <div
      :class="{ 'timeline-title-hover': preview, 'd-none': !preview }"
      @mouseleave="closePreview"
    >
      <div class="timeline-text-hidden text-center">
        {{ timeline.title ? timeline.title : "제목없음" }}
      </div>
      <div
        class="timeline-preview-content"
        v-if="timeline.state && timeline.state == 'deleted'"
      >
        {{ timeline.content }}
      </div>
      <div class="timeline-preview-content" v-else-if="!timeline.check">
        임시저장된 글입니다.<br /><br />
        글을 완성해볼까요?
      </div>
      <div class="timeline-preview-content" v-else-if="!timeline.share">
        <v-icon>lock</v-icon>
        나만 볼 수 있는 글 입니다
      </div>
      <div
        class="timeline-preview-content"
        v-else
        v-html="timeline.content"
      ></div>
      <div v-if="timeline.state && timeline.state == 'deleted'"></div>
      <div v-else-if="!timeline.check" class="timeline-preview-button">
        <v-btn @click="goToEdit">{{ btnModi }}</v-btn>
        <v-btn @click="goToDelete">{{ btnDel }}</v-btn>
      </div>
      <div v-else class="timeline-preview-button">
        <v-btn @click="goToEdit">{{ btnModi }}</v-btn>
        <v-btn @click="sendTimeline">{{ btnAllContent }}</v-btn>
      </div>
    </div>
    <div class="timeline-title-bottom" @mouseover="closePreview"></div>
  </div>
</template>

<script>
import { deletePastChapter } from "@/api/past.js";
import { mapState } from "vuex";
export default {
  name: "Timechapter",
  data() {
    return {
      delete: false,
      preview: false,
      btnModi: "수정",
      btnDel: "삭제",
      btnAllContent: "전문읽기",
      sentAutoSaved: "임시저장된 글입니다.<br /><br />글을 완성해볼까요?",
      sentNotShared:
        "나만 볼 수 있는 글입니다.<br /><br />공유를 원하신다면 전문읽기에서 수정창으로 들어가 <b>자서전에 담기</b>를 눌러주세요",
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
    goToDelete() {
      deletePastChapter(
        this.timeline.id,
        () => {
          alert("삭제되었습니다!");
          this.timeline.title = "삭제된 글입니다.";
          this.timeline.content = "삭제되었습니다.";
          this.timeline["state"] = "deleted";
        },
        (err) => {
          console.error(err);
        }
      );
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
        params: { id: this.timeline.id, status: "PAST" },
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
