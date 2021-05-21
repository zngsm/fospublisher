<template>
  <v-container fluid class="d-flex" justify-center align-center>
    <v-col cols="10" class="align-center">
      <div v-if="!editMode" class="justify-center align-center text-center">
        <v-col>
          <v-btn
            v-if="!this.$route.query.userId"
            class="d-flex offset-9"
            fab
            x-large
            text
            @click="changeMode"
          >
            <v-col>
              <v-icon x-large>mdi-file-document-edit-outline</v-icon>
              <p class="ma-0">수정하기</p>
            </v-col>
          </v-btn>
          <avatar-select
            v-if="!this.$route.query.userId"
            editInfo
          ></avatar-select>
          <avatar-select
            v-else
            editInfo
            otherUser
            :otherImage="img"
          ></avatar-select>
          <div>{{ nickname }}</div>
          <v-divider class="ma-3"></v-divider>
          <div v-html="addEnter" class="md-col-9 text-start ma-10">
            {{ introduce }}
          </div>
        </v-col>
      </div>
      <div v-else>
        <v-row class="justify-center align-center text-center">
          <v-col cols="10">
            <avatar-select
              editInfo
              withEdit
              @sendImg="imgReceive"
            ></avatar-select>
            <v-text-field
              rounded
              outlined
              dense
              clearable
              hide-details
              label="지 은 이 명"
              v-model="nickname"
            ></v-text-field>
            <v-divider class="ma-3"></v-divider>
            <date-picker editMode @birthday="dateReceive" />
            <v-divider class="ma-3"></v-divider>
            <div class="text-start">
              <v-textarea
                clearable
                auto-grow
                rounded
                outlined
                v-model="introduce"
                label="프 로 필 소 개"
              ></v-textarea>
            </div>
            <v-row class="justify-space-around">
              <v-btn
                color="#fff"
                class="ma-5 member-btn-size"
                large
                @click="changeMode"
              >
                취소
              </v-btn>
              <v-btn
                color="#231815"
                class="ma-5 member-btn-size"
                dark
                large
                type="submit"
                @click="editUserInfo"
              >
                회원정보 변경
              </v-btn>
              <!-- Start 회원정보수정 모달 -->
              <v-dialog v-model="dialog" width="300px">
                <message-modal
                  v-if="isEdited"
                  body-content="회원정보 수정이 완료되었습니다."
                  @submit="changeMode"
                  v-click-outside="changeMode"
                />
              </v-dialog>
              <!-- End 회원정보수정 모달 -->
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import { getAuthorInfo } from "@/api/search.js";
import "../../assets/css/member.css";
import AvatarSelect from "./AvatarSelect";
import DatePicker from "./DatePicker";
import MessageModal from "../../components/MessageModal";
import { checkUserInfo, editUser } from "@/api/account";

export default {
  components: { AvatarSelect, DatePicker, MessageModal },
  data: () => ({
    editMode: false,
    dialog: false,
    isEdited: false,
    user: "",
    img: "",
    nickname: "",
    birthday: "",
    introduce: "",
    form: "",
  }),
  computed: {
    addEnter: function () {
      return this.introduce.split("\n").join("<br />");
    },
  },
  methods: {
    // 모드 수정
    changeMode() {
      this.getUserInfo();
      this.editMode = !this.editMode;
      this.dialog = false;
      this.isEdited = false;
    },
    // 이미지 component에서 받아오기
    imgReceive(img) {
      this.img = img;
    },
    // 생일 component에서 받아오기
    dateReceive(date) {
      this.birthday = date;
    },
    // 유저 정보 조회
    getUserInfo() {
      if (this.$route.query.userId) {
        getAuthorInfo(
          this.$route.query.userId,
          (res) => {
            this.user = res.data.user;
            this.img = res.data.user.img;
            this.nickname = res.data.user.nickname;
            this.birthday = res.data.user.birthday;
            this.introduce = res.data.user.introduce;
          },
          () => {
            return;
          }
        );
      } else {
        checkUserInfo(
          (res) => {
            if (res.status === 200) {
              this.user = res.data.user;
              this.img = res.data.user.img;
              this.nickname = res.data.user.nickname;
              this.birthday = res.data.user.birthday;
              this.introduce = res.data.user.introduce;
            }
          },
          () => {
            return;
          }
        );
      }
    },
    // 빈값 채우기
    fillData() {
      if (this.nickname === null || this.nickname === "") {
        this.nickname = this.user.nickname;
      }
      if (this.birthday === null || this.birth === "") {
        this.birthday = this.user.birthday;
      }
      if (this.introduce === null || this.introduce === "") {
        this.introduce = this.user.introduce;
      }
    },
    // 회원정보 수정
    editUserInfo() {
      this.fillData();
      this.form = {
        img: this.img,
        nickname: this.nickname,
        birthday: this.birthday,
        introduce: this.introduce,
      };
      editUser(
        this.form,
        (res) => {
          if (res.status === 200 || res.status === 201) {
            this.$store.commit("setUrl", this.img);
            this.dialog = true;
            this.isEdited = true;
          }
        },
        () => {
          return;
        }
      );
    },
  },
  mounted() {
    // 작가 정보 조회
    this.getUserInfo();
  },
};
</script>