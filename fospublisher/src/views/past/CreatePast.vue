<template>
  <div class="create-container">
    <div class="create-left">
      <h1 class="create-left-question-title text-center kukde-bold">
        오늘의 질문
      </h1>
      <div class="create-left-question-content kekde-light">{{ question }}</div>
      <button
        class="create-left-question-button kekde-light"
        @click="getTodayQuestion"
      >
        다른 질문 받기
      </button>
    </div>
    <div class="create-right">
      <form @submit="onSubmit" class="create-right-form">
        <v-text-field v-model="form.title" label="제목" required></v-text-field>
        <div class="d-flex create-right-year">
          <div class="create-right-year-label">
            언제 있었던 일인가요?
          </div>
          <div class="create-right-select-year">
            <v-select
              v-model="form.year"
              :items="items"
              label="년도"
              dense
            ></v-select>
          </div>
        </div>
        <div class="create-editor">
          <Editor :content="content" />
        </div>
        <div>
          {{ content }}
        </div>
      </form>
      <div class="create-right-btn">
        <v-btn large>취소</v-btn>
        <v-btn large @click="onSubmit">발행</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuestion, createPastChapter } from "@/api/past.js";
import Editor from "@fospublisher/vue-text-editor";
export default {
  name: "PastCreate",
  components: {
    Editor,
  },
  props: {
    bookInfo: {
      type: Object,
    },
    New: {
      type: Boolean,
    },
  },
  data() {
    return {
      id: null,
      questionId: null,
      question: "?",
      content: null,
      form: {
        title: "",
        content: "",
        year: null,
        check: false,
      },
      interval: false,
      items: [],
    };
  },
  methods: {
    readContent() {
      console.log(
        window.richTextField.document.getElementsByTagName("body")[0].outerHTML
      );
    },
    getTodayQuestion() {
      if (localStorage.getItem("question_num")) {
        this.questionId = localStorage.getItem("question_num");
      } else {
        this.questionId = 1;
      }
      getQuestion(
        this.questionId,
        (res) => {
          this.questionId = res.data.id;
          localStorage.setItem("question_num", this.questionId);
          this.question = res.data.question;
        },
        (err) => console.error(err)
      );
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.form.check = true;
      this.interval = false;
      clearInterval(this.interval);
      // 에디터 연결 시, 에디터의 내용 jquery로 잡아서 content로 보내주기
      this.form.content = window.richTextField.document.getElementsByTagName(
        "body"
      )[0].outerHTML;
      createPastChapter(
        this.form,
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    },
    // 5초마다 임시저장
    tempStore() {
      if (this.form.title == "" && this.form.content == "") {
        setTimeout(() => {
          this.tempStore();
        }, 5000);
      } else {
        this.interval = true;
        setInterval(() => {
          if (this.interval) {
            createPastChapter(
              this.form,
              (res) => {
                console.log(res);
              },
              (err) => {
                console.error(err);
              }
            );
          } else {
            clearInterval(this.interval);
          }
        }, 5000);
      }
    },
    calculateYear() {
      let today = new Date();
      let year = today.getFullYear();
      for (let a = 0; a <= 100; a++) {
        this.items.push(year - a);
      }
    },
  },
  mounted() {
    // document.getElementsByClassName("editorWidth")[0].style.width = "80px";
    this.getTodayQuestion();
    this.calculateYear();
    // this.tempStore();
  },
  beforeRouteLeave(to, from, next) {
    if (window.confirm("정말로 떠나시겠습니까?")) {
      next();
    }
  },
};
</script>

<style scoped>
@import "../../assets/css/CreatePast.css";
</style>
