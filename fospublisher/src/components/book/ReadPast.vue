<template>
  <div>
    <div class="bar">
      <button>
        <v-icon large color="black">mdi-format-list-bulleted</v-icon>
        <p>목차</p>
      </button>
      <button @click="modifyChapter">
        <v-icon large color="black">mdi-file-document-edit-outline</v-icon>
        <p>수정하기</p>
      </button>
      <button @click="deleteModal">
        <v-icon large color="black">mdi-delete-forever-outline</v-icon>
        <p>삭제하기</p>
      </button>
    </div>
    <!-- 책클릭 -> 읽기모드 -->
    <div
      v-if="
        this.bookInfo.content.length == 0 || bookInfo.content[0].title !== ''
      "
      id="flipbook"
    >
      <div class="hard">
        {{ bookInfo.cover.title }}
      </div>
      <div class="hard">
        <WriterInfo />
      </div>
      <div><SelectMode /></div>
      <div>
        <h1>목차</h1>
      </div>
      <!-- computed에서 v-for작업, html에는 v-if만 -->
      <div v-for="(item, idx) in bookInfo.content" :key="idx">
        <h1>{{ item.title }}</h1>
        <p v-html="item.content"></p>
        <div class="hard"></div>
        <div class="hard"></div>
      </div>
    </div>
    <!-- 타임라인 -> 읽기모드 -->
    <div v-else id="flipbook">
      <div class="hard"></div>
      <div>
        <h1>{{ timechapter.title }}</h1>
      </div>
      <div v-for="(item, idx) in temp" :key="idx">
        <p v-html="item"></p>
      </div>
      <div class="hard"></div>
      <!-- <div>
        <h1>{{ timechapter.title }}</h1>
      </div>
      <div>
        <p>{{ timechapter.content }}</p>
        <p v-html="timechapter.content"></p>
      </div> -->
    </div>
    <p>{{ temp }}</p>
    <v-dialog v-model="dialog" width="25vw">
      <MessageModal
        body-content="정말 삭제하시겠습니까?"
        @submit="deleteChapter"
      />
    </v-dialog>
  </div>
</template>

<script>
import { readPastChapter, deletePastChapter } from "@/api/past";
import WriterInfo from "../member/WriterInfo.vue";
import SelectMode from "./SelectMode.vue";
import MessageModal from "../MessageModal.vue";
// import { mdiFileDocumentEditOutline } from "@mdi/js";

export default {
  name: "ReadPast",
  components: { WriterInfo, SelectMode, MessageModal },
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
      currentId: 0,
      dialog: false,
      temp: ["", "", "", "", ""],
    };
  },
  methods: {
    deleteChapter() {
      console.log("delete");
      this.dialog = false;
      let id = this.currentId;
      deletePastChapter(
        id,
        () => {
          // timeline에서 삭제면 일대기로, 읽기모드에서 삭제면 저자소개로 돌아가기
          if (this.$route.params.id) {
            this.$router.push("timeline");
          } else {
            this.mainRead();
          }
        },
        (err) => {
          console.error(err);
          alert("삭제 실패하였습니다. 다시 시도해주세요");
        }
      );
    },
    modifyChapter() {},
    deleteModal() {
      this.dialog = !this.dialog;
      let view = window.$("#flipbook").turn("view");
      let currentView = view[0];
      let index = currentView - 4; // 내용이 여러장이면,,
      if (this.bookInfo.content[0].title !== "") {
        this.currentId = this.bookInfo.content[index].id;
      } else {
        this.currentId = this.$route.params.id;
      }
    },
    mainRead() {
      if (window.$("#flipbook")) {
        window.$("#flipbook").turn({
          width: 1200,
          height: 900,
          page: 3,
          // acceleration: true, touch device용
          gradients: true,
          autoCenter: true,
        });
        console.log("bookInfo.content");
        console.log(this.bookInfo.content);
      } else {
        this.mainRead(1);
      }
    },
    async timelineRead() {
      await readPastChapter(
        (this.timechapter.id = this.$route.params.id),
        (res) => {
          this.timechapter = res.data;
          // content에서 pagebreak 제거
          let timeChapterInfo = res.data.content;
          this.temp = timeChapterInfo.split(
            '<div class="html2pdf__page-break" style="border-bottom: 1px dashed black; position: relative;">'
          );
          for (let i = 0; i < this.temp.length; i++) {
            if (i % 2 === 1) {
              // let erasePage = this.temp[i].replace(/PAGE([0-9]</div></div>)/g,"")
              console.log("홀수");
              console.log(this.temp[i]);
              let erasePage = this.temp[i].replace(
                '<div style="-webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%); position: absolute; background-color: white; border: 1px solid black; border-radius: 3px; top: 50%; left: 50%; padding: 2px 10px; justify-content: center;"> PAGE 1 </div>',
                ""
              );
              this.temp[i] = erasePage;
            }
          }
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
