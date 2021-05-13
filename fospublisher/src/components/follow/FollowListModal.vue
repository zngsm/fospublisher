<template>
  <div class="text-center">
    <v-dialog
      v-model="openFollowListModal"
      persistent
      width="900"
    >
      <v-card
        class="member-kukde-light py-2"
        min-height="20vh"
      >
        <v-card-title>
          <v-row class="justify-center" style="fontSize: 30px;">
            유저 목록
          </v-row>
        </v-card-title>

        <v-card-text class="justify-center d-flex ">
          <v-row class="justify-center mt-5 align-baseline">
            <v-col cols="6">
            <v-card-title class="pa-0">
              Following
            </v-card-title>
            <v-card
              v-scroll.self="onScroll"
              class="overflow-y-auto mx-auto"
              height="450"
              max-width="450"
            >
              <v-list three-line>
                <template v-for="(following, index) in followings">
                  <v-divider
                    v-if="following.divider"
                    :key="index"
                    :inset="following.inset"
                  ></v-divider>

                  <v-list-item
                    v-else
                    :key="following.title"
                  >
                    <v-list-item-avatar>
                      <v-img :src="following.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="d-flex justify-space-between">
                        {{ following.title }}
                        <v-btn small color="#231815" outlined @click="closeFollowListModal">
                          취소
                        </v-btn>
                      </v-list-item-title>
                      <v-list-item-subtitle v-html="following.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card-title class="pa-0">
              Follower
            </v-card-title>
            <v-card
              v-scroll.self="onScroll"
              class="overflow-y-auto mx-auto"
              height="450"
              max-width="450"
            >

              <v-list three-line>
                <template v-for="(follower, index) in followers">
                  <v-divider
                    v-if="follower.divider"
                    :key="index"
                    :inset="follower.inset"
                  ></v-divider>

                  <v-list-item
                    v-else
                    :key="follower.title"
                  >
                    <v-list-item-avatar>
                      <v-img :src="follower.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="d-flex justify-space-between">
                        {{ follower.title }}
                        <v-btn small color="#231815" outlined @click="closeFollowListModal">
                          팔로우
                        </v-btn>
                      </v-list-item-title>
                      <v-list-item-subtitle v-html="follower.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
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
// import { followUser, unfollowUser, getFollowingList, getFollowerList } from "@/api/follow";

export default {
  props: [
    'openFollowListModal',
  ],
  data() {
    return {
      followers: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
      followings: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }
  },
  methods: {
    closeFollowListModal() {
      this.$emit('closeFollowListModal')
    },
  },
}
</script>
<style>
  
</style>