<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Submissions :user="user" v-if="user != null"></Submissions>
    <p v-else>Please log in with an admin account to see posts</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Submissions from "@/views/SubmissionsPage.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Admin",
  components: {
    Submissions,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onPosted() {},
  },
  mounted() {
      document.title ="NUSCAS" + " | " + "All Submissions";
  }
  
});
</script>

<style lang="css" scoped>
</style>
