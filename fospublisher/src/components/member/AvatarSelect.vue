<template>
  <v-col>
    <v-row class="justify-center mb-2">
      <!-- 기본이미지 & 원형(회원가입) -->
      <div v-if="!editInfo">
        <v-avatar v-if="!isSelected" size="150px">
          <img
            src="../../assets/member/default.png"
            alt="프로필 사진"
            style="object-fit: cover"
          />
        </v-avatar>
        <v-avatar v-else size="150px">
          <img :src="url" alt="프로필 사진" style="object-fit: cover" />
        </v-avatar>
      </div>
      <!-- DB 나의 프로필 & 타일형 -->
      <div v-else>
        <v-avatar tile v-if="!isSelected" size="150px">
          <img
            v-if="!otherUser"
            :src="origin"
            alt="프로필 사진"
            style="object-fit: cover"
          />
          <img
            v-else
            :src="otherImage"
            alt="프로필 사진"
            style="object-fit: cover"
          />
        </v-avatar>
        <v-avatar tile v-else size="150px">
          <img :src="url" alt="프로필 사진" style="object-fit: cover" />
        </v-avatar>
      </div>
    </v-row>
    <!-- input창 보임(회원가입) -->
    <div v-if="!editInfo">
      <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        append-icon="mdi-camera-outline"
        prepend-icon=""
        placeholder="선택된 파일 없음"
        label="프 로 필 사 진"
        v-model="image"
        @change="onFileChange"
      >
      </v-file-input>
    </div>
    <!-- 아이콘 형태의 input창 -->
    <div v-else class="align-content--center justify-content-center my-3">
      <v-row justify="center">
        <!-- editMode에서만 보임 -->
        <div v-if="withEdit">
          <div class="justify-center align-center text-center">
            <v-file-input
              :rules="rules"
              hide-input
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera-outline"
              v-model="image"
              @change="onFileChange"
            >
            </v-file-input>
          </div>
        </div>
      </v-row>
    </div>
  </v-col>
</template>

<script>
import { uploadProfile, checkUserInfo } from "@/api/account";
export default {
  name: "AvatarSelect",
  props: {
    editInfo: {
      type: Boolean,
      require: false,
      default: false,
    },
    otherImage: {
      type: String,
      require: false,
      default: null,
    },
    otherUser: {
      type: Boolean,
      require: false,
      default: false,
    },
    withEdit: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data: () => ({
    url: "",
    origin: "",
    image: undefined,
    isSelected: false,
    rules: [
      (file) =>
        !file ||
        file.size < 1000000 ||
        "이미지 파일은 10 MB 이하만 사용가능합니다!",
    ],
  }),
  methods: {
    // 선택한 이미지로 변경 & parent로 url 전송
    onFileChange(file) {
      if (!file) {
        return;
      } else {
        let imgFile = new FormData();
        imgFile.append("imgFile", this.image);

        uploadProfile(
          imgFile,
          (res) => {
            if (res.status === 200) {
              this.url = res.data.imgUrl;
              this.isSelected = true;
              this.$emit("sendImg", this.url);
            }
          },
          () => {
            return;
          }
        );
      }
    },
  },
  mounted() {
    // 회원정보 수정 시 기존 이미지 불러오기
    if (this.editInfo) {
      checkUserInfo(
        (res) => {
          if (res.status === 200) {
            this.origin = res.data.user.img;
          }
        },
        () => {
          return;
        }
      );
    }
  },
};
</script>