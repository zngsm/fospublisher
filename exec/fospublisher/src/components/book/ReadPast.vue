<template>
  <div>
    <Navbar />
    <!-- 책클릭 -> 읽기모드 -->
    <div style="width:100%; height:60px;"><span></span></div>
    <div
      v-if="!this.$route.params.id || this.$route.query.userId"
      id="flipbook"
    >
      <div class="hard" style="display: flex; justify-content: center;">
        <div
          v-if="bookInfo.cover.font == 0"
          class="bookTitle member-kukde-light"
          :style="
            `color: ${bookInfo.cover.font_color}; fontSize: ${35 +
              5 * bookInfo.cover.size}px;`
          "
        >
          {{ bookInfo.cover.title }}
        </div>
        <div
          v-else
          class="bookTitle member-kwandong"
          :style="
            `color: ${bookInfo.cover.font_color}; fontSize: ${35 +
              5 * bookInfo.cover.size}px;`
          "
        >
          {{ bookInfo.cover.title }}
        </div>
        <img
          :src="require(`@/assets/covers/${bookInfo.cover.skin}.png`)"
          width="100%"
          alt="picture"
        />
      </div>
      <div class="hard">
        <WriterInfo />
      </div>
      <div v-if="!this.$route.query.userId" class="read-select">
        <SelectMode
          @read="read"
          :cover="bookInfo.cover"
          :book="bookInfo"
        ></SelectMode>
      </div>
      <div>
        <div class="book-content">
          <h1 class="read-index-title">목차</h1>
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
                      <b
                        style="display: inline-block;width: 200px; white-space:nowrap; text-overflow: ellipsis; overflow:hidden;"
                        >{{ item.title }}</b
                      >
                    </p>
                  </div>
                  <div v-if="!$route.query.userId">
                    <p>{{ item.pageStart + 5 }} 쪽</p>
                  </div>
                  <div v-else>
                    <p>{{ item.pageStart + 4 }} 쪽</p>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
      <!-- 메인 -> 읽기모드  -->
      <div v-for="(item, idx) in bookInfo.content" :key="idx">
        <div class="read-button-box">
          <button v-if="!$route.query.userId" @click="modifyChapter(item)">
            <v-icon large color="black">mdi-file-document-edit-outline</v-icon>
            <p>수정</p>
          </button>
          <button
            v-if="!$route.query.userId"
            @click="deleteModal(item.id, idx)"
          >
            <v-icon large color="black">mdi-delete-forever-outline</v-icon>
            <p>삭제</p>
          </button>
        </div>
        <div class="read-title-box">
          <h1 class="read-title">{{ item.title }}</h1>
        </div>
      </div>
      <div class="hard"></div>
      <div class="hard">
        <img
          :src="require(`@/assets/covers/${bookInfo.cover.skin}.png`)"
          width="100%"
          alt="picture"
          class="lastImage"
        />
      </div>
    </div>
    <!-- 타임라인 -> 읽기모드 -->
    <div v-else id="flipbook">
      <div>
        <div class="hard"></div>
      </div>
      <div>
        <div class="read-button-box">
          <button @click="modifyChapter(timechapter)">
            <v-icon large color="black">mdi-file-document-edit-outline</v-icon>
            <p>수정</p>
          </button>
          <button @click="deleteModal(timechapter.id)">
            <v-icon large color="black">mdi-delete-forever-outline</v-icon>
            <p>삭제</p>
          </button>
        </div>
        <div class="read-title-box">
          <h1 class="read-title">{{ timechapter.title }}</h1>
        </div>
      </div>
      <div v-for="(item, idx) in temp" :key="idx">
        <div class="book-content">
          <p v-html="item"></p>
        </div>
      </div>

      <div class="hard"></div>
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
import { getEachFollowerBook } from "@/api/follow";
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
          title: "",
          skin: 0,
          font_color: "",
          size: "",
        },
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
      status: null,
      currentId: null,
      currentIdx: null,
      dialog: false,
      years: null,
      temp: ["", "", "", "", ""],
      info: "",
    };
  },
  methods: {
    read() {
      window.$("#flipbook").turn("next");
    },
    goPage(p) {
      if (this.$route.query.userId) {
        let pageNum = p + 4;
        window.$("#flipbook").turn("page", pageNum);
      } else {
        let pageNum = p + 5;
        window.$("#flipbook").turn("page", pageNum);
      }
    },
    modifyChapter(data) {
      let chapter = data;
      let status = localStorage.getItem("read/status");
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
      this.dialog = true;
      this.currentId = id;
      this.currentIdx = idx;
    },
    deleteChapter() {
      let id = this.currentId;
      let idx = this.currentIdx;
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
      // 메인-읽기가 아닌 경우, 페이지네이션
      if (this.$route.params.id) {
        this.temp = this.info.split(
          '<div class="html2pdf__page-break" position:="" relative;"=""></div>'
        );
        this.mainRead(3);
      }
    },
    mainRead(num) {
      setTimeout(() => {
        window.$("#flipbook").turn({
          width: 1026,
          height: 670,
          page: num,
          // pages: 45,
          gradients: true,
          autoCenter: true,
        });
      }, 100); // 바뀐 bookInfo.content 반영을 위해 setTimeout

      // 메인-읽기인 경우, 페이지네이션
      if (!this.$route.params.id) {
        // 총페이지수 계산하기
        let totalPageNum = 5;
        totalPageNum =
          totalPageNum + this.info.length + this.bookInfo.cover.page;

        setTimeout(() => {
          window.$("#flipbook").turn("pages", totalPageNum + 5); // 전체페이지 설정
          let titlePageNum = 6;

          for (let i = 0; i < this.info.length; i++) {
            // let titlePageNum = i + 6;
            let chapterList = this.info[i].content.split(
              '<div class="html2pdf__page-break" position:="" relative;"=""></div>'
            );

            for (let j = 0; j < chapterList.length; j++) {
              let page = titlePageNum + j;
              if (chapterList[j] === "") {
                // 공백인 장 지우기?
                continue;
              }
              let element = window
                .$("<div />")
                .html('<div class="book-content">' + chapterList[j] + "</div>");
              // let element = window.$("<div />").html("");
              // element.addClass(j);
              window.$("#flipbook").turn("addPage", element, page);
              // let parent = document.getElementsByClassName(j);
              // // parent.innerHTML = "<h1>가</h1>";
              // let child = document.createElement("div");
              // child.classList.add("child");
              // child.innerHTML = chapterList[j];
              // parent.append(child);
            }
            titlePageNum = titlePageNum + chapterList.length + 1;
          }
        }, 200);
      }
    },
    async timelineRead() {
      if (this.$route.params.status === "PAST") {
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
    async getInfo() {
      if (this.$route.params.id) {
        // 타임라인 진입 시
        this.timelineRead();
      } else if (this.status === "PAST") {
        // 메인 -> 과거책으로 진입
        await readPastBook(
          (res) => {
            this.bookInfo = res.data;
            this.years = Object.keys(res.data.list);
            this.info = res.data.content;
            this.mainRead(3);
          },
          (err) => console.error(err)
        );
      } else if (this.status === "FUTURE") {
        // 메인 -> 미래책으로 진입
        await readFutureBook(
          (res) => {
            this.bookInfo = res.data;
            this.info = res.data.content;
            this.years = Object.keys(res.data.list);
            this.mainRead(3);
          },
          (err) => console.error(err)
        );
        // this.mainRead(3);
      } else {
        // 보관함에서 진입
        await getEachFollowerBook(
          this.$route.query.userId,
          (res) => {
            this.bookInfo = res.data;
            this.years = Object.keys(res.data.list);
          },
          (error) => {
            console.log(error);
          }
        );
        this.mainRead(3);
      }
    },
  },
  created() {
    if (this.$route.params.status) {
      this.status = this.$route.params.status;
      localStorage.setItem("read/status", this.$route.params.status);
    } else {
      this.status = localStorage.getItem("read/status");
    }
    if (this.$route.query.userId) {
      this.status = localStorage.setItem("read/status", "library");
    }
    this.getInfo();
  },
};
</script>

<style scoped>
@import "../../assets/css/ReadPast.css";
.bookTitle {
  position: absolute;
  top: 100px;
  font-size: 30px;
}
.even > .lastImage {
  height: 100%;
  transform: scaleX(-1);
}
.odd > .lastImage {
  height: 100%;
}
</style>
