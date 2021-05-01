<template>
  <v-card
    class="member-kukde-light justify-center d-flex align-content-space-around flex-wrap"
    min-height="20vh"
  >
    <v-col v-if="iCon" cols="12">
      <v-card-title v-if="headerTitle !== 'email'">
        <v-row class="justify-center">
          <v-img
            src="../assets/letter.png"
            alt="편지 이미지"
            max-width="15vw"
          />
        </v-row>
      </v-card-title>
    </v-col>

    <v-card-title>
      <v-row class="justify-center">
        {{ headerTitle }}
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row class="justify-center">
        <b>{{ bodyContent }}</b>
      </v-row>
    </v-card-text>

    <v-row class="justify-center" no-gutters>
      <v-card-actions>
        <v-btn small color="#231815" outlined @click="$emit('submit')">
          확인
        </v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "MessageModal",
  props: {
    headerTitle: {
      type: String,
      require: false,
    },
    bodyContent: {
      type: String,
      require: false,
    },
    moveTo: {
      type: String,
      require: false,
    },
    iCon: {
      type: Boolean,
      require: false,
    },
  },
};
</script>
