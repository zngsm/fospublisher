<template>
  <div
    class="create-container"
    ondragstart="return false"
    onselectstart="return false"
  >
    <Navbar />
    <div class="create-left">
      <Question v-if="questionChange" class="create-left-section" />
      <QuestionForEdit v-else :question="Number(form.question)" />
    </div>
    <div class="create-middle"></div>
    <div class="create-right">
      <form class="create-right-form">
        <v-text-field v-model="form.title" label="제목" required></v-text-field>
        <div class="d-flex create-right-year">
          <div
            v-if="status == 'PAST'"
            class="create-right-select-year d-flex align-center"
          >
            <v-select
              v-model="form.year"
              :items="items"
              menu-props="auto"
              label="언제있었던 일인가요?"
              dense
              :hint="form.year ? String(form.year) : ''"
              persistent-hint
            ></v-select>
          </div>
          <SelectFutureDate
            v-else
            class="create-right-select-year d-flex align-center"
            :futureDate="futureDate"
            :minDate="minDate"
            @changeDate="changeDate"
          />
        </div>
        <div v-if="updateTime">{{ nowTime }} 임시저장되었습니다.</div>
        <div class="create-editor">
          <Editor
            @updateContent="(val) => (form.content = val)"
            :style-object="styleObject"
            :content="form.content"
          />
        </div>
      </form>
      <div class="create-right-btn">
        <v-checkbox
          v-if="status == 'PAST'"
          v-model="form.share"
          label="자서전에 담기(임시저장글은 자서전에 포함되지 않습니다.)"
        ></v-checkbox>
        <v-btn large @click="goToBack">취소</v-btn>
        <v-btn large @click="onSubmit">발행</v-btn>
      </div>
      <v-dialog v-model="dialog" width="25vw">
        <message-modal
          v-if="dialog"
          :body-content="alertMessage"
          @submit="changeMode"
        />
      </v-dialog>
    </div>
  </div>
</template>

