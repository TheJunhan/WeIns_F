<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      if (sessionStorage.getItem("token") !== null) {
        this.$root.logged = true;

        if (Number(sessionStorage.getItem("type")) > 0) {
          this.$root.is_superuser = true;
          this.$root.parseAuth(Number(sessionStorage.getItem("type")));
        }
      }
    }
  }
</script>

