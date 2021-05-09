<template>
  <div>
    <navbar />
    <!-- <v-img
      contain
      src="../../assets/light/center.png"
      alt="기본조명"
      height="100vh"
    /> -->
    <div class="pastBook">
      <PastBook />
    </div>
  </div>
</template>

<script>
import PastBook from "@/components/book/PastBook.vue";
import Navbar from "@/components/main/Navbar.vue";
import "@/assets/css/main.css";
import "@/assets/css/font.css";
// import { mapState } from "vuex";
export default {
  name: "Main",
  components: { PastBook, Navbar },
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

<style></style>
