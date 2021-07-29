<template>
  <div class="Posts">
    <div v-for="post in posts" v-bind:key="post._id">
      <PostCard
        :id="post._id"
        :title="post.title"
        :subtitle="post.subtitle"
        :previewImg="post.previewImg"
        :writer="post.writer"
        :date="post.postedDate"
      >
      </PostCard>
    </div>
    <button
      v-if="!scrollEnd"
      v-on:click="get"
      class="button"
      :class="getLoadButtonClass()"
    >
      <div v-if="!postsLoading">
        <div>Load older posts</div>
        <span class="icon is-small">
          <i class="fas fa-arrow-down"></i>
        </span>
      </div>
    </button>
    <p v-else>
      No more posts.
    </p>
  </div>
</template>

<script lang='ts'>
import PostCard from "./PostCard.vue";
import { defineComponent } from "vue";
import Post from "@/types/post";
const axios = require("axios");
const url = process.env.VUE_APP_API_URL + "/posts";

export default defineComponent({
  name: "PostsComponent",
  components: {
    PostCard
  },
  data() {
    return {
      page: 0,
      posts: [] as Post[],
      scrollEnd: false,
      postsLoading: false
    };
  },
  props: {},
  methods: {
    async get() {
      this.postsLoading = true;
      const { data } = await axios.get(url, {
        params: {
          page: this.page
        }
      });
      this.postsLoading = false;

      this.posts = this.posts.concat(data);
      this.page++;
      if (data.length == 0) {
        this.scrollEnd = true;
      }
    },
    getNextPage() {
      window.onscroll = () => {
        let bottomOfWindow =
          window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (bottomOfWindow && !this.scrollEnd) {
          this.get();
        }
      };
    },
    getLoadButtonClass() {
      if (this.postsLoading) {
        console.log("is-loading..");
        return "is-loading";
      } else {
        return "";
      }
    }
  },
  beforeMount() {
    this.get();
  },
  mounted() {
    this.getNextPage();
  },
  watch: {
    updated: {
      handler: function(old_val, new_val) {
        if (old_val != new_val) this.get();
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Posts {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(448px - 2 * (1rem)), 1fr)
  );
  grid-gap: 1rem;
}
</style>
