<template>
  <v-container>
    <v-row>
      <v-select
        v-if="isRequired"
        :items="items"
        item-text="value"
        item-value="question"
        label="* 비밀번호 찾기 질문"
        @input="sendQuestion"
        v-model="selectedItem"
      ></v-select>
      <v-select
        v-else
        :items="items"
        item-text="value"
        item-value="question"
        label="비밀번호 찾기 질문"
        @input="sendQuestion"
        v-model="selectedItem"
      ></v-select>
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
    selectedItem: null,
    items: [
      {
        question: 0,
        value: "기억에 남는 추억의 장소는?",
      },
      {
        question: 1,
        value: "자신의 인생 좌우명은?",
      },
      {
        question: 2,
        value: "유년시절 가장 생각나는 친구 이름은?",
      },
      {
        question: 3,
        value: "인상 깊게 읽은 책 이름은?",
      },
      {
        question: 4,
        value: "읽은 책 중에서 좋아하는 구절이 있다면?",
      },
      {
        question: 5,
        value: "자신이 두번째로 존경하는 인물은?",
      },
      {
        question: 6,
        value: "친구들에게 공개하지 않은 어릴 적 별명이 있다면?",
      },
      {
        question: 7,
        value: "초등학교 때 기억에 남는 짝꿍 이름은?",
      },
      {
        question: 8,
        value: "다시 태어나면 되고 싶은 것은?",
      },
      {
        question: 9,
        value: "내가 좋아하는 캐릭터는?",
      },
      {
        question: 10,
        value: "자신의 보물 제 1호는?",
      },
      {
        question: 11,
        value: "가장 기억에 남는 선생님 성함은?",
      },
      {
        question: 12,
        value: "타인이 모르는 자신만의 신체비밀이 있다면?",
      },
      {
        question: 13,
        value: "추억하고 싶은 날짜가 있다면?",
      },
      {
        question: 14,
        value: "받았던 선물 중 기억에 남는 독특한 선물은?",
      },
    ],
  }),
  methods: {
    sendQuestion() {
      this.$emit("input", this.selectedItem);
    },
  },
};
</script>