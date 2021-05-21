<template>
  <div class="text-center">
    <v-dialog v-model="openInviteModal" persistent width="500">
      <v-card class="py-1" min-height="20vh">
        <v-card-title>
          <v-row class="justify-center" style="fontsize: 30px"> 초대 </v-row>
        </v-card-title>

        <v-card-text>
          <v-row class="justify-center mx-1 mt-5 align-baseline">
            <v-text-field
              label="작가 검색"
              v-model="username"
              @keyup.enter="searchUser"
              class="mr-2"
            ></v-text-field>
            <v-btn icon medium depressed @click="searchUser">
              <v-icon>fas fa-search</v-icon>
            </v-btn>
          </v-row>
        </v-card-text>
        <v-card
          v-show="users.length > 0"
          class="overflow-y-auto mx-auto"
          height="300"
          max-width="450"
        >
          <v-list three-line>
            <template v-for="(user, index) in users">
              <v-list-item :key="index">
                <v-list-item-avatar>
                  <v-img :src="user.img"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="d-flex justify-space-between">
                    {{ user.username }}
                    <v-btn
                      v-if="user.following == false"
                      small
                      color="#231815"
                      outlined
                      @click="follow(user.id)"
                    >
                      팔로우
                    </v-btn>
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    user.introduce
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider
                :key="`divider-${index}`"
                v-if="index + 1 < users.length"
              ></v-divider>
            </template>
          </v-list>
        </v-card>

        <v-row class="justify-center" no-gutters>
          <v-card-actions>
            <v-btn color="#231815" outlined @click="closeInviteModal">
              닫기
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { followUser } from "@/api/follow.js";
import { searchUserId } from "@/api/search.js";

export default {
  props: ["openInviteModal"],
  data() {
    return {
      username: "",
      users: [],
    };
  },
  methods: {
    closeInviteModal() {
      this.$emit("closeInviteModal");
    },
    searchUser() {
      searchUserId(
        this.username,
        (res) => {
          this.users = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    follow(id) {
      const user = { followingId: id };
      followUser(
        user,
        () => {
          this.searchUser();
          this.$store.dispatch('book/updateBookList')
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
<style></style>
