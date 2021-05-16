<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(year, i) in years" :key="i">
      <v-expansion-panel-header>
        {{ year }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-for="(item, idx) in bookInfo.list[year]" :key="idx">
          <p @click="goPage(item.pageStart)">
            <b>{{ item.title }}</b
            >-------------p {{ item.pageStart + 5 }}
          </p>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "Index",
  props: {
    bookInfo: {
      type: Object,
      default: () => {
        return {
          cover: {
            id: 0,
            page: 0,
            title: "",
            size: 0,
            skin: 0,
            font: 0,
            skin_color: "",
            font_color: "",
          },
          content: [
            {
              id: 0,
              title: "",
              content: "",
              year: 0,
              order: 0,
              page: 0,
              check: true,
              createdAt: "",
            },
          ],
        };
      },
    },
  },
  data() {
    return {
      years: null,
    };
  },
  mounted() {
    this.years = Object.keys(this.bookInfo.list);
  },
};
</script>

<style></style>
