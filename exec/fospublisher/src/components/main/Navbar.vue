<template>
  <div class="navbar">
    <div>
      <input type="checkbox" id="menuicon" />
      <label for="menuicon">
        <i
          v-if="!isQuestion"
          class="material-icons"
          style="color: var(--color-dark)"
          @click="onUnchecked"
          >expand_more
        </i>
        <i v-if="isQuestion" class="material-icons" @click="onChecked"
          >expand_less
        </i>
      </label>
      <div class="sidebar">
        <span>{{ todayQuestion }}</span>
      </div>
      <NavProfile />
      <div>
        <button class="navtab main-kukde-light" @click="goToMain">책장</button>
      </div>
      <div>
        <button class="navtab main-kukde-light" @click="goToTimeline">
          일대기
        </button>
      </div>
      <div>
        <button class="navtab main-kukde-light" @click="goToLibrary">
          보관함
        </button>
      </div>

      <div>
        <button class="navtab main-kukde-light" @click="openInviteModal = true">
          작가검색
        </button>
      </div>
      <div>
        <button
          class="navtab main-kukde-light"
          @click="openFollowListModal = true"
        >
          작가목록
        </button>
      </div>
    </div>

    <div>
      <button class="navtab-logo main-kukde-light" @click="moveToDownload">
        <img src="@/assets/logo.png" style="width: 70px;" />
      </button>
    </div>

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
import NavProfile from "./NavProfile.vue";
import { mapState } from "vuex";
export default {
  name: "Navbar",
  components: { InviteModal, FollowListModal, NavProfile },
  data() {
    return {
      openInviteModal: false,
      openFollowListModal: false,
      isQuestion: true,
    };
  },
  methods: {
    displayQuestion() {
      let question = document.getElementById("question");
      if (question.style.display == "none") {
        question.style.display = "";
      } else {
        question.style.display = "none";
      }
    },
    goToMain() {
      this.$router.push("/main").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    goToTimeline() {
      this.$router.push("/timeline").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    goToLibrary() {
      this.$router.push({ name: "Library", params: { id: 1 } }).catch((err) => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    onUnchecked() {
      this.isQuestion = true;
      this.$store.commit("setIsQuestion", true);
      this.$store.commit("setChecked", false);
    },
    onChecked() {
      this.isQuestion = false;
      this.$store.commit("setIsQuestion", false);
      this.$store.commit("setChecked", true);
    },
    moveToDownload() {
      this.$router.replace("/download");
    },
  },
  computed: {
    ...mapState({
      todayQuestion: (state) => state.question.todayQuestion,
      todayQuestionId: (state) => state.question.todayQuestionId,
    }),
  },
  mounted() {
    this.isQuestion = this.$store.state.isQuestion;
    document.getElementById("menuicon").checked = this.$store.state.checked;
  },
};
</script>

<style lang="css" scoped></style>
