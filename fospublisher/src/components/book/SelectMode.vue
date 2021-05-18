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

    <button class="button-each" @click="exportWord">
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
  </div>
</template>

<script>
import InviteModal from "@/components/follow/InviteModal.vue";
import FollowListModal from "@/components/follow/FollowListModal.vue";

export default {
  data() {
    return {
      openInviteModal: false,
      openFollowListModal: false,
      word: "안녕하세요!!! 테스트입니다!!!",
    };
  },
  components: {
    InviteModal,
    FollowListModal,
    // Document,
    // Paragraph,
    // Packer,
    // TextRun,
    // saveAs,
    // BorderStyle,
    // WidthType,
  },
  methods: {
    goToCreate() {
      let status = this.$route.params.status;
      this.$router.push({ name: "CreatePast", params: { status: status } });
    },
    goToDesign() {
      let status = this.$route.params.status;
      let bookInfo = this.$route.params.bookInfo;
      this.$router.push({
        name: "Design",
        params: { bookInfo: bookInfo, status: status },
      });
    },
    exportWord() {
      this.word = `<html xmln:0='urn:schemas-microsoft-com:office:office xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>EXPORT HTML TO WORD</title></head><body>${this.word}</body></html>`;
      let source =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(this.word);
      let fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = "document.doc";
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
