<template>
  <div class="card">
    <div v-if="previewImg" class="card-image">
      <figure class="image parent">
        <img :src="getImgUrl()" />
      </figure>
    </div>
    <div class="card-content contents">
      <router-link :to="{ path: postUrl }">
        <div class="title">{{ title }}</div>
        <div class="subtitle postSubtitle">{{ subtitle }}</div>
        <div class="subtitle">
          Submitted by: {{ writer }} on {{ getFormattedDateTime(date) }}
        </div>
      </router-link>

      <footer class="card-footer">
        <div
          class="card-footer-item title is-6"
          :class="getPostBackgroundColor()"
        >
          {{ status }}
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { ArticleStatus } from "../types/post";
const moment = require("moment");

export default defineComponent({
  name: "SubmissionCard",
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: String,
    writer: { type: String, required: true },
    user: Boolean,
    status: { type: String, required: true },
    previewImg: String,
    date: { type: String, required: true }
  },
  data() {
    return {
      postUrl: "/submissions/" + this.id + "/"
    };
  },
  methods: {
    getImgUrl() {
      return this.previewImg;
    },
    getPostBackgroundColor() {
      if (this.status === ArticleStatus.AWAITING_WRITER || this.status ===ArticleStatus.POSTED_AWAITING_WRITER)
        return "has-background-danger-light";
      else if (this.status === ArticleStatus.POSTED)
        return "has-background-success";
      return "has-background-warning-light";
    },
    getFormattedDateTime(date: String) {
      return moment(date).format("DD MMM YYYY");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card {
  height: 100%;
  .card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .image img {
    max-height: 720px;
  }

  .contents {
    margin-bottom: 2rem;
  }
}
</style>
