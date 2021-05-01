<template>
  <div>
    <v-img
      contain
      src="../../assets/light/center.png"
      alt="기본조명"
      height="100vh"
    />
    <div>
      <div>{{ testContent }}</div>
      <button type="button" @click="login">
        로그인 버튼
      </button>
      <button type="button" @click="write">
        글작성 버튼
      </button>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/account";
import { createPastChapter, readPastChapter } from "@/api/past";
// import { mapState } from "vuex";
export default {
  name: "Main",
  data: () => {
    return {
      form: {
        username: "suemin22",
        password: "q1w2e3r4^^",
      },
      article: {
        title: "43번째제목",
        content: "test용내용",
        year: 0,
        check: true,
      },
      testContent: "",
    };
  },

  // computed: {
  //   ...mapState("error", {
  //     validationErrors: (state) => state.validations,
  //   }),
  // },
  methods: {
    login() {
      userLogin(
        this.form,
        (res) => {
          console.log(res), localStorage.setItem("token", res.data.token);
        },
        (err) => {
          console.error(err);
        }
      );
      // if (error.response.status === 422) {
      //   this.validationErrors = error.response.data.data;
      // }
    },
    write() {
      createPastChapter(this.article, (res) => {
        console.log(res), (err) => console.error(err);
      });
    },
  },
  mounted() {
    readPastChapter(
      44,
      (res) => {
        console.log(res);
        this.testContent = res.data;
      },
      (err) => console.error(err)
    );
  },
};
</script>

<style></style>
