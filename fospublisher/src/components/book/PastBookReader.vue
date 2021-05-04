<template>
  <div class="cover">
    <div class="book">
      <label for="page-1" class="book__page book__page--1">
        <div
          class="Main__past-book"
          :style="{
            backgroundColor: bookInfo.cover.skin_color,
            fontColor: bookInfo.cover.font_color,
            fontSize: fontSize,
          }"
        >
          <p>{{ bookInfo.cover.title }}</p>
        </div>
      </label>

      <label for="page-2" class="book__page book__page--4">
        <div class="page__content">
          <h1 class="page__content-title">I</h1>
          <div class="page__content-blockquote">
            <p class="page__content-blockquote-text">
              . . . Undoubtedly his greatest contributions were in the field of
              psychohistory. Seldon found the field little more than a set of
              vague axioms; he left it a profound statistical science. . . .
            </p>
            <p class="page__content-blockquote-text">
              . . . The best existing authority we have for the details of his
              life is the biography written by Gaal Dornick who, as a young man,
              met Seldon two years before the great mathematician's death. The
              story of the meeting . . .
            </p>
            <span class="page__content-blockquote-reference"
              >Encyclopedia Galactica*</span
            >
          </div>
          <div class="page__content-text">
            <p>
              His name was Gaal Dornick and he was just a country boy who had
              never seen Trantor before. That is, not in real life. He had seen
              it many times on the hyper-video, and occasionally in tremendous
              three-dimensional newscasts covering an Imperial Coronation or the
              opening of a Galactic Council. Even though he had lived all his
              life on the world of Synnax, which circled a star at the edges of
              the Blue Drift, he was not cut off from civilization, you see. At
              that time, no place in the Galaxy was.
            </p>

            <p>
              There were nearly twenty-five million inhabited planets in the
              Galaxy then, and not one but owed allegiance to the Empire whose
              seat was on Trantor. It was the last half-century in which that
              could be said.
            </p>
            <p>
              To Gaal, this trip was the undoubted climax of his young,
              scholarly life. He had been in space before so that the trip, as a
              voyage and nothing more, meant little to him. To be sure, he had
              traveled previously only as far as Synnax's only satellite in
              order to get the data on the mechanics of meteor driftage which he
              needed for his dissertation, but space-travel was all one whether
              one travelled half a million miles, or as many light years.
            </p>
          </div>
          <div class="page__number">3</div>
        </div>
      </label>

      <!-- Resets the page -->
      <input type="radio" name="page" id="page-1" />

      <!-- Goes to the second page -->
      <input type="radio" name="page" id="page-2" />
      <label class="book__page book__page--2">
        <div class="book__page-front">
          <div class="page__content">
            <h1 class="page__content-book-title">{{ bookInfo.cover.title }}</h1>
            <h2 class="page__content-author">저자</h2>
            <!-- 
            <p class="page__content-credits">
              Introduction by
              <span>Paul Krugman</span>
            </p> -->

            <div class="page__content-copyright">
              <p>역전 출판사</p>
            </div>
          </div>
        </div>
        <div class="book__page-back">
          <div class="page__content">
            <h1 class="page__content-title">목차</h1>
            <table class="page__content-table">
              <tr v-for="(key, value) in bookInfo.list" :key="value">
                <td align="left">
                  <div class="dropdown">
                    <v-icon>{{ mdiMenuDown }}</v-icon>
                    <div
                      v-for="chapter in bookInfo.value"
                      :key="chapter.pageStart"
                      align="left"
                    >
                      {{ chapter.title }}
                    </div>
                    <!-- <div class="dropdown-content">
                      <td
                        v-for="chapter in bookInfo.value"
                        :key="chapter.pageStart"
                        align="left"
                      >
                        {{ chapter.title }}
                      </td>
                    </div> -->
                  </div>
                </td>
                <td align="left">{{ value }}</td>
                <div>{{ value.title }}</div>
              </tr>
            </table>

            <div class="page__number">2</div>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import { mdiMenuDown } from "@mdi/js";
export default {
  name: "PastBookTest",
  data: () => {
    return {
      mdiMenuDown,
      bookInfo: {
        cover: {
          id: 3,
          page: 30,
          title: "sm님의 자서전",
          size: 0,
          skin: 0,
          font: 2,
          skin_color: "#654321",
          font_color: "#000000",
        },
        content: [
          {
            id: 11,
            title: "TITLE_2002_1",
            content: "modified_CONTENT",
            year: 2002,
            order: 0,
            page: 10,
            check: true,
            createdAt: "2021-04-27T11:08:02.000Z",
          },
          {
            id: 13,
            title: "TITLE_2002_2",
            content: "CONTENT_2002",
            year: 2002,
            order: 1,
            page: 10,
            check: true,
            createdAt: "2021-04-28T02:17:44.000Z",
          },
          {
            id: 14,
            title: "TITLE_2002_3",
            content: "CONTENT_2002",
            year: 2002,
            order: 2,
            page: 10,
            check: true,
            createdAt: "2021-04-28T02:17:46.000Z",
          },
        ],
        list: {
          1999: [
            {
              title: "TITLE_2002_1",
              id: 11,
              pageStart: 0,
            },
            {
              title: "TITLE_2002_2",
              id: 13,
              pageStart: 10,
            },
            {
              title: "TITLE_2002_3",
              id: 14,
              pageStart: 20,
            },
          ],
          2002: [
            {
              title: "TITLE_2002_1",
              id: 11,
              pageStart: 0,
            },
            {
              title: "TITLE_2002_2",
              id: 13,
              pageStart: 10,
            },
            {
              title: "TITLE_2002_3",
              id: 14,
              pageStart: 20,
            },
          ],
        },
      },
      fontSize: null,
    };
  },
  methods: {
    getFontSize(size) {
      if (size == 1) {
        this.fontSize = "large";
      } else if (size == 2) {
        this.fontSize = "x-large";
      }
    },
  },
  mounted() {
    this.getFontSize(this.bookInfo.cover.font);
  },
};
</script>

<style scoped>
@import "../../assets/css/PastBookReader.css";
</style>
