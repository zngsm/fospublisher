<template>
  <!-- 선택 버튼 -->
  <div class="button-container select-font">
    <button @click="goToCreate" class="button-each">
      <img
        class="iconImg"
        width="70px"
        src="@/assets/past/create.png"
        alt="쓰기 아이콘"
        style="width:52px vertical-align:bottom"
      /><span>쓰기</span>
    </button>
    <button @click="$emit('read')" class="button-each">
      <img
        class="iconImg"
        width="60px"
        src="@/assets/past/read.png"
        alt="읽기 아이콘"
      /><span>읽기</span>
    </button>
    <button @click="goToDesign" class="button-each">
      <img
        class="iconImg"
        width="60px"
        src="@/assets/past/design.png"
        alt="디자인 아이콘"
      /><span>디자인</span>
    </button>

    <button class="button-each" @click="openExportModal = true">
      <img
        class="iconImg"
        width="70px"
        src="@/assets/past/publish.png"
        alt="출품 아이콘"
      /><span>출품</span>
    </button>

    <button @click="openInviteModal = true" class="button-each">
      <img
        class="iconImg"
        width="70px"
        src="@/assets/past/invite.png"
        alt="유저검색 아이콘"
      /><span>유저검색</span>
    </button>

    <button @click="openFollowListModal = true" class="button-each">
      <img
        class="iconImg"
        width="100px"
        src="@/assets/past/userIndex.png"
        alt="유저목록 아이콘"
      /><span>유저목록</span>
    </button>

    <InviteModal
      v-if="openInviteModal == true"
      :openInviteModal="openInviteModal"
      @closeInviteModal="openInviteModal = false"
    />

    <FollowListModal
      v-if="openFollowListModal == true"
      :openFollowListModal="openFollowListModal"
      @closeFollowListModal="openFollowListModal = false"
    />

    <ConfirmModal
      v-if="openExportModal == true"
      :openExportModal="openExportModal"
      :headerTitle="'출품하기'"
      :concept="'export'"
      @closeModal="openExportModal = false"
      @exportWord="exportWord"
    />
  </div>
</template>

<script>
import InviteModal from "@/components/follow/InviteModal.vue";
import FollowListModal from "@/components/follow/FollowListModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  props: { cover: Object, book: Object },
  data() {
    return {
      openInviteModal: false,
      openFollowListModal: false,
      openExportModal: false,
      word: "",
      contents: "",
    };
  },
  components: {
    InviteModal,
    FollowListModal,
    ConfirmModal,
  },
  methods: {
    goToCreate() {
      let status = this.$route.params.status;
      this.$router.push({ name: "CreatePast", params: { status: status } });
    },
    goToDesign() {
      let status = this.$route.params.status;
      let cover = this.cover;
      this.$router.push({
        name: "Design",
        params: { cover: cover, status: status },
      });
    },
    exportWord() {
      this.openExportModal = false;
      this.contents = `<br><br><br><p style="font-size: 56px; text-align:center;">${this.book.cover.title}</p>`;
      this.contents += `<h2 style="text-align:center;page-break-before: always">목 차</h2> <br>`;
      for (let year in this.book.list) {
        for (let idx in this.book.list[year]) {
          if (idx == 0) {
            this.contents += `<h3>${year}`;
          }
          this.contents += `<h3 style="text-indent: 20px; word-break: break-all;">- ${this.book.list[year][idx]["title"]}</h3>`;
        }
      }
      for (let content of this.book.content) {
        this.contents += `<h2 style="text-align:center;page-break-before: always">${content.title}</h2> <br>`;
        this.contents += `<p style="text-align:right">${content.year}년</p> <br>`;
        this.contents += content.content;
        this.contents += "<br>";
      }
      this.word = `<html xmln:0='urn:schemas-microsoft-com:office:office xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>EXPORT HTML TO WORD</title></head><body>${this.contents}</body></html>`;
      let source =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(this.word);
      let fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = `${this.book.cover.title}.doc`;
      fileDownload.click();
      document.body.removeChild(fileDownload);
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/font.css";
/* @import "../../assets/css/ReadPast.css"; */
</style>
