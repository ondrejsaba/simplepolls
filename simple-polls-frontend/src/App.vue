<template>
  <div
    id="main-view"
    :class="{
      dark: darkTheme
    }"
  >
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('theme', [
      'darkTheme'
    ])
  }
}
</script>

<style lang="scss">
@import "./sass/main.scss";
@import "./sass/classes";
@import "./sass/variables";

body {
  margin: 0;
}

#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#main-view {
  background-color: light(100);
  min-height: 100vh;

  &.dark {
    background-color: dark(100);
  }
}
</style>