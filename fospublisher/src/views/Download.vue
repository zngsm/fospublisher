<template>
  <div>
    <div class="download-navbar">
      <div class="download-navbar-logo" @click="goToWeb">
        <img width="100%" src="@/assets/logo.png" alt="" />
      </div>
      <div class="download-navbar-btn">
        <div class="page-btn page-title-bold" @click="goPage(2)">서비스</div>
        <div class="page-btn page-title-bold" @click="goPage(4)">기능소개</div>
        <div class="page-btn page-title-bold" @click="goPage(14)">
          개발자소개
        </div>
        <div class="page-btn page-title-bold" @click="goToAppDown">
          다운로드
        </div>
      </div>
    </div>
    <div class="download-header">
      <video class="download-header-video" width="100%" muted autoplay loop>
        <source src="../assets/video/Train.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="download-header-shadow"></div>
    <div class="download-body">
      <div class="download-book" id="flipbook">
        <div class="hard">
          <div class="hard-title">역전기록소</div>
          <img width="100%" :src="require('@/assets/covers/3.png')" alt="" />
        </div>
        <div class="hard">
          <img width="100%" :src="require('@/assets/covers/3.png')" alt="" />
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-center">
              <div class="page-title">역전기록소 소개</div>
              <div class="page-subcontent">
                <p>생애의 순간부터 지금 이 순간까지</p>
                <p>지금 이 순간부터 미래의 어느날까지</p>
                <p>당신의 여정을 기록하세요</p>
                <br />
                <div class="page-content-btn">
                  <v-btn @click="goToWeb"> 웹으로 시작</v-btn>
                  <v-btn @click="goToAppDown"> 다운로드</v-btn>
                </div>
              </div>
            </div>
            <div class="page-footer">
              <p>
                주의: 현재 setup 파일은 인증이 완료되지 않아 다운로드시 주의
                문구가 표시될 수 있습니다.
              </p>
              <p>
                보안상 위험없이 제작된 파일로 경고창 표시시 계속 진행을
                클릭하시면 원활한 다운로드가 가능합니다.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-title">주요 서비스</div>
            <div class="page-content text-left">
              <p class="page-btn">1. 오늘의 질문</p>
              <p class="page-btn" @click="goPage(7)">2. 과거 자서전 작성</p>
              <p class="page-btn" @click="goPage(9)">3. 미래 자서전 작성</p>
              <p class="page-btn" @click="goPage(11)">4. 인생 여정의 연표</p>
              <p class="page-btn" @click="goPage(13)">5. 추출 및 공유 기능</p>
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-title">오늘의 질문</div>
            <div class="page-content">
              <img
                width="70%"
                :src="require('@/assets/service/question2.png')"
                alt=""
              />
            </div>
            <div class="page-subcontent">
              <p>100여가지의 다양한 질문이 매일매일 새롭게 주어집니다.</p>
              <p>질문을 보며 당신의 여정을 떠올리고 기록하세요</p>
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-title">과거 자서전 작성</div>
            <div class="page-content">
              <p>과거 당신의 여정을 글로 남겨보세요</p>
              <p>과거의 기록들은 하나의 책으로 완성됩니다.</p>
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-content">
              <img
                width="100%"
                :src="require('@/assets/service/create.png')"
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-title">미래 자서전 작성</div>
            <div class="page-content">
              <p>앞으로의 여정을 상상하며 작성해보세요</p>
              <p>
                미래의 그 시간이 도래했을 때
              </p>
              <p>과거로부터의 기록을 확인할 수 있습니다.</p>
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-content">
              <img
                width="100%"
                :src="require('@/assets/service/future.png')"
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-title">인생 연표</div>
            <div class="page-content">
              <p>자신만의 인생 여정을 한 눈에 볼 수 있습니다.</p>
              <p></p>
              <p>편집기능을 통해 순서를 재배치할 수 있습니다.</p>
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-content">
              <img
                width="100%"
                :src="require('@/assets/service/timeline.png')"
                alt=""
              />
              <img
                width="60%"
                :src="require('@/assets/service/timeline_edit.png')"
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-title">공유</div>
            <div class="page-content">
              <p>가족 및 친구들을 찾아 추가해보세요</p>
              <p>
                나의 자서전을 친구와 공유할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-content">
              <img
                width="100%"
                :src="require('@/assets/service/library.png')"
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          <div class="page-container-center">
            <div class="page-title">Developed By</div>
            <div class="page-content">
              <p>
                김문정(FE)
              </p>
              <p>
                윤지해(FE)
              </p>
              <p>
                이동훈(BE)
              </p>
              <p>
                장수민(BE)
              </p>
              <p>
                조우리(FE)
              </p>
              <p>문의 : 201publisher@gmail.com</p>
            </div>
          </div>
        </div>

        <div class="hard">
          <img width="100%" :src="require('@/assets/covers/3.png')" alt="" />
        </div>
        <div class="hard">
          <img width="100%" :src="require('@/assets/covers/3.png')" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Download",
  data() {
    return {};
  },
  mounted() {
    window.$("#flipbook").turn({
      width: 900,
      height: 675,
      gradients: true,
      autoCenter: true,
    });
  },
  methods: {
    goPage(p) {
      window.$("#flipbook").turn("page", p);
    },
    goToWeb() {
      location.replace("https://k4b201.p.ssafy.io");
    },
    goToAppDown() {
      window.location =
        "https://autobiography.s3.ap-northeast-2.amazonaws.com/fospublisher+Setup+0.1.0.exe";
    },
  },
};
</script>

<style scoped>
.download-navbar {
  width: 100%;
  position: sticky;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}
.download-navbar-logo {
  width: 80px;
  margin-left: 20px;
  cursor: pointer;
}
.download-navbar-btn {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  margin-left: 30px;
}
.download-header {
  overflow: hidden;
  height: 800px;
}
.download-header-video {
  overflow: hidden;
}
.download-header-shadow {
  position: absolute;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  top: 100px;
  height: 800px;
  width: 100%;
}
.download-body {
  position: absolute;
  width: 100%;
  top: 180px;
  z-index: 30;
}

.download-body-book {
  width: 300px;
  height: 450px;
  background-color: white;
}
.hard-title {
  position: absolute;
  z-index: 2;
  color: #e6b677;
  font-size: 25px;
  left: 38%;
  top: 30%;
}
.page-container {
  padding: 70px 40px;
  height: 100%;
}
.page-container-center {
  padding: 70px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.page-center {
}
.page-title {
  font-size: 25px;
  font-weight: bold;
}
.page-content {
  margin: 40px 0px;
  text-align: center;
  font-size: 20px;
}
.page-subcontent {
  text-align: left;
  margin-top: 40px;
}
.page-content-btn {
  display: flex;
  justify-content: space-evenly;
}
.page-btn {
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
}
.page-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.page-footer {
  position: absolute;
  bottom: 40px;
  text-align: left;
  font-size: 8px;
  color: red;
}
.page-footer > p {
  margin: 0;
}
</style>
