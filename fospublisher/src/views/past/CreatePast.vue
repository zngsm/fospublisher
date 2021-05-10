<template>
  <div class="create-container">
    <Navbar />
    <div class="create-left">
      <div v-if="!edit" class="create-left-section">
        <h1 class="create-left-question-title text-center">
          오늘의 질문
        </h1>
        <div class="create-left-question-content">
          {{ todayQuestion }}
        </div>
        <button class="create-left-question-button" @click="getTodayQuestion">
          다른 질문 받기
        </button>
      </div>
      <div v-else>수정중;;;</div>
    </div>
    <div class="create-right">
      <form class="create-right-form">
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
            :content="form.content"
          />
        </div>
      </form>
      <div class="create-right-btn">
        <v-btn large @click="goToBack">취소</v-btn>
        <v-btn large @click="onSubmit">발행</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getQuestion,
  // getSelectedQuesion
  createPastChapter,
  updatePastChapter,
} from "@/api/past.js";
import { checkUserInfo } from "@/api/account";
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
        toolButton: {
          backgroundColor: "var(--v-background-base)",
        },
        toolButtonText: {
          backgroundColor: "var(--v-background-base)",
        },
      },
      id: null,
      questionId: null,
      question: "?",
      content: "",
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
      exit: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
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
            this.interval = false;
            this.$router.push({
              name: "ReadPast",
              params: { id: res.data.id },
            });
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        console.log(this.form);
        updatePastChapter(
          this.chapId,
          this.form,
          () => {
            this.interval = false;
            this.$router.push({
              name: "ReadPast",
              params: { id: this.chapId },
            });
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
    goToBack() {
      this.exit = true;
      if (!this.chapId) {
        this.$router.push("Main");
      } else {
        this.form.title = sessionStorage.getItem("title");
        this.form.content = sessionStorage.getItem("content");
        this.form.year = sessionStorage.getItem("year");
        updatePastChapter(
          this.chapId,
          this.form,
          () => {
            sessionStorage.clear();
            this.$router.push({
              name: "ReadPast",
              params: { id: this.chapId },
            });
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
    // 질문 갱신
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
    // 수정시 기본 데이터 세팅
    setSessionStorage() {
      if (this.$route.params.id) {
        sessionStorage.setItem("chapId", this.$route.params.id);
      }
    },
    async getData() {
      if (sessionStorage.getItem("chapId")) {
        this.selected = true;
        this.edit = true;
        this.chapId = sessionStorage.getItem("chapId");
        this.form.title = sessionStorage.getItem("title");
        this.form.content = sessionStorage.getItem("content");
        this.form.year = sessionStorage.getItem("year");
      }
    },
    // 년도 선택
    changeSelect() {
      this.selected = !this.selected;
    },
    calculateYear() {
      let today = new Date();
      let year = today.getFullYear();
      checkUserInfo((res) => {
        if (res.status === 200) {
          let userBirth = res.data.user.birthday.split("-")[0];
          for (year; userBirth <= year; year--) {
            this.items.push(year);
          }
        }
      });
    },
    // 자동저장
    autoSave() {
      this.timer = setInterval(() => {
        this.form.check = false;
        if (this.interval) {
          if (!this.chapId) {
            createPastChapter(
              this.form,
              (res) => {
                this.chapId = res.data.id;
                this.edit = true;
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
    tempStore() {
      if (
        !this.form.year ||
        (this.form.title == "" && this.form.content == "")
      ) {
        setTimeout(() => {
          this.tempStore();
        }, 5000);
      } else {
        this.interval = true;
        this.autoSave();
      }
    },
  },
  mounted() {
    this.calculateYear();
    this.tempStore();
  },
  created() {
    this.setSessionStorage();
    this.getData();
  },
  beforeRouteLeave(to, from, next) {
    if (!this.form.check) {
      let message = "";
      if (this.exit) {
        message = "작업한 내용이 저장되지 않습니다. 정말 나가시겠습니까?";
      } else {
        message =
          "작업한 내용이 저장되지 않을 수 있습니다. 정말 나가시겠습니까?";
      }
      if (window.confirm(message)) {
        this.interval = false;
        clearInterval(this.timer);
        if (sessionStorage.getItem("chapId")) {
          sessionStorage.clear();
        }
        next();
      }
    } else {
      sessionStorage.clear();
      next();
    }
  },
  computed: {
    ...mapState({
      todayQuestion: (state) => state.question.todayQuestion,
      todayQuestionId: (state) => state.question.todayQuestionId,
      userInfo: (state) => state.auth.userInfo,
    }),
  },
  watch: {
    interval: function() {
      if (this.interval == false) {
        clearInterval(this.timer);
      }
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/CreatePast.css";
</style>
