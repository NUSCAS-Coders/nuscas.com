<template>
  <div class="container home">
    <figure class="image is-block">
      <img src="../assets/logo.png" />
    </figure>
    <Posts></Posts>
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from "@/components/Posts.vue";

export default {
  name: "Main",
  components: {
    Posts,
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
      document.title ="NUSCAS" + " | " + "Home";
  }
  
};
</script>

<style lang="scss" scoped>

img {
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5rem;
}

</style>
