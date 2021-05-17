<template>
  <div>
    <Navbar />
    <v-tabs
      v-model="tab"
      background-color="black"
      class="pa-0"
      centered
      dark
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        첫 번째 서랍
      </v-tab>

      <v-tab href="#tab-2">
        두 번째 서랍
      </v-tab>

      <v-tab href="#tab-3">
        세 번째 서랍
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card color="#f5f4ee" flat>
          <!-- <v-card-text>{{ text }}</v-card-text> -->
        </v-card>
      </v-tab-item>
    </v-tabs-items>



    <div class="slider">
      <input type="radio" name="testimonial" id="t-1">
      <input type="radio" name="testimonial" id="t-2">
      <input type="radio" name="testimonial" id="t-3">
      <input type="radio" name="testimonial" id="t-4">
      <input type="radio" name="testimonial" id="t-5" checked>
      <div class="testimonials">
        <label class="item book t-1" for="t-1">
          <div class="back"><img src="../assets/covers/AnyConv.com__diary.png" alt="picture"></div>
          <div class="page6 d-flex justify-center">
            <v-btn color="#231815" small outlined class="bookBtn">자서전 보러가기</v-btn>
          </div>
          <div class="page5"></div>
          <div class="page4"></div>
          
          <div class="page3"></div>
          <div class="page2"> </div>
          <div class="page1"></div>
          <div class="front">
            <p>Description 1</p>
            <img src="../assets/covers/AnyConv.com__diary.png" alt="picture">
          </div>
        </label>
        <label class="item book t-2" for="t-2">
          <div class="back"><img src="../assets/covers/AnyConv.com__goldFrame.png" alt="picture"></div>
          <div class="page6 d-flex justify-center">
            <v-btn small color="#231815" outlined class="bookBtn">자서전 보러가기</v-btn>
          </div>
          <div class="page5"></div>
          <div class="page4"></div>
          <div class="page3"></div>
          <div class="page2"></div>
          <div class="page1"></div>
          <div class="front">
            <p>Description 2</p> 
            <img src="../assets/covers/AnyConv.com__goldFrame.png" alt="picture">
          </div>
        </label>
        <label class="item book t-3" for="t-3">
          <div class="back"><img src="../assets/covers/AnyConv.com__soft.png" alt="picture"></div>
          <div class="page6 d-flex justify-center">
            <v-btn small color="#231815" outlined class="bookBtn">자서전 보러가기</v-btn>
          </div>
          <div class="page5"></div>
          <div class="page4"></div>
          <div class="page3"></div>
          <div class="page2"></div>
          <div class="page1"></div>
          <div class="front">
            <p>Description 3</p>
            <img src="../assets/covers/AnyConv.com__soft.png" alt="picture">
          </div>
        </label>
        <label class="item book t-4" for="t-4">
          <div class="back"><img src="../assets/covers/flower.png" alt="picture"></div>
          <div class="page6 d-flex justify-center">
            <v-btn small color="#231815" outlined class="bookBtn">자서전 보러가기</v-btn>
          </div>
          <div class="page5"></div>
          <div class="page4"></div>
          <div class="page3"></div>
          <div class="page2"></div>
          <div class="page1"></div>
          <div class="front">
            <p>Description 4</p>
            <img src="../assets/covers/flower.png" alt="picture">
          </div>
        </label>
        <label class="item book t-5" for="t-5">
          <div class="back"><img src="../assets/covers/bagediary.png" alt="picture"></div>
          <div class="page6 d-flex justify-center">
            <v-btn small color="#231815" outlined class="bookBtn">자서전 보러가기</v-btn>
          </div>
          <div class="page5"></div>
          <div class="page4"></div>
          <div class="page3"></div>
          <div class="page2"></div>
          <div class="page1"></div>
          <div class="front">
            <p>Description 5</p>
            <img src="../assets/covers/bagediary.png" alt="picture">
          </div>
        </label>
      </div>
      <div class="dots">
        <label for="t-1"></label>
        <label for="t-2"></label>
        <label for="t-3"></label>
        <label for="t-4"></label>
        <label for="t-5"></label>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/main/Navbar.vue";
import { getEachFollowerList } from "@/api/follow";


export default {
  components: {
    Navbar
  },
  data() {
    return {
      tab: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  methods: {
    test(event) {
      console.log(event)
    }
  },
  mounted() {
    // console.log(document.getElementsByName('testimonial'))
    document.getElementsByName('testimonial').forEach(function(item) {
      // console.log(item.checked)
      if (item.checked == true) {
        document.getElementsByClassName(item.id)[0].classList.add('bookHover')
      }
      item.addEventListener('change', function(){
        document.getElementsByClassName('item').forEach(function(book) {
          if (book.classList[2] == item.id) {
            book.classList.add('bookHover')
          } else {
            book.classList.remove('bookHover')
          }
        })
      });
    })
    

  },
  created() {
    getEachFollowerList(
      (res) => {
        console.log(res)
      },
      (error) => {
        console.log(error)
      }
    )
  },
}
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
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  width: 230px;
  border-bottom-right-radius: 1em;
  border-top-right-radius: 1em;
  -webkit-box-reflect: below 5px linear-gradient(transparent, transparent, #0004);
}
.testimonials .item .front p {
  position: absolute;
  top: 15%;
  left: 30%;
  font-size: 20px;
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
  background-color: #413B52;
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

.front, .back, .page1, .page2, .page3, .page4, .page5, .page6 {
  transform-style: preserve-3d;
  position: absolute;
  width: 210px;
  height: 300px;
  top: 0; left: 0;
  transform-origin: left center;
  transition: transform .5s ease-in-out, box-shadow .35s ease-in-out;
}

.front, .page1, .page3, .page5 {
  border-bottom-right-radius: .5em;
  border-top-right-radius: .5em;
}

.back, .page2, .page4, .page6 {
  border-bottom-right-radius: .5em;
  border-top-right-radius: .5em;
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
  /* left: 150px; */
}
.bookHover:hover .front {
  transform: rotateY(-160deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.bookHover:hover .page1 {
  transform: rotateY(-150deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.bookHover:hover .page2 {
  transform: rotateY(-30deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.bookHover:hover .page3 {
  transform: rotateY(-140deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.bookHover:hover .page4 {
  transform: rotateY(-40deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.bookHover:hover .page5 {
  transform: rotateY(-130deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.bookHover:hover .page6 {
  transform: rotateY(-50deg) scale(1.1);
  box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
}

.bookHover:hover .back {
  transform: rotateY(-20deg) scale(1.1);
}
</style>