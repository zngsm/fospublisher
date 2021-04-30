<template>
  <v-container>
    <v-row>
      <v-select
        v-if="isRequired"
        :items="items"
        label="* 비밀번호 찾기 질문"
      ></v-select>
      <v-select v-else :items="items" label="비밀번호 찾기 질문"></v-select>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MessageModal",
  props: {
    isRequired: {
      type: Boolean,
      require: false,
    },
  },
  data: () => ({
    items: [
      "기억에 남는 추억의 장소는?",
      "자신의 인생 좌우명은?",
      "자신의 보물 제 1호는?",
      "가장 기억에 남는 선생님 성함은?",
      "타인이 모르는 자신만의 신체비밀이 있다면?",
      "추억하고 싶은 날짜가 있다면?",
      "받았던 선물 중 기억에 남는 독특한 선물은?",
      "유년시절 가장 생각나는 친구 이름은?",
      "인상 깊게 읽은 책 이름은?",
      "읽은 책 중에서 좋아하는 구절이 있다면?",
      "자신이 두번째로 존경하는 인물은?",
      "친구들에게 공개하지 않은 어릴 적 별명이 있다면?",
      "초등학교 때 기억에 남는 짝꿍 이름은?",
      "다시 태어나면 되고 싶은 것은?",
      "내가 좋아하는 캐릭터는?",
    ],
  }),
};
</script>