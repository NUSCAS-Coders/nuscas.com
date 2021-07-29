<template>
  <div class="home container">
    <Editor @post="onPost" :user="user" :content="``"></Editor>
  </div>
</template>

<script>
// @ is an alias to /src
import Editor from "@/components/Editor.vue";
import router from '@/router';
const axios = require("axios").default;
const url = process.env.VUE_APP_API_URL + "/submissions";

export default {
  name: "Write",
  components: {
    Editor,
  },
  methods: {
    onPost(article) {
      axios
        .post(url, {
          title: article.title,
          subtitle:article.subtitle,
          content: article.content,
          token: this.token,
        })
        .catch((error) => {
          alert("Post failed(" + error + ")");
        })
        .then((res) => {
          if (res.data == "OK") {
          alert("Post success")
          router.push({name: 'SubmissionsPage' })

          }
          else alert("Post failed " + res.statusText);
        });
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  mounted() {
      document.title ="NUSCAS" + " | " + "Create a post";
  }
};
</script>

<style lang="scss" scoped>
</style>
