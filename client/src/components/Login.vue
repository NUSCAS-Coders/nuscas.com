<template>
  <div class="Login">
    <vue-telegram-login
      v-if="user == null"
      mode="callback"
      :telegram-login="telegramBotName"
      @callback="callbackFunction"
      size="small"
    />
    <div v-else>
      <div>{{ getUserInfo() }}</div>
    </div>
  </div>
</template>
<script lang='ts'>
import  vueTelegramLogin  from "./vue-telegram-login.vue";
import { defineComponent } from "vue";
import User from '@/types/user';
export default defineComponent({
  name: "Login",
  components: {
    vueTelegramLogin
  },
  data() {
    return {telegramBotName: process.env.VUE_APP_TELEGRAM_BOT_NAME}
  },
  methods: {
    callbackFunction(user: User) {
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      this.user = user;
      this.$store.dispatch("authRequest", user);
    },
    getUserInfo() {
      return "Welcome " + this.user.username + "(" + this.user.role + ")";
    },
    getTelegramBotname() {
      console.log(process.env.VUE_APP_TELEGRAM_BOT_NAME)
      return process.env.VUE_APP_TELEGRAM_BOT_NAME
    }
  },
  mounted() {
    this.$store.dispatch("verifyToken");
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
