<template>
  <div class="card">
    <div v-if="previewImg" class="card-image">
          <figure class="image parent">
            <img :src="getImgUrl()">
          </figure>
    </div>
    <div class="card-content content">
      <router-link :to="{ path: postUrl }">
      <div class="title is-3">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
      <div class="subtitle is-6 has-text-light">By: {{ writer }} on {{getFormattedDateTime(date)}}</div>
      </router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
const moment = require("moment");

export default defineComponent({
  name: "PostCard",
  props: {
    id: String,
    title: String,
    subtitle: String,
    content: String,
    previewImg: String,
    writer: String,
    date: {type: String,
    required: true}
  },
  data() {
    return {
      postUrl: "/post/" + this.id + "/",
    };
  },
  methods: {
    getImgUrl() {
      return this.previewImg
    },
    getFormattedDateTime(date: String) {
      return moment(date).format("DD MMM YYYY");
    }
  },
});
</script>
<style lang="scss" scoped>
.card {
  height: 100%;
}

.image img{
max-height: 720px;
}

</style>
