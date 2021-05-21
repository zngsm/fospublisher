<template>
  <div>
    <div v-if="isNew" class="main-future-new">
      <img
        @click="openSelectModal"
        class="main-future-send-new"
        src="https://img.icons8.com/ios-filled/150/ffffff/secured-letter--v1.png"
      />
      <div class="white--text">
        과거로부터 {{ year }}년 {{ month }}월 {{ day }}일의 기록이 도착했습니다.
      </div>
      <div class="d-flex justify-between">
        <v-btn @click="closeTodayModal">닫기</v-btn>
      </div>
    </div>
    <SelectModal
      v-if="openTodayModal == true"
      :openTodayModal="openTodayModal"
      @closeModal="openTodayModal = false"
      @goToTodayFuture="goToTodayFuture"
    />
    <Navbar />
    <div class="main-container">
      <img
        class="main-img"
        src="../../assets/light/center3.png"
        alt="기본조명"
      />
      <div class="main-pastBook-container">
        <PastBook />
      </div>
      <div class="main-futureBook-container">
        <v-badge v-if="count" overlap large :content="count">
          <FutureBook />
        </v-badge>
        <FutureBook v-else />
      </div>
    </div>
  </div>
</template>

<script>
import PastBook from "@/components/book/PastBook.vue";
import FutureBook from "@/components/book/FutureBook.vue";
import Navbar from "@/components/main/Navbar.vue";
import "@/assets/css/main.css";
import "@/assets/css/font.css";
import { checkFuture } from "@/api/future.js";
import store from "@/store";
import SelectModal from "../../components/SelectModal.vue";
import { mapState } from "vuex";
export default {
  name: "Main",
  components: { PastBook, FutureBook, Navbar, SelectModal },
  data: () => {
    return {
      count: null,
      futureData: false,
      today: null,
      year: null,
      month: null,
      day: null,
      openTodayModal: false,
    };
  },
  methods: {
    goToTodayFuture(id) {
      this.$router.push({
        name: "ReadPast",
        params: { id: id, status: "FUTURE" },
      });
    },
    openSelectModal() {
      store.commit("book/checkNew", false);
      this.openTodayModal = true;
    },
    closeTodayModal() {
      store.commit("book/checkNew", false);
    },
    setFuture() {
      this.today = new Date();
      this.year = this.today.getFullYear();
      this.month = this.today.getMonth() + 1;
      this.day = this.today.getDate();
      let dateData = {
        year: this.year,
        month: this.month,
        day: this.day,
      };
      let date = `${this.year}-${
        String(this.month).length < 2 ? "0" + this.month : this.month
      }-${String(this.day).length < 2 ? "0" + this.day : this.day}`;
      checkFuture(
        dateData,
        (res) => {
          this.count = res.data.count;
          if (this.checkDay == date) {
            this.futureData = false;
          } else {
            store.commit("book/saveDay", date);
            if (this.count > 0) {
              this.futureData = true;
              store.commit("book/checkNew", true);
              store.commit("book/todayData", res.data.data);
            } else {
              this.futureData = false;
              store.commit("book/checkNew", false);
              store.commit("book/todayData", null);
            }
          }
        },
        (err) => {
          console.error(err);
        }
      );
    },
  },
  computed: {
    ...mapState({
      todayData: (state) => state.book.todayData,
      isNew: (state) => state.book.isNew,
      checkDay: (state) => state.book.checkDay,
    }),
  },
  // computed: {
  //   ...mapState("error", {
  //     validationErrors: (state) => state.validations,
  //   }),
  // },
  mounted() {},
  created() {
    this.setFuture();
  },
};
</script>

<style>
/* .pastBook {
  position: absolute;
  top: 210px;
  left: 50%;
  transform: translateX(-280px);
} */
.main-future-new {
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main-future-new > div {
  margin: 20px 0px;
}
.main-future-send-new {
  cursor: pointer;
}
</style>
