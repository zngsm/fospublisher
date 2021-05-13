<template>
  <div>
    <navbar />
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
        <FutureBook />
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
// import { mapState } from "vuex";
export default {
  name: "Main",
  components: { PastBook, FutureBook, Navbar },
  data: () => {
    return {};
  },

  // computed: {
  //   ...mapState("error", {
  //     validationErrors: (state) => state.validations,
  //   }),
  // },
  methods: {},
  mounted() {},
};
</script>

<style>
.pastBook {
  position: absolute;
  top: 210px;
  left: 50%;
  transform: translateX(-280px);
}
</style>
