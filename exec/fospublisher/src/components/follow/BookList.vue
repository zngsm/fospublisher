<template>
  <div>
    <div class="slider">
      <input
        v-for="(num, index) in bookNum - 1"
        :key="index"
        type="radio"
        class="testimonial"
        name="testimonial"
        :id="`t-${num}`"
      />
      <input
        type="radio"
        class="testimonial"
        name="testimonial"
        :id="`t-${bookNum}`"
        checked
      />
      <div class="testimonials">
        <label
          v-for="(info, index) in bookInfo"
          :key="index"
          :class="`item book t-${index + 1}`"
          :for="`t-${index + 1}`"
        >
          <div class="back">
            <img
              :src="require(`@/assets/covers/${info.book.skin}.png`)"
              alt="picture"
            />
          </div>
          <div class="page6 d-flex justify-center">
            <div class="bookBtn">
              <div style="display: block">{{ info.nickname }}님의</div>
              <v-btn color="#231815" small outlined @click="goReadPast(info.id)"
                >자서전 보러가기</v-btn
              >
            </div>
          </div>
          <div class="page5">
            <v-list-item-avatar size="100px" class="profile">
              <v-img :src="info.img"></v-img>
            </v-list-item-avatar>
          </div>
          <div class="page4"></div>

          <div class="page3"></div>
          <div class="page2"></div>
          <div class="page1"></div>
          <div class="front">
            <div
              v-if="info.book.font == 0"
              class="bookTitle member-kukde-light"
              :style="`color: ${info.book.font_color}; fontSize: ${
                20 + 5 * info.book.size
              }px;`"
            >
              {{ info.book.title }}
            </div>
            <div
              v-else
              class="bookTitle member-kwandong"
              :style="`color: ${info.book.font_color}; fontSize: ${
                20 + 5 * info.book.size
              }px;`"
            >
              {{ info.book.title }}
            </div>
            <img
              :src="require(`@/assets/covers/${info.book.skin}.png`)"
              alt="picture"
            />
          </div>
        </label>
      </div>
      <div class="dots">
        <label
          v-for="(num, index) in bookNum"
          :key="index"
          :for="`t-${num}`"
        ></label>
      </div>
    </div>
  </div>
</template>

<script>
import { getEachFollowerList } from "@/api/follow";

export default {
  data() {
    return {
      bookNum: 1,
      bookInfo: {},
    };
  },
  computed: {
    getBookListState() {
      return this.$store.getters["book/getBookListState"];
    },
  },
  methods: {
    goReadPast(id) {
      this.$router
        .push({ name: "ReadPast", query: { userId: id } })
        .catch((err) => {
          if (err.name === "NavigationDuplicated") {
            location.reload();
          }
        });
    },
    getList() {
      getEachFollowerList(
        (res) => {
          if (res.data[0] > 0) {
            this.bookNum = res.data[this.$route.params.id].length;
            this.bookInfo = res.data[this.$route.params.id];
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    setTimeout(function () {
      document.getElementsByClassName("testimonial").forEach(function (item) {
        if (item.checked === true) {
          if (document.getElementsByClassName(item.id)[0]) {
            document
              .getElementsByClassName(item.id)[0]
              .classList.toggle("bookHover");
          }
        }
        item.addEventListener("change", function () {
          document.getElementsByClassName("item").forEach(function (book) {
            if (book.classList[2] == item.id) {
              book.classList.add("bookHover");
            } else {
              book.classList.remove("bookHover");
            }
          });
        });
      });
    }, 300);
  },
  created() {
    this.getList();
  },
  watch: {
    getBookListState() {
      if (this.getBookListState == true) {
        this.getList();
        this.$store.dispatch("book/updateBookList");
      }
    },
  },
};
</script>
<style scoped>
.slider {
  width: 100%;
}
.slider input {
  display: none;
}
.testimonials {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 600px;
  perspective: 1000px;
  overflow: hidden;
}
.testimonials .item {
  position: absolute;
  text-align: center;
  transition: transform 0.4s;
  user-select: none;
  cursor: pointer;
}
.testimonials .item img {
  height: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 220px;
  border-bottom-right-radius: 1em;
  border-top-right-radius: 1em;
  -webkit-box-reflect: below 5px
    linear-gradient(transparent, transparent, #0004);
}
.testimonials .item .front div {
  position: absolute;
  top: 15%;
  margin: 0 auto;
  font-size: 18px;
  z-index: 10;
}

.dots {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dots label {
  display: block;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #413b52;
  margin: 7px;
  transition: transform 0.2s, color 0.2s;
}

/* First */
#t-1:checked ~ .dots label[for="t-1"] {
  transform: scale(2);
  background-color: #fff;
}
#t-1:checked ~ .dots label[for="t-2"] {
  transform: scale(1.5);
}
#t-1:checked ~ .testimonials label[for="t-1"] {
  z-index: 4;
}
#t-1:checked ~ .testimonials label[for="t-2"] {
  transform: translateX(300px) translateZ(-90px) rotateY(-15deg);
  z-index: 3;
}
#t-1:checked ~ .testimonials label[for="t-3"] {
  transform: translateX(600px) translateZ(-180px) rotateY(-25deg);
  z-index: 2;
}
#t-1:checked ~ .testimonials label[for="t-4"] {
  transform: translateX(900px) translateZ(-270px) rotateY(-35deg);
  z-index: 1;
}
#t-1:checked ~ .testimonials label[for="t-5"] {
  transform: translateX(1200px) translateZ(-360px) rotateY(-45deg);
}

/* Second */
#t-2:checked ~ .dots label[for="t-1"] {
  transform: scale(1.5);
}
#t-2:checked ~ .dots label[for="t-2"] {
  transform: scale(2);
  background-color: #fff;
}
#t-2:checked ~ .dots label[for="t-3"] {
  transform: scale(1.5);
}
#t-2:checked ~ .testimonials label[for="t-1"] {
  transform: translateX(-300px) translateZ(-90px) rotateY(15deg);
}
#t-2:checked ~ .testimonials label[for="t-2"] {
  z-index: 3;
}
#t-2:checked ~ .testimonials label[for="t-3"] {
  transform: translateX(300px) translateZ(-90px) rotateY(-15deg);
  z-index: 2;
}
#t-2:checked ~ .testimonials label[for="t-4"] {
  transform: translateX(600px) translateZ(-180px) rotateY(-25deg);
  z-index: 1;
}
#t-2:checked ~ .testimonials label[for="t-5"] {
  transform: translateX(900px) translateZ(-270px) rotateY(-35deg);
}

/* Third */
#t-3:checked ~ .dots label[for="t-2"] {
  transform: scale(1.5);
}
#t-3:checked ~ .dots label[for="t-3"] {
  transform: scale(2);
  background-color: #fff;
}
#t-3:checked ~ .dots label[for="t-4"] {
  transform: scale(1.5);
}
#t-3:checked ~ .testimonials label[for="t-1"] {
  transform: translateX(-600px) translateZ(-180px) rotateY(25deg);
}
#t-3:checked ~ .testimonials label[for="t-2"] {
  transform: translateX(-300px) translateZ(-90px) rotateY(15deg);
}
#t-3:checked ~ .testimonials label[for="t-3"] {
  z-index: 3;
}
#t-3:checked ~ .testimonials label[for="t-4"] {
  transform: translateX(300px) translateZ(-90px) rotateY(-15deg);
  z-index: 2;
}
#t-3:checked ~ .testimonials label[for="t-5"] {
  transform: translateX(600px) translateZ(-180px) rotateY(-25deg);
}

/* Fourth */
#t-4:checked ~ .dots label[for="t-3"] {
  transform: scale(1.5);
}
#t-4:checked ~ .dots label[for="t-4"] {
  transform: scale(2);
  background-color: #fff;
}
#t-4:checked ~ .dots label[for="t-5"] {
  transform: scale(1.5);
}
#t-4:checked ~ .testimonials label[for="t-1"] {
  transform: translateX(-900px) translateZ(-270px) rotateY(35deg);
}
#t-4:checked ~ .testimonials label[for="t-2"] {
  transform: translateX(-600px) translateZ(-180px) rotateY(25deg);
}
#t-4:checked ~ .testimonials label[for="t-3"] {
  transform: translateX(-300px) translateZ(-90px) rotateY(15deg);
  z-index: 2;
}
#t-4:checked ~ .testimonials label[for="t-4"] {
  z-index: 3;
}
#t-4:checked ~ .testimonials label[for="t-5"] {
  transform: translateX(300px) translateZ(-90px) rotateY(-15deg);
}

/* Fifth */
#t-5:checked ~ .dots label[for="t-4"] {
  transform: scale(1.5);
}
#t-5:checked ~ .dots label[for="t-5"] {
  transform: scale(2);
  background-color: #fff;
}
#t-5:checked ~ .testimonials label[for="t-1"] {
  transform: translateX(-1200px) translateZ(-360px) rotateY(45deg);
}
#t-5:checked ~ .testimonials label[for="t-2"] {
  transform: translateX(-900px) translateZ(-270px) rotateY(35deg);
  z-index: 1;
}
#t-5:checked ~ .testimonials label[for="t-3"] {
  transform: translateX(-600px) translateZ(-180px) rotateY(25deg);
  z-index: 2;
}
#t-5:checked ~ .testimonials label[for="t-4"] {
  transform: translateX(-300px) translateZ(-90px) rotateY(15deg);
  z-index: 3;
}
#t-5:checked ~ .testimonials label[for="t-5"] {
  z-index: 4;
}

.book {
  transform-style: preserve-3d;
  position: relative;
  height: 300px;
  cursor: pointer;
  backface-visibility: visible;
}

.front,
.back,
.page1,
.page2,
.page3,
.page4,
.page5,
.page6 {
  transform-style: preserve-3d;
  position: absolute;
  width: 210px;
  height: 300px;
  top: 0;
  left: 0;
  transform-origin: left center;
  transition: transform 0.5s ease-in-out, box-shadow 0.35s ease-in-out;
  display: flex;
  justify-content: center;
}

.front,
.page1,
.page3,
.page5 {
  border-bottom-right-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

.back,
.page2,
.page4,
.page6 {
  border-bottom-right-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

.page1 {
  background: #efefef;
}

.page2 {
  background: #efefef;
}

.page3 {
  background: #f5f5f5;
}

.page4 {
  background: #f5f5f5;
}

.page5 {
  background: #fafafa;
}

.page6 {
  background: #fdfdfd;
}

.book .bookBtn {
  z-index: 10;
  position: absolute;
  top: 120px;
}
.book .profile {
  position: absolute;
  top: 80px;
  left: 60px;
}
.bookHover:hover .front {
  transform: rotateY(-160deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.bookHover:hover .page1 {
  transform: rotateY(-150deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.bookHover:hover .page2 {
  transform: rotateY(-30deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.bookHover:hover .page3 {
  transform: rotateY(-140deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.bookHover:hover .page4 {
  transform: rotateY(-40deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.bookHover:hover .page5 {
  transform: rotateY(-130deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.bookHover:hover .page6 {
  transform: rotateY(-50deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.2);
}

.bookHover:hover .back {
  transform: rotateY(-20deg) scale(1.1);
}
</style>