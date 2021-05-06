<template>
  <div class="q-container">
    <div class="left">
      <h1>오늘의 질문</h1>
      <h2>{{ question }}</h2>
      <button @click="getTodayQuestion">질문 받기</button>
    </div>
    <div class="right">
      <form @submit="onSubmit">
        <input v-model="form.title" placeholder="제목" />
        <h2>언제 있었던 일인가요?</h2>
        <input v-model="form.year" placeholder="예: 1995" />년
        <!-- 나중에 에디터 자리 -->
        <input
          v-model="form.content"
          placeholder="그 때의 기억을 떠올려보세요"
        />
      </form>
      <button @click="onSubmit">발행</button>
    </div>
  </div>
</template>

<script>
import { getQuestion, createPastChapter } from "@/api/past.js";
export default {
  name: "PastCreate",
  props: {
    bookInfo: {
      type: Object,
    },
  },
  data() {
    return {
      id: 1,
      question: "?",
      form: {
        title: "",
        content: "",
        year: null,
        check: false,
      },
      interval: false,
    };
  },
  methods: {
    getTodayQuestion() {
      getQuestion(
        this.id,
        (res) => ((this.id = res.data.id), (this.question = res.data.question)),
        (err) => console.error(err)
      );
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.form.check = true;
      this.interval = false;
      clearInterval(this.interval);
      // 에디터 연결 시, 에디터의 내용 jquery로 잡아서 content로 보내주기
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
  },
  mounted() {
    this.tempStore();
  },
};
</script>

<style scoped>
@import "../../assets/css/CreatePast.css";
</style>
