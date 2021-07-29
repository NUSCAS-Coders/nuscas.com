<template>
  <div class="error" v-if="isError || !post">No post found</div>
  <div class="Post box" v-else>
    <div class="title">{{post.status}}</div>
    <button class="button {toggled: isEditor}" @click="toggleIsEditor()">
      Edit post
    </button>
    <button
      class="button is-danger"
      @click="deletePost()"
    >Delete Post</button>
    <button
      v-if="showApproveAndPostButton()"
      class="button is-primary"
      @click="approve()"
    >
      Approve and Post
    </button>
    <div v-if="!isEditor && post">
      <Article :post="post"></Article>
    </div>
    <div v-else>
      <Editor
        :user="user"
        :content="post.content"
        :displayTitle="post.title"
        :displaySubtitle="post.subtitle"
        @post="onPost"
      >
      </Editor>
    </div>
  </div>
</template>

<script lang='ts'>
import axios from "axios";
import User from "../types/user";
import Post, { ArticleStatus } from "../types/post"
const url = process.env.VUE_APP_API_URL + "/submissions/";

import Editor from "@/components/Editor.vue";

import { defineComponent } from "vue";
import Article from "./Article.vue";
import router from '@/router';

export default defineComponent({
  name: "Submission",
  components: {
    Editor,
    Article
  },
  props: {
    id: String
  },
  data() {
    return {
      post: null as Post | null,
      isEditor: false,
      isError: false
    };
  },
  methods: {
    toggleIsEditor() {
      this.isEditor = !this.isEditor;
    },
    get() {
      axios.get(url + this.id, {
          params: this.token
        })
        .then(res => {
          this.post = res.data;
          this.$emit("title", res.data.title);
        })
        .catch(() => {
          this.isError = true;
        });

    },    
    deletePost() {
      axios.delete(url, {
          data: { id: this.id, token: this.token },
        })
        .then(() => router.go(-1));
    },
    onPost(article: { title: String; subtitle: String; content: Object }) {
      axios
        .patch(url + this.id, {
          token: this.token,
          title: article.title,
          subtitle: article.subtitle,
          content: article.content,
          user: this.user
        })
        .catch(error => {
          alert("Edit failed(" + error.code + ")");
        })
        .then(res => {
          if (res && res.data == "OK") {
            alert("Edit success");
            this.$emit("posted");
            this.get();
            this.toggleIsEditor();
          } else alert("Edit failed");
        });
    },
    approve() {
      axios.post(url + this.id + "/approve", {
          token: this.token
        })
        .catch(error => {
          alert("Post failed(" + error.code + ")");
        })
        .then(res => {
          if (res && res.data == "OK") {
            alert("Post success");
            this.$emit("posted");
            this.get();
          } else alert("Edit failed");
        });
    },
    showApproveAndPostButton() {
      if (this.post && this.user && !this.isEditor) {
        if (
          this.user.role == "admin" &&
          (this.post.status  == ArticleStatus.AWAITING_EDITOR || 
          this.post.status == ArticleStatus.POSTED_AWAITING_EDITOR )
          && this.user.username != this.post.writer
        ) {
          return true;
        } else if (
          this.user.username == this.post.writer &&
          (this.post.status == ArticleStatus.AWAITING_WRITER || 
          this.post.status == ArticleStatus.POSTED_AWAITING_WRITER)
        ) {
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    this.get();
  },
  computed: {
    user(): User {
      return this.$store.getters.user;
    },
    token(): String {
      return this.$store.getters.token;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
label {
  text-align: left;
}

:deep(v-deep).content img {
  display: block;
  margin-right: auto;
  margin-left: auto;
  height: 50vh;
}

:deep(.content) br {
  display: gird;
  justify-content: center;
}

:deep(.content) {
  padding: 2em;
  text-align: left;
}
</style>
