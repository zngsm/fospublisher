<template>
  <div class="card">
    <div class="card-body">
      <div class="form-group">
        <label for="title">제목</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="form.title"
        />
        <!-- <div
          v-if="validationErrors.title !== undefined"
          class="alert alert-danger"
        >
          {{ validationErrors.title }}
        </div> -->
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          class="form-control"
          id="content"
          rows="10"
          v-model="form.content"
        />
        <!-- <div
          v-if="validationErrors.content !== undefined"
          class="alert alert-danger"
        >
          {{ validationErrors.content }}
        </div> -->
      </div>
    </div>
    <div class="card-footer text-right">
      <button type="button" class="btn btn-dark" @click="login">
        로그인 버튼
      </button>
      <button type="button" class="btn btn-dark" @click="write">
        글작성 버튼
      </button>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/account";
import { pastWrite } from "@/api/past";
// import { mapState } from "vuex";
export default {
  name: "Main",
  data: function() {
    return {
      form: {
        username: "suemin22",
        password: "q1w2e3r4^^",
      },
      article: {
        title: "string",
        content: "string",
        year: 0,
        check: true,
      },
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
          console.log(res),
            localStorage.setItem("token", res.data.token),
            (err) => {
              console.error(err);
            };
        }
        // if (error.response.status === 422) {
        //   this.validationErrors = error.response.data.data;
        // }
      );
    },
    write() {
      pastWrite(this.article, (res) => {
        console.log(res), (err) => console.error(err);
      });
    },
  },
};
</script>

<style></style>
