<template>
  <div class="text-center">
    <v-dialog
      v-model="openInviteModal"
      persistent
      width="500"
    >
      <v-card
        class="member-kukde-light py-1"
        min-height="20vh"
      >
        <v-card-title>
          <v-row class="justify-center" style="fontSize: 30px;">
            초대
          </v-row>
        </v-card-title>

        <v-card-text>
          <v-row class="justify-center mx-1 mt-5 align-baseline">
            <v-text-field
              label="유저 검색"
              v-model="username"
              @keyup.enter="searchUser"
              class="mr-2"
            ></v-text-field>
            <v-btn icon medium depressed @click="searchUser" >
              <v-icon>fas fa-search</v-icon>
            </v-btn>
          </v-row>
        </v-card-text>
            <v-card
              v-scroll.self="onScroll"
              class="overflow-y-auto mx-auto"
              height="300"
              max-width="450"
            >
              <v-list three-line>
                <template v-for="(item, index) in items">
                  <v-divider
                    v-if="item.divider"
                    :key="index"
                    :inset="item.inset"
                  ></v-divider>

                  <v-list-item
                    v-else
                    :key="item.title"
                  >
                    <v-list-item-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="d-flex justify-space-between">
                        {{ item.title }}
                        <v-btn small color="#231815" outlined @click="closeFollowListModal">
                          팔로우
                        </v-btn>
                      </v-list-item-title>
                      <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>

        <v-row class="justify-center" no-gutters>
          <v-card-actions>
            <v-btn color="#231815" outlined @click="closeInviteModal">
              확인
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import { followUser } from "@/api/follow";

export default {
  props: [
    'openInviteModal',
  ],
  data() {
    return {
      username: '',
      items: [
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
    closeInviteModal() {
      this.$emit('closeInviteModal')
    },
    searchUser() {
      console.log('dd')
    }
  },
}
</script>
<style>
  
</style>