<script>
import {
  getQuestion,
  createPastChapter,
  updatePastChapter,
} from "@/api/past.js";
import { createFutureChapter, updateFutureChapter } from "@/api/future";
import { checkUserInfo } from "@/api/account";
import "../../assets/css/CreatePast.css";
import Navbar from "../../components/main/Navbar.vue";
import { mapState } from "vuex";
import store from "@/store";
import Editor from "fospublisher-vue-text-editor";
import Question from "../../components/chapter/Question.vue";
import SelectFutureDate from "../../components/chapter/SelectFutureDate.vue";
import MessageModal from "../../components/MessageModal.vue";
import QuestionForEdit from "../../components/chapter/QuestionForEdit.vue";
export default {
  name: "CreatePast",
  components: {
    Editor,
    Navbar,
    Question,
    SelectFutureDate,
    MessageModal,
    QuestionForEdit,
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
        editorWidth: { width: "699px" },
      },
      id: null,
      questionChange: true,
      tmpTitle: "",
      tmpYear: "",
      tmpMonth: "",
      tmpDay: "",
      tmpContent: "",
      form: {
        title: "",
        content: "",
        year: null,
        month: null,
        day: null,
        check: false,
        question: null,
        share: false,
      },
      interval: false,
      items: [],
      chapId: null,
      edit: false,
      auto: null,
      timer: null,
      timeout: null,
      updateTime: null,
      exit: false,
      autoSaveKey: true,
      status: null,
      minDate: null,
      maxDate: null,
      futureDate: null,
      dialog: false,
      alertMessage: null,
      nowTime: null,
    };
  },
  methods: {
    changeQuestion() {
      this.form.question = this.todayQuestionId;
    },
    changeMode() {
      this.dialog = false;
    },
    changeDate(date) {
      this.futureDate = date;
      this.form.year = this.futureDate.split("-")[0];
      this.form.month = this.futureDate.split("-")[1];
      this.form.day = this.futureDate.split("-")[2];
    },
    insertPageBreak() {
      const iframe = window
        .$('iframe[name="richTextField"]')
        .contents()
        .find("body");
      const childNodes = window
        .$('iframe[name="richTextField"]')
        .contents()
        .find("body")[0].childNodes;
      var pageNum = Math.ceil((iframe.height() / 468) * 1.1);
      for (var i = 1; i <= pageNum; i++) {
        for (var j = 0; j < childNodes.length; j++) {
          if (
            childNodes[j].offsetTop <= 468 * i &&
            childNodes[j].offsetTop + childNodes[j].offsetHeight > 468 * i
          ) {
            window
              .$(
                `<div class="html2pdf__page-break" position: relative;"></div>`
              )
              .insertBefore(childNodes[j]);
            break;
          }
        }
      }
    },
    createPastCompleted() {
      this.form.question = this.todayQuestionId;
      createPastChapter(
        this.form,
        (res) => {
          this.interval = false;
          clearInterval(this.timer);
          clearTimeout(this.timeout);
          this.$router.push({
            name: "ReadPast",
            params: { id: res.data.id, status: "PAST" },
          });
        },
        (err) => {
          console.error(err);
        }
      );
    },
    createFutureCompleted() {
      createFutureChapter(
        this.form,
        (res) => {
          this.interval = false;
          clearInterval(this.timer);
          clearTimeout(this.timeout);
          this.$router.push({
            name: "ReadPast",
            params: { id: res.data.id, status: "FUTURE" },
          });
        },
        (err) => {
          console.error(err);
        }
      );
    },
    updatePastCompleted() {
      if (this.questionChange) {
        this.form.question = this.todayQuestionId;
      }
      updatePastChapter(
        this.chapId,
        this.form,
        () => {
          this.interval = false;
          clearInterval(this.timer);
          clearTimeout(this.timeout);
          sessionStorage.clear();
          this.$router.push({
            name: "ReadPast",
            params: { id: this.chapId, status: "PAST" },
          });
        },
        (err) => {
          console.error(err);
        }
      );
    },
    updateFutureCompleted() {
      updateFutureChapter(
        this.chapId,
        this.form,
        () => {
          this.interval = false;
          clearInterval(this.timer);
          clearTimeout(this.timeout);
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
    },
    createPastAuto() {
      this.form.question = this.todayQuestionId;
      createPastChapter(
        this.form,
        (res) => {
          this.chapId = res.data.id;
          this.edit = true;
          this.updateTime = res.data.update;
          this.tmpTitle = this.form.title;
          this.tmpContent = this.form.content;
          this.tmpYear = this.form.year;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    createFutureAuto() {
      createFutureChapter(
        this.form,
        (res) => {
          this.chapId = res.data.id;
          this.edit = true;
          this.updateTime = res.data.update;
          this.tmpTitle = this.form.title;
          this.tmpContent = this.form.content;
          this.tmpYear = this.form.year;
          this.tmpMonth = this.form.month;
          this.tmpDay = this.form.day;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    updatePastAuto() {
      if (this.questionChange) {
        this.form.question = this.todayQuestionId;
      }
      updatePastChapter(
        this.chapId,
        this.form,
        (res) => {
          this.updateTime = res.data.update;
          this.tmpTitle = this.form.title;
          this.tmpContent = this.form.content;
          this.tmpYear = this.form.year;
          this.tmpMonth = this.form.month;
          this.tmpDay = this.form.day;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    updateFutureAuto() {
      updateFutureChapter(
        this.chapId,
        this.form,
        (res) => {
          this.updateTime = res.data.update;
          this.tmpTitle = this.form.title;
          this.tmpContent = this.form.content;
          this.tmpYear = this.form.year;
        },
        (err) => {
          console.error(err);
        }
      );
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (!this.form.year) {
        this.alertMessage = "날짜를 입력해주세요";
        this.dialog = true;
        return;
      } else if (!this.form.title) {
        this.alertMessage = "제목을 입력해주세요";
        this.dialog = true;
        return;
      } else if (!this.form.content) {
        this.alertMessage = "내용을 입력해주세요";
        this.dialog = true;
        return;
      }
      // 쪼개기
      this.insertPageBreak();

      this.form.check = true;
      this.interval = false;
      this.autoSaveKey = false;
      clearInterval(this.timer);
      clearTimeout(this.timeout);
      if (!this.edit) {
        if (this.status == "PAST") {
          this.form.question = this.todayQuestionId;

          this.createPastCompleted();
        } else {
          this.createFutureCompleted();
        }
      } else {
        if (this.status == "PAST") {
          this.updatePastCompleted();
        } else {
          this.updateFutureCompleted();
        }
      }
    },
    goToBack() {
      this.autoSaveKey = false;
      this.exit = true;
      if (!this.chapId) {
        this.$router.push("Main");
      } else {
        this.form.title = sessionStorage.getItem("title");
        this.form.content = sessionStorage.getItem("content");
        this.form.year = sessionStorage.getItem("year");
        if (this.status == "PAST") {
          this.updatePastCompleted();
        } else {
          this.form.month = sessionStorage.getItem("month");
          this.form.day = sessionStorage.getItem("day");
          this.updateFutureCompleted();
        }
      }
    },
    // 질문 갱신
    getTodayQuestion() {
      getQuestion(
        this.todayQuestionId,
        (res) => {
          this.form.question = res.data.id;
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
      if (this.$route.params.status) {
        sessionStorage.setItem("status", this.$route.params.status);
      } else if (
        !this.$route.params.status &&
        !sessionStorage.getItem("status")
      ) {
        this.form.check = true;
        this.$router.push("Main");
      }
      this.status = sessionStorage.getItem("status");
    },
    getData() {
      if (sessionStorage.getItem("chapId")) {
        this.edit = true;
        this.questionChange = false;
        this.chapId = sessionStorage.getItem("chapId");
        this.form.title = sessionStorage.getItem("title");
        let tempContent = sessionStorage.getItem("content");
        let tempContentArray = tempContent.split(
          '<div class="html2pdf__page-break" position:="" relative;"=""></div>'
        );
        for (let i of tempContentArray) {
          this.form.content += i;
        }
        this.form.year = sessionStorage.getItem("year");
        if (this.status != "PAST") {
          this.form.month = sessionStorage.getItem("month");
          this.form.day = sessionStorage.getItem("day");
          this.tmpMonth = this.form.month;
          this.tmpDay = this.form.day;
        } else {
          this.form.share =
            sessionStorage.getItem("share") == "false" ? false : true;
          this.form.question = sessionStorage.getItem("question");
        }
        this.tmpTitle = this.form.title;
        this.tmpContent = this.form.content;
        this.tmpYear = this.form.year;
      } else {
        this.form.share = true;
      }
    },
    addZero(num, cnt) {
      let zero = "";
      num = String(num);
      if (num.length < cnt) {
        zero += "0";
      }
      return (zero += num);
    },
    calculateYear() {
      let today = new Date();
      this.minDate =
        this.addZero(today.getFullYear(), 4) +
        "-" +
        this.addZero(today.getMonth() + 1, 2) +
        "-" +
        this.addZero(today.getDate(), 2);
      let year = today.getFullYear();
      if (this.status == "PAST") {
        checkUserInfo((res) => {
          if (res.status === 200) {
            let userBirth = res.data.user.birthday.split("-")[0];
            for (year; userBirth <= year; year--) {
              this.items.push(year);
            }
          }
        });
      }
    },
    autoSave() {
      this.timer = setInterval(() => {
        let today = new Date();
        let hours = String(today.getHours()); // 시
        let minutes = String(today.getMinutes()); // 분
        let seconds = String(today.getSeconds());
        this.nowTime = `${hours.lenght < 2 ? 0 + hours : hours}:${
          minutes.length < 2 ? 0 + minutes : minutes
        }:${seconds.length < 2 ? 0 + seconds : seconds}`;
        this.form.check = false;
        if (
          this.status == "PAST" &&
          this.form.title == this.tmpTitle &&
          this.form.content == this.tmpContent &&
          this.form.year == this.tmpYear
        ) {
          this.timeout = setTimeout(() => {
            this.tempStore();
          }, 5000);
        } else if (
          this.status != "PAST" &&
          this.form.title == this.tmpTitle &&
          this.form.content == this.tmpContent &&
          this.form.year == this.tmpYear &&
          this.form.month == this.tmpMonth &&
          this.form.day == this.tmpDay
        ) {
          this.timeout = setTimeout(() => {
            this.tempStore();
          }, 5000);
        } else if (this.interval) {
          if (!this.chapId) {
            if (this.status == "PAST") {
              this.createPastAuto();
            } else {
              this.createFutureAuto();
            }
          } else {
            if (this.status == "PAST") {
              this.updatePastAuto();
            } else {
              this.updateFutureAuto();
            }
          }
        } else {
          clearInterval(this.timer);
        }
      }, 5000);
    },
    tempStore() {
      if (this.status == "PAST" && !this.form.year) {
        this.timeout = setTimeout(() => {
          this.tempStore();
        }, 5000);
      } else if (this.status != "PAST" && !this.futureDate) {
        this.timeout = setTimeout(() => {
          this.tempStore();
        }, 5000);
      } else if (!this.form.title && !this.form.content) {
        this.timeout = setTimeout(() => {
          this.tempStore();
        }, 5000);
      } else if (
        this.status == "PAST" &&
        this.form.title == this.tmpTitle &&
        this.form.content == this.tmpContent &&
        this.form.year == this.tmpYear
      ) {
        this.timeout = setTimeout(() => {
          this.tempStore();
        }, 5000);
      } else if (
        this.status != "PAST" &&
        this.form.title == this.tmpTitle &&
        this.form.content == this.tmpContent &&
        this.form.year == this.tmpYear &&
        this.form.month == this.tmpMonth &&
        this.form.day == this.tmpDay
      ) {
        this.timeout = setTimeout(() => {
          this.tempStore();
        }, 5000);
      } else {
        this.interval = true;
        this.autoSave();
      }
    },
  },
  mounted() {
    if (this.autoSaveKey) {
      this.tempStore();
    }
  },
  created() {
    this.setSessionStorage();
    this.getData();
    this.calculateYear();
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
        this.autoSaveKey = false;
        this.interval = false;
        clearInterval(this.timer);
        clearTimeout(this.timeout);
        sessionStorage.clear();
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
    interval: function () {
      if (this.interval == false) {
        clearInterval(this.timer);
        clearTimeout(this.timeout);
        return;
      }
    },
    autoSaveKey: function () {
      if (this.autoSaveKey == false) {
        clearInterval(this.timer);
        clearTimeout(this.timeout);
        return;
      }
    },
  },
};
</script>

<style></style>
