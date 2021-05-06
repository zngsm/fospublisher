<template>
  <div>
    <v-img
      contain
      src="../../assets/light/center.png"
      alt="기본조명"
      height="100vh"
    />
    <div class="pastBook">
      <PastBook />
    </div>
  </div>
</template>

<script>
import PastBook from "@/components/book/PastBook.vue";
// import { mapState } from "vuex";
export default {
  name: "Main",
  components: { PastBook },
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

<style scoped>
.pastBook {
  position: absolute;
  top: 27%;
  left: 32%;
}
</style>
