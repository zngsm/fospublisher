<template>
  <div>
    <Navbar />
    <!-- 책클릭 -> 읽기모드 -->
    <div style="width:100%; height:60px;"><span></span></div>
    <div v-if="!this.$route.params.id" id="flipbook">
      <div class="hard d-flex">
        <div class="mx-auto my-auto" style="fontSize: 50px;">
          {{ bookInfo.cover.title }}
        </div>
      </div>
      <div class="hard">
        <WriterInfo />
      </div>
      <div class="read-select">
        <SelectMode @read="read"></SelectMode>
      </div>
      <!-- <div
        v-if="
          this.bookInfo.content.length == 0 || bookInfo.content[0].title !== ''
        "
      > -->
      <div>
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
      <!-- 메인 -> 읽기모드  -->
      <div v-for="(item, idx) in bookInfo.content" :key="idx">
        <button @click="modifyChapter(item)">
          <v-icon large color="black">mdi-file-document-edit-outline</v-icon>
          <p>수정</p>
        </button>
        <button @click="deleteModal(item.id, idx)">
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
        <button @click="modifyChapter(timechapter)">
          <v-icon large color="black">mdi-file-document-edit-outline</v-icon>
          <p>수정</p>
        </button>
        <button @click="deleteModal(timechapter.id)">
          <v-icon large color="black">mdi-delete-forever-outline</v-icon>
          <p>삭제</p>
        </button>
        <h1>{{ timechapter.title }}</h1>
      </div>
      <div v-for="(item, idx) in temp" :key="idx">
        <p v-html="item"></p>
      </div>

      <div class="hard"></div>
      <div>
        <h1>{{ timechapter.title }}</h1>
      </div>
      <div>
        <p>{{ timechapter.content }}</p>
        <p v-html="timechapter.content"></p>
      </div>
    </div>
    <!-- </div>  -->
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
import { readPastBook, readPastChapter, deletePastChapter } from "@/api/past";
import {
  readFutureBook,
  readFutureChapter,
  deleteFutureChapter,
} from "@/api/future";
import Navbar from "@/components/main/Navbar.vue";
import WriterInfo from "../member/WriterInfo.vue";
import SelectMode from "./SelectMode.vue";
import MessageModal from "../MessageModal.vue";

export default {
  name: "ReadPast",
  components: { Navbar, WriterInfo, SelectMode, MessageModal },
  data() {
    return {
      bookInfo: {
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
      currentIdx: null,
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
    deleteModal(id, idx) {
      console.log("delete");
      console.log(id);
      this.dialog = true;
      this.currentId = id;
      this.currentIdx = idx;
    },
    deleteChapter() {
      let id = this.currentId;
      let idx = this.currentIdx;
      console.log("currentId", this.currentId);
      console.log("id", id);
      if (this.$route.params.status === "FUTURE") {
        deleteFutureChapter(
          id,
          () => {
            this.bookInfo.content.splice(idx, 1);
            window.$("#flipbook").turn("page", 3);
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        deletePastChapter(
          id,
          () => {
            // timeline에서 삭제면 일대기로, 읽기모드에서 삭제면 저자소개로 돌아가기
            if (this.$route.params.id) {
              this.$router.push("timeline");
            } else {
              this.bookInfo.content.splice(idx, 1);
              window.$("#flipbook").turn("page", 3);
            }
          },
          (err) => {
            console.error(err);
            alert("삭제 실패하였습니다. 다시 시도해주세요");
          }
        );
      }
      this.dialog = false;
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
        console.log("bookInfo.content 갯수");
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
            this.timechapter.id = this.$route.params.id;
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
            console.log("timechapter");
            console.log(this.timechapter);
            this.info = res.data.content;
            this.cutPage();
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
    async getInfo() {
      if (this.$route.params.id) {
        // 타임라인 진입 시
        console.log("timelineRead");
        this.timelineRead();
      } else if (this.$route.params.status === "PAST") {
        // 메인 -> 과거책으로 진입
        await readPastBook(
          (res) => {
            console.log("mainRead");
            console.log("책정보받기");
            console.log(res.data);
            this.bookInfo = res.data;
            // this.$set(this.bookInfo, "content", res.data);
            // console.log(this.bookInfo);
          },
          (err) => console.error(err)
        );
        if (this.bookInfo.list) {
          this.years = Object.keys(this.bookInfo.list);
        }

        this.mainRead(3);
      } else if (this.$route.params.status === "FUTURE") {
        // 메인 -> 미래책으로 진입
        await readFutureBook(
          (res) => {
            console.log("mainRead");
            console.log("책정보받기");
            console.log(res.data);
            this.bookInfo = res.data;
            // this.$set(this.bookInfo, "content", res.data);
            // console.log(this.bookInfo);
          },
          (err) => console.error(err)
        );
        if (this.bookInfo.list) {
          this.years = Object.keys(this.bookInfo.list);
        }

        this.mainRead(3);
      } else {
        // 보관함에서 진입, woori가 코드 작성할 부분
      }
    },
  },
  mounted() {
    this.getInfo();
  },
  created() {
    console.log(this.$route.params)
  },
};
</script>

<style scoped>
@import "../../assets/css/ReadPast.css";
</style>
