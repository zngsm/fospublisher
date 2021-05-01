<template>
  <v-col>
    <v-row class="justify-center mb-2">
      <v-avatar v-if="!isSelected" size="15vh">
        <img src="../../assets/member/default.png" />
      </v-avatar>
      <v-avatar v-else size="15vh">
        <img :src="url" />
      </v-avatar>
    </v-row>
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
  </v-col>
</template>

<script>
import { uploadProfile } from "@/api/account";

export default {
  data: () => ({
    url: "",
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
    onFileChange(file) {
      if (!file) {
        return;
      } else {
        let imgFile = new FormData();
        imgFile.append("imgFile", this.image);

        uploadProfile(imgFile, (res) => {
          if (res.status == 200) {
            this.url = res.data.imgUrl;
            this.isSelected = true;
            this.$emit("sendImg", this.url);
          }
        });
      }
    },
  },
};
</script>