<template>
  <div class="home container" v-if="user != null && user.role === 'admin'">
    <h1>All Submissions</h1>
    <Submissions ref="submissions" :isAdmin='true'></Submissions>
  </div>
  <div v-else>This page is for admins only!</div>
</template>

<script>
// @ is an alias to /src
import Submissions from "@/views/SubmissionsPage.vue";
import { defineComponent } from 'vue';
const axios = require("axios").default;
const url = process.env.VUE_APP_API_URL + "/submissions";

export default defineComponent({
  name: "Write",
  components: {
    Submissions,
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
          alert("Post failed(" + error.code + ")");
        })
        .then((res) => {
          if (res.data == "OK") alert("Post success"), this.$emit("posted");
          else alert("Post failed " + res.statusText);
          this.$refs.submissions.get()
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
      document.title ="NUSCAS" + " | " + "All Submissions";
  }
});
</script>

<style lang="scss" scoped>
</style>
