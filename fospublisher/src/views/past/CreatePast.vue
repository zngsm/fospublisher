<template>
  <div class="create-container">
    <Navbar />
    <div class="create-left">
      <h1 class="create-left-question-title text-center kukde-bold">
        오늘의 질문
      </h1>
      <div class="create-left-question-content kekde-light">
        {{ todayQuestion }}
      </div>
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
          <div class="create-right-select-year d-flex align-center">
            <div v-if="selected" class="text-h5">{{ form.year }}년</div>
            <v-select
              v-else
              v-model="form.year"
              :items="items"
              label="년도"
              dense
            ></v-select>
          </div>
          <v-btn @click="changeSelect">
            <span v-if="!selected">선택</span> <span v-else>변경</span>
          </v-btn>
        </div>
        <div v-if="updateTime">
          {{ updateTime.split("T")[1].split(".")[0] }} 자동저장되었습니다.
        </div>
        <div class="create-editor">
          <Editor
            @updateContent="(val) => (form.content = val)"
            :style-object="styleObject"
          />
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
import {
  getQuestion,
  createPastChapter,
  readPastChapter,
  updatePastChapter,
} from "@/api/past.js";
import Navbar from "../../components/main/Navbar.vue";
import { mapState } from "vuex";
import store from "@/store";
import Editor from "fospublisher-vue-text-editor";
export default {
  name: "CreatePast",
  components: {
    Editor,
    Navbar,
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
      styleObject: {
        editorWidth: { width: "100%" },
      },
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
      chapId: null,
      selected: false,
      edit: false,
      auto: null,
      timer: null,
      updateTime: null,
    };
  },
  methods: {
    getData() {
      if (this.$route.params.id) {
        this.chapId = this.$route.params.id;
        readPastChapter(
          this.chapId,
          (res) => {
            this.form.title = res.data.title;
            this.form.content = res.data.content;
            this.form.year = res.data.year;
            this.selected = true;
            this.edit = true;
          },
          (err) => {
            console.err(err);
          }
        );
      }
    },
    getTodayQuestion() {
      getQuestion(
        this.todayQuestionId,
        (res) => {
          store.commit("question/setQuestion", res.data.question);
          store.commit("question/setQuestionId", res.data.id);
        },
        (err) => console.error(err)
      );
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.form.content = window.richTextField.document.getElementsByTagName(
        "body"
      )[0].outerHTML;
      if (!this.form.year) {
        alert("연도를 입력해주세요!");
        return;
      } else if (!this.form.title) {
        alert("제목을 입력해주세요!");
        return;
      } else if (!this.form.content) {
        alert("내용을 입력해주세요!");
        return;
      }
      this.form.check = true;
      this.interval = false;
      clearInterval(this.timer);
      if (!this.edit) {
        createPastChapter(
          this.form,
          (res) => {
            console.log(res.data.id);
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        updatePastChapter(
          this.chapId,
          this.form,
          (res) => {
            console.log(res.data.id);
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
    autoCompleted() {
      this.timer = setInterval(() => {
        // if (!window.richTextField.document) {
        //   clearInterval(this.timer);
        // }
        // this.form.content = window.richTextField.document.getElementsByTagName(
        //   "body"
        // )[0].outerHTML;
        this.form.check = false;
        if (this.interval) {
          if (!this.chapId) {
            console.log(this.form);
            createPastChapter(
              this.form,
              (res) => {
                this.chapId = res.data.id;
                this.updateTime = res.data.update;
              },
              (err) => {
                console.error(err);
              }
            );
          } else {
            updatePastChapter(
              this.chapId,
              this.form,
              (res) => {
                this.updateTime = res.data.update;
              },
              (err) => {
                console.error(err);
              }
            );
          }
        } else {
          clearInterval(this.timer);
        }
      }, 30000);
    },
    // 5초마다 임시저장
    tempStore() {
      if (this.form.title == "" && this.form.content == "") {
        setTimeout(() => {
          this.tempStore();
        }, 5000);
      } else if (!this.form.year) {
        setTimeout(() => {
          this.tempStore();
        }, 5000);
      } else {
        this.interval = true;
        this.autoCompleted();
      }
    },
    calculateYear() {
      let today = new Date();
      let year = today.getFullYear();
      for (let a = 0; a <= 100; a++) {
        this.items.push(year - a);
      }
    },
    changeSelect() {
      this.selected = !this.selected;
    },
  },
  mounted() {
    // document.getElementsByClassName("editorWidth")[0].style.width = "80px";
    // this.getTodayQuestion();
    this.calculateYear();
    this.getData();
    this.tempStore();
  },
  beforeRouteLeave(to, from, next) {
    if (window.confirm("정말로 떠나시겠습니까?")) {
      clearInterval(this.timer);
      next();
    }
  },
  computed: {
    ...mapState({
      todayQuestion: (state) => state.question.todayQuestion,
      todayQuestionId: (state) => state.question.todayQuestionId,
    }),
  },
};
</script>

<style scoped>
@import "../../assets/css/CreatePast.css";
</style>
