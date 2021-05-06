<template>
  <div>
    <div id="flipbook">
      <!-- hard: 표지 앞,뒤 -->
      <div v-if="bookInfo" class="hard">
        {{ bookInfo.cover.title }}
      </div>
      <div v-else-if="bookInfo2" class="hard">
        {{ bookInfo2.cover.title }}
      </div>
      <!-- 저자소개 -->
      <div class="hard"><WriterInfo /></div>
      <div><SelectMode /></div>
      <div>
        <h1>목차</h1>
      </div>
      <!-- <div v-if="bookInfo"> -->
      <!-- computed에서 v-for작업, html에는 v-if만 -->
      <!-- <div v-if="bookInfo"> -->
      <div v-for="(item, idx) in bookInfo2.content" :key="idx">
        <h1>{{ item.title }}</h1>
        <p>{{ item.content }}</p>
        <!-- </div> -->
        <!-- </div> -->
        <div class="hard"></div>
        <div class="hard"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { readTimeline } from "@/api/timeline";
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
      bookInfo2: {
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
      },
    };
  },
  methods: {
    mainRead(page) {
      if (window.$("#flipbook")) {
        window.$("#flipbook").turn({
          width: 1200,
          height: 900,
          page: page,
          // acceleration: true,
          gradients: true,
        });
      } else {
        this.mainRead(1);
      }
    },
    async timelineRead() {
      await readTimeline(
        (res) => {
          let arr = [];
          let items = res.data.data;
          let lastIdx = Object.keys(items)[Object.keys(items).length - 1];
          console.log(lastIdx);

          for (let i = 0; i < lastIdx; i++) {
            // arr.push(items[i]);
            Array.prototype.push.apply(arr, items[i]);
          }
          this.bookInfo2 = arr;
          console.log("timeline챕터정보======");
          console.log(this.bookInfo2);
        },
        (err) => console.error(err)
      );
      readPastChapter(
        this.timeline.id,
        () => {
          // let page = res.data.page;
          this.mainRead(1);
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
      if (this.bookInfo.content[0].title !== "") {
        console.log("mainRead");
        this.bookInfo2 = this.bookInfo;
        this.mainRead(3);
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
