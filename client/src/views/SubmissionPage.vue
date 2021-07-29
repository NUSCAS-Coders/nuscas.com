<template>
  <div class="container">
    <Submission v-if="user != null" :id="$route.params.id"  @title="onTitleSet"></Submission>
    <p v-else>Please Login to view the submission</p>
  </div>
</template>

<script>
import Submission from '@/components/Submission.vue'

export default {
  name: "SubmissionPage",
  data() {
    return {
      title: ""
    }
  },
  components: {
    Submission,
  },
    metaInfo() {
    return {
      title: "Admin",
      titleTemplate: "%s | " + this.title,
    };
  },
  methods: {
    onTitleSet(title) {
      this.title = title
      document.title ="NUSCAS" + " | " + title;
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import "~bulma";
</style>
