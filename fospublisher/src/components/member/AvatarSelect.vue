<template>
  <v-col>
    <v-row class="justify-center my-6">
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
export default {
  // 사진파일 사이즈 제한 있는지 확인 필요
  data() {
    return {
      url: "",
      image: undefined,
      isSelected: false,
      rules: [
        (file) =>
          !file ||
          file.size < 2000000 ||
          "이미지 파일은 2 MB 이하만 사용가능합니다!",
      ],
    };
  },
  methods: {
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.url = URL.createObjectURL(this.image);
      this.isSelected = true;
    },
  },
};
</script>