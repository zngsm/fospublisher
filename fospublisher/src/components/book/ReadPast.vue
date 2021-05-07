<template>
  <div>
    <div
      v-if="bookInfo.content.length == 0 || bookInfo.content[0].title !== ''"
      id="flipbook"
    >
      <!-- hard: 표지 앞,뒤 -->
      <div v-if="bookInfo.cover.title" class="hard">
        {{ bookInfo.cover.title }}
      </div>
      <!-- 저자소개 -->
      <div class="hard">
        <WriterInfo />
      </div>
      <div><SelectMode /></div>
      <div>
        <h1>목차</h1>
      </div>
      <!-- <div v-if="bookInfo"> -->
      <!-- computed에서 v-for작업, html에는 v-if만 -->
      <!-- <div v-if="bookInfo"> -->
      <!-- 일단 주석처리
      <div v-for="(item, idx) in timechapter.content" :key="idx">
        <h1>{{ item.title }}</h1>
        <p>{{ item.content }}</p>-->
      <div class="hard"></div>
      <div class="hard"></div>
    </div>
    <div v-else id="flipbook">
      <div class="hard"></div>
      <div>
        <h1>{{ timechapter.title }}</h1>
      </div>
      <div>
        <p>{{ timechapter.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { readPastChapter } from "@/api/past";
import WriterInfo from "../member/WriterInfo.vue";
import SelectMode from "./SelectMode.vue";
export default {
  name: "ReadPast",
  components: { WriterInfo, SelectMode },
  props: {
    bookInfo: {
      type: Object,
      default: () => {
        return {
          cover: {
            id: 0,
            page: 0,
            title: "",
            size: 0,
            skin: 0,
            font: 0,
            skin_color: "",
            font_color: "",
          },
          content: [
            {
              id: 0,
              title: "",
              content: "",
              year: 0,
              order: 0,
              page: 0,
              check: true,
              createdAt: "",
            },
          ],
        };
      },
    },
    timeline: {
      type: Object,
    },
  },
  data() {
    return {
      timechapter: {
        content: [
          {
            id: 0,
            title: "",
            content: "",
            year: 0,
            order: 0,
            page: 0,
            check: true,
            createdAt: "",
          },
        ],
      },
    };
  },
  methods: {
    mainRead() {
      if (window.$("#flipbook")) {
        window.$("#flipbook").turn({
          width: 1200,
          height: 900,
          page: 3,
          // acceleration: true,
          gradients: true,
        });
      } else {
        this.mainRead(1);
      }
    },
    async timelineRead() {
      await readPastChapter(
        this.timeline.id,
        (res) => {
          // let page = res.data.page;
          this.timechapter = res.data;
          this.mainRead(3);
        },
        (err) => {
          console.error(err);
        }
      );
    },
    turn() {
      window.$("#flipbook").bind("turning", function(event, page) {
        if (page == 1) {
          event.preventDefault();
        }
      });
    },
    getInfo() {
      // 메인->책읽기
      if (
        this.bookInfo.content.length == 0 ||
        this.bookInfo.content[0].title !== ""
      ) {
        console.log("mainRead");
        this.mainRead();
      } else {
        // 타임라인->책읽기
        console.log("timelineRead");
        this.timelineRead();
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.getInfo();
    }, 200);
  },
};
</script>

<style scoped>
@import "../../assets/css/ReadPast.css";
</style>
