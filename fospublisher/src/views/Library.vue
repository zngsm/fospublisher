<template>
  <div>
    <Navbar />
    <v-tabs
      v-model="tab"
      background-color="black"
      class="pa-0"
      centered
      dark
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab 
        v-for="(num, index) in drawerNum" 
        :key="index" 
        :href="`#${num}`" 
        @click="$router.push(`/library/${num}`)"
      >
        {{ num }}번 서랍
      </v-tab>
    </v-tabs>

   
    <BookList />
  </div>
</template>

<script>
import BookList from '@/components/follow/BookList.vue'
import Navbar from "@/components/main/Navbar.vue";
import { getEachFollowerList } from "@/api/follow";


export default {
  name: 'Library',
  components: {
    Navbar,
    BookList
  },
  data() {
    return {
      tab: null,
      drawerNum: 0,

    }
  },
  methods: {
  },
  created() {
    this.tab = this.$route.params.id
    getEachFollowerList(
      (res) => {
        this.drawerNum = res.data.length - 1
      },
      (error) => {
        console.log(error)
      }
    )
  },
}
</script>
