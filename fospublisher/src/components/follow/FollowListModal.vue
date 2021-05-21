<template>
  <div class="text-center">
    <v-dialog v-model="openFollowListModal" persistent width="900">
      <v-card class="py-2" min-height="20vh">
        <v-card-title>
          <v-row class="justify-center" style="fontSize: 30px;">
            작가 목록
          </v-row>
        </v-card-title>

        <v-card-text class="justify-center d-flex ">
          <v-row class="justify-center mt-5 align-baseline">
            <v-col cols="6">
              <v-card-title class="pa-0">
                구독중인 작가들
              </v-card-title>
              <v-card
                class="overflow-y-auto mx-auto"
                height="450"
                max-width="450"
              >
                <v-list three-line>
                  <template v-for="(following, index) in followings">
                    <v-list-item :key="index">
                      <v-list-item-avatar>
                        <v-img :src="following.img"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="d-flex justify-space-between">
                          {{ following.nickname }}
                          <v-btn
                            small
                            color="#231815"
                            outlined
                            @click="unfollow(following.id)"
                          >
                            취소
                          </v-btn>
                        </v-list-item-title>
                        <v-list-item-subtitle>{{
                          following.introduce
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      :key="`divider-${index}`"
                      v-if="index + 1 < followings.length"
                    ></v-divider>
                  </template>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card-title class="pa-0">
                당신을 구독한 작가들
              </v-card-title>
              <v-card
                class="overflow-y-auto mx-auto"
                height="450"
                max-width="450"
              >
                <v-list three-line>
                  <template v-for="(follower, index) in followers">
                    <v-list-item :key="index">
                      <v-list-item-avatar>
                        <v-img :src="follower.img"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="d-flex justify-space-between">
                          {{ follower.nickname }}
                          <v-btn
                            v-if="follower.each == false"
                            small
                            color="#231815"
                            outlined
                            @click="follow(follower.id)"
                          >
                            맞팔로우
                          </v-btn>
                        </v-list-item-title>
                        <v-list-item-subtitle>{{
                          follower.introduce
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      :key="`divider-${index}`"
                      v-if="index + 1 < followers.length"
                    ></v-divider>
                  </template>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-row class="justify-center" no-gutters>
          <v-card-actions>
            <v-btn color="#231815" outlined @click="closeFollowListModal">
              확인
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {
  getFollowerList,
  getFollowingList,
  unfollowUser,
  followUser,
} from "@/api/follow";

export default {
  props: ["openFollowListModal"],
  data() {
    return {
      followers: [],
      followings: [],
    };
  },
  computed: {
    getBookListState() {
      return this.$store.getters['book/getBookListState']
    }
  },
  methods: {
    closeFollowListModal() {
      this.$emit("closeFollowListModal");
    },
    follow(id) {
      const user = { followingId: id };
      followUser(
        user,
        () => {
          this.fetchFollower();
          this.fetchFollowing();
          this.$store.dispatch('book/updateBookList')
        },
        (error) => {
          console.log(error);
        }
      );
    },
    unfollow(id) {
      unfollowUser(
        id,
        () => {
          this.fetchFollower();
          this.fetchFollowing();
          this.$store.dispatch('book/updateBookList')
        },
        (error) => {
          console.log(error);
        }
      );
    },
    fetchFollower() {
      getFollowerList(
        (res) => {
          this.followers = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    fetchFollowing() {
      getFollowingList(
        (res) => {
          this.followings = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  created() {
    this.fetchFollower();
    this.fetchFollowing();
  },
};
</script>
<style></style>
