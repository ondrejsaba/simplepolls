<template>
  <div
    id="main-view"
    :class="{
      dark: darkTheme
    }"
  >
    <Header />
    <router-view />

    <div
      id="dim-box"
      v-if="showModal"
      @click.self="setShowModal"
    >
      <Modal />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Header,
    Modal
  },
  methods: {
    ...mapMutations('modal', [
      'setShowModal'
    ])
  },
  computed: {
    ...mapState('theme', [
      'darkTheme'
    ]),
    ...mapState('modal', [
      'showModal'
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

#dim-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(dark(400), 0.5);
}
</style>