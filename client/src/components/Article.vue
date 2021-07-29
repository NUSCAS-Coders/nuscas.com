
<template>
  <div class="card">
    <header class="card-header banner">
      <h1 class="card-header-title title is-1">{{ post.title }}</h1>
      <h2 class="card-header-title subtitle is-3">{{ post.subtitle }}</h2>
      <h3 class="card-header-title subtitle is-6">
        {{getPostInfo()}}
      </h3>
    </header>
    <div class="card-content content" v-html="post.content"></div>
    <p>Post ID: {{ post._id }}</p>
  </div>
</template>

<script lang="ts">
import Article, { ArticleStatus } from "../types/post";
import { defineComponent, PropType } from "vue";
const moment = require("moment");

export default defineComponent({
  name: "Article",
  props: {
    post: {
        type: Object as PropType<Article>,
        required: true
    }
  },
  methods: {
    getPostInfo() {
      if(this.post.status === ArticleStatus.POSTED)
        return ('Posted by: ' +  this.post.writer +  ' on ' + this.getFormattedDateTime(this.post.postedDate))
      return ('Submitted by: ' +  this.post.writer +  ' on ' + this.getFormattedDateTime(this.post.submittedDate))
    },
    getFormattedDateTime(date: Date) {
      return moment(date).format("DD MMM YYYY")
    }
    
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

label {
  text-align: left;
}

.banner {
  display: grid;
  grid-template-rows: auto;
}

:deep(.content) {
  // @import "~bulma";
  padding: 2em;
  text-align: left;
}

:deep(.content img) {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

:deep(.content)br {
  display: grid;
  justify-content: center;
  margin-bottom: 2rem;
}

:deep(.content) p {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}
</style>
