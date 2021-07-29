<template>
  <div class="container">
    {{comment}}
  </div>
</template>

<script>
export default {
  name: "CommentComponent",
  props: {
    comment: String,
    user: String,
    datetime: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this  component only -->
<style lang="scss" scoped>
</style>
