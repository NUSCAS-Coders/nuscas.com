<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
      integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
      crossorigin="anonymous"
    />
    <div id="nav" class="navbar is-black" role="navigation">
      <router-link class="navbar-item is-link" to="/">Home</router-link>
      <router-link class="navbar-item is-link" to="/about">About</router-link>
      <router-link
        class="navbar-item is-link"
        to="/write"
        v-if="user ? user.role === 'member' || user.role === 'admin' : false"
        >Write</router-link
      >
      <router-link
        class="navbar-item is-link"
        v-if="user && user.role === 'admin'"
        to="/Edit"
        >Edit
      </router-link>
      <router-link class="navbar-item is-link" to="/submissions" v-if="user">
        <Login class="navbar-item" />
      </router-link>
      <div v-else>
        <Login class="navbar-item" />
      </div>
      <router-link
        class="navbar-item is-link"
        to="/"
        v-if="user"
        v-on:click="logout"
      >
        Logout
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Login
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      location.reload();
    }
  }
});
</script>

<style lang="scss">
$card-background-color: #25201f;
$primary: #c35472;
$secondary: #7c8fd8;
$link: #7c8fd8;
$white: #f6f0f5;
$white-ter: #4b164b;
$white-bis: #f6f6f6;
$black: #292229;
$black-ter: #1d181d;
$black-bis: #131113;
$text: #c35472;
$text-light: #c35472;
$text-strong: #ee935b;
$light: #7c8fd8;
$background: $primary;
$navbar-item-color: $text-strong;
$navbar-item-hover-color: #e97d3a;
$navbar-item-hover-background-color: #00000050;
$card-radius: 0.5rem;
$scheme-invert: $black;
$card-shadow: 0 0.5em 1em -0.125em rgba($scheme-invert, 1),
  0 0px 0 1px rgba($scheme-invert, 0.2);
@import "~bulma";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("@/assets/bg.png");
}

.ProseMirror {
  background-color: white;
  color: black;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}
</style>

<style scoped lang="scss">
#nav {
  login {
    margin: 0;
  }
}
</style>