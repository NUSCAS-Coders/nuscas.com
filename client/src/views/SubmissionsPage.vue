<template>
  <div class="Posts container">
    <div  class="cards" v-for="post in posts" v-bind:key="post._id">
      <SubmissionCard
        class="card"
        :id="post._id"
        :title="post.title"
        :subtitle="post.subtitle"
        :writer="post.writer"
        :user="user != null"
        :status="post.status"
        :previewImg="post.previewImg"
        :date="post.submittedDate"
      >
      </SubmissionCard>
    </div>
  </div>
</template>

<script lang='ts'>
import SubmissionCard from "../components/SubmissionCard.vue";
import { defineComponent } from 'vue';
import Post from '@/types/post';
import User from '@/types/user';
const axios = require("axios");
const url = process.env.VUE_APP_API_URL + "/submissions";

export default defineComponent({
  name: "Submissions",
  components: {
    SubmissionCard,
  },
  data() {
    return {
      posts: [] as Post[],
    };
  },
  props: { isAdmin: Boolean },
  methods: {
    async get() {
      if (this.isAdmin) {
        const {data} = await axios
          .get(url + '/all', {
            params: {
              token: this.token,
            },
          })
          this.posts = data;
          this.$emit("updated");
      } else {
        axios.get(url, {
            params: {
              token: this.token,
            },
          })
          .then((res: any) => {
            this.posts = res.data;
            this.$emit("updated");
          });
      }
    },
  },
  mounted() {
    this.get();
    document.title ="NUSCAS" + " | " + "Your Submissions";
  },
  watch: {
    updated: {
      handler: function (old_val, new_val) {
        if (old_val != new_val) this.get();
      },
    },
  },
  computed: {
    user(): User {
      return this.$store.getters.user;
    },
    token(): String {
      return this.$store.getters.token;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.Posts{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(448px - 2 * (1rem)), 1fr));
  grid-gap: 1rem;
  }

</style>
