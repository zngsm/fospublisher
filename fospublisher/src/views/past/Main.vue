<template>
  <div>
    <navbar />
    <div style="text-align: center;">
      <img
        height="900px"
        src="../../assets/light/center.png"
        alt="기본조명"
      />
      <div class="pastBook">
        <PastBook />
      </div>
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

<style>
.pastBook {
  position: absolute;
  top: 210px;
  left: 50%; 
  transform: translateX(-280px);
}
</style>
