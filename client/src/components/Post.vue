
<template>
  <div v-if="post">
    <Article :post="post"></Article>
    <div class="card mgt" v-if="post.comments && post.comments.length">
      <div class="card-header">
        <div class="card-header-title">
          Comments:
        </div>
      </div>
      <div class="card-content">
        <div
          class="has-text-link"
          v-for="(comment, index) in post.comments"
          :key="index"
        >
          {{ comment.content }} - {{ comment.user }} on
          {{ new Date(comment.dateTime).toLocaleString() }}
          <button
            v-if="user && Array(user.role = 'admin')"
            v-on:click="deleteComment(index)"
            class="button is-danger is-small"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <div class="card mgt" v-else>
      <div class="card-header">
        <div class="card-header-title">
          There are no comments.
        </div>
      </div>
    </div>

    <div class="card mgt" v-if="user">
      <div class="card-header">
        <div class="card-header-title">
          New Comment:
        </div>
      </div>
      <div class=" card-content">
        <input
          class="input"
          v-model="comment"
          type="is-link"
          placeholder="Enter your comment here"
        />
        <button class="button is-primary mgt" v-on:click="postComment">
          Submit
        </button>
      </div>
    </div>
    <div class="card mgt" v-else>
      <div class="card-header">
        <div class="card-header-title">
          Please login to leave a comment.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Post from "../types/post";
import Article from "./Article.vue";
import User from "@/types/user";
const url = process.env.VUE_APP_API_URL + "/posts/";

export default defineComponent({
  components: { Article },
  name: "PostComponent",
  props: {
    id: String
  },
  data() {
    return {
      post: null as Post | null,
      comment: null as String | null
    };
  },
  methods: {
    get() {
      axios.get(url + this.id).then(res => {
        this.post = res.data;
        // console.log(this.post);
        this.$emit("title", res.data.title);
        return this.$store.getters.user;
      });
    },
    postComment() {
      axios
        .post(url + this.id + "/comment", {
          token: this.token,
          comment: this.comment
        })
        .then(() => {
          this.get();
          this.comment = null;
        });
    },
    deleteComment(index: number) {
      axios
        .delete(url + this.id + "/comment", {
          data: {
            token: this.token,
            commentIndex: index
          }
        })
        .then(() => {
          this.get();
          this.comment = null;
        });
    }
  },
  computed: {
    user(): User {
      return this.$store.getters.user;
    },
    token(): String {
      return this.$store.getters.token;
    }
  },
  mounted() {
    this.get();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$link: #7c8fd8;
$text-strong: #ee935b;
$black: #292229;
$scheme-invert: $black;
$card-shadow: 0 0.5em 1em -0.125em rgba($scheme-invert, 1),
  0 0px 0 1px rgba($scheme-invert, 0.2);
@import "~bulma";

.mgt {
  margin-top: 1rem;
}

.a {
  color: $link !important;
}
</style>
