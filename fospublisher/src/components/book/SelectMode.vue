<template>
  <!-- 선택 버튼 -->
  <div class="button-container writer-kwandong mt-10">
    <button @click="goToCreate" class="mt-10">
      <img
        class="iconImg"
        width="70px"
        src="@/assets/past/create.png"
        alt="쓰기 아이콘"
        style="width:52px vertical-align:bottom"
      /><span>쓰기</span>
    </button>
    <br />
    <button class="mt-10">
      <img
        class="iconImg"
        width="60px"
        src="@/assets/past/read.png"
        alt="읽기 아이콘"
      /><span>읽기</span>
    </button>
    <br />
    <button @click="$router.push('Design')" class="mt-10">
      <img
        class="iconImg"
        width="60px"
        src="@/assets/past/design.png"
        alt="디자인 아이콘"
      /><span>디자인</span>
    </button>
    <br />

    <button class="mt-10">
      <img
        class="iconImg"
        width="70px"
        src="@/assets/past/publish.png"
        alt="출품 아이콘"
      /><span>출품</span>
    </button>
    <br />

    <button class="mt-10" @click="openInviteModal = true">
      <img
        class="iconImg"
        width="70px"
        src="@/assets/past/invite.png"
        alt="유저검색 아이콘"
      /><span>유저검색</span>
    </button>
    <br />

    <button class="mt-10" @click="openFollowListModal = true">
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
      @closeInviteModal="openInviteModal = false" />

    <FollowListModal 
      v-if="openFollowListModal == true" 
      :openFollowListModal="openFollowListModal" 
      @closeFollowListModal="openFollowListModal = false" />
  </div>
</template>

<script>
import InviteModal from '@/components/follow/InviteModal.vue'
import FollowListModal from '@/components/follow/FollowListModal.vue'
export default {
  data() {
    return {
      openInviteModal: false,
      openFollowListModal: false
    }
  },
  components: {
    InviteModal,
    FollowListModal
  },
  methods: {
    goToCreate() {
      this.$router.push({ name: "CreatePast", params: { status: "PAST" } });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/font.css";
@import "../../assets/css/ReadPast.css";
</style>
