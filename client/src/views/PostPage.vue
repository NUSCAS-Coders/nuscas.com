<template>
  <div class="container">
    <Post :id="$route.params.id"  @title="onTitleSet"></Post>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
  name: "PostPage",
  data() {
    return {
      title: ""
    }
  },
  components: {
    Post,
  },
  methods: {
    onTitleSet(title) {
      this.title = title
      document.title ="NUSCAS" + " | " + this.title;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import "~bulma";
</style>
