<template>
  <div>
    <Navbar />
    <!-- 책클릭 -> 읽기모드 -->
    <div style="width:100%; height:60px;"><span></span></div>
    <div
      v-if="
        this.bookInfo.content.length == 0 || bookInfo.content[0].title !== ''
      "
      id="flipbook"
    >
      <div class="hard d-flex">
        <div class="mx-auto my-auto" style="fontSize: 50px;">
          {{ bookInfo.cover.title }}
        </div>
      </div>
      <div class="hard">
        <WriterInfo />
      </div>
      <div class="read-select">
        <SelectMode @read="read" />
      </div>
      <div
        v-if="
          this.bookInfo.content.length == 0 || bookInfo.content[0].title !== ''
        "
      >
        <h1>목차</h1>
        <v-expansion-panels flat hover style="width:400px;" class="mx-auto">
          <v-expansion-panel v-for="(year, i) in years" :key="i">
            <v-expansion-panel-header>
              {{ year }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                v-for="(item, idx) in bookInfo.list[year]"
                :key="idx"
                class="readpast-index"
                @click="goPage(item.pageStart)"
              >
                <div>
                  <p>
                    <b>{{ item.title }}</b>
                  </p>
                </div>
                <div>
                  <p>{{ item.pageStart + 5 }} 쪽</p>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <!-- computed에서 v-for작업, html에는 v-if만 -->
      <div v-for="(item, idx) in bookInfo.content" :key="idx">
        <button @click="modifyChapter(item)">
          <v-icon large color="black">mdi-file-document-edit-outline</v-icon>
          <p>수정</p>
        </button>
        <button @click="deleteModal(item.id)">
          <v-icon large color="black">mdi-delete-forever-outline</v-icon>
          <p>삭제</p>
        </button>
        <h1>{{ item.title }}</h1>
        <p v-html="item.content"></p>
      </div>
      <div class="hard"></div>
      <div class="hard"></div>
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
    <!-- <p>{{ temp }}</p> -->
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
import { readFutureChapter } from "@/api/future";
import Navbar from "@/components/main/Navbar.vue";
import WriterInfo from "../member/WriterInfo.vue";
import SelectMode from "./SelectMode.vue";
import MessageModal from "../MessageModal.vue";

export default {
  name: "ReadPast",
  components: { Navbar, WriterInfo, SelectMode, MessageModal },
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
      currentId: null,
      dialog: false,
      years: null,
      temp: ["", "", "", "", ""],
      info: null,
    };
  },
  methods: {
    read() {
      window.$("#flipbook").turn("next");
    },
    goPage(p) {
      let pageNum = p + 5;
      window.$("#flipbook").turn("page", pageNum);
    },
    modifyChapter(data) {
      let chapter = data;
      let status = this.$route.params.status;
      sessionStorage.setItem("title", chapter.title);
      sessionStorage.setItem("content", chapter.content);
      sessionStorage.setItem("year", chapter.year);
      sessionStorage.setItem("share", chapter.share);
      sessionStorage.setItem("question", chapter.question);
      this.$router.push({
        name: "CreatePast",
        params: { id: chapter.id, status: status },
      });
    },
    deleteModal(id) {
      console.log("delete");
      this.dialog = true;
      this.currentId = id;
    },
    deleteChapter() {
      let id = this.currentId;
      console.log("currentId", this.currentId);
      console.log("id", id);
      deletePastChapter(
        id,
        () => {
          // timeline에서 삭제면 일대기로, 읽기모드에서 삭제면 저자소개로 돌아가기
          if (this.$route.params.id) {
            this.$router.push("timeline");
          } else {
            window.$("#flipbook").turn("next");
          }
          this.dialog = false;
        },
        (err) => {
          this.dialog = false;
          console.error(err);
          alert("삭제 실패하였습니다. 다시 시도해주세요");
        }
      );
    },
    cutPage() {
      // 페이지네이션
      console.log("info");
      console.log(this.info);
      this.temp = this.info.split(
        '<div class="html2pdf__page-break" style="border-bottom: 1px dashed black; position: relative;">'
      );
      for (let i = 0; i < this.temp.length; i++) {
        if (i % 2 === 1) {
          // let erasePage = this.temp[i].replace(/PAGE([0-9]</div></div>)/g,"")
          console.log("홀수");
          console.log(this.temp[i]);

          let erasePage = this.temp[i].replace(
            `<di, style="-webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%); position: absolute; background-color: white; border: 1px solid black; border-radius: 3px; top: 50%; left: 50%; padding: 2px 10px; justify-content: center;"> PAGE ${i +
              1}</div></div>`,
            ""
          );
          this.temp[i] = erasePage;
        }
      }
      this.mainRead(3);
    },
    mainRead(num) {
      if (window.$("#flipbook")) {
        window.$("#flipbook").turn({
          width: 1026,
          height: 650,
          page: num,
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
      if (this.$route.params.status === "PAST") {
        console.log("past");
        await readPastChapter(
          (this.timechapter.id = this.$route.params.id),
          (res) => {
            this.timechapter = res.data;
            // content에서 pagebreak 제거
            this.info = res.data.content;
            this.cutPage();
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        console.log("future");
        let id = this.$route.params.id;
        await readFutureChapter(
          id,
          (res) => {
            this.timechapter = res.data;
            this.info = res.data.content;
            this.cutPage();
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
    getInfo() {
      if (this.$route.params.id) {
        console.log("timelineRead");
        this.timelineRead();
      } else {
        console.log("bookInfo에 info");
        console.log(this.bookInfo);
        if (
          this.bookInfo.content.length == 0 ||
          this.bookInfo.content[0].title !== ""
        ) {
          this.years = Object.keys(this.bookInfo.list);
        }
        this.mainRead(3);
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
