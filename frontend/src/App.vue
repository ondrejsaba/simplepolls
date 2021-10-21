<template>
  <div
    id="main-view"
    :class="{
      dark: darkTheme
    }"
  >
    <div
      ref="contentBox"
      :class="{
        'dark': darkTheme,
        'center-container': centerContent,
        'pt-20': !centerContent,
        'pb-20': !centerContent
      }"
    >
      <Header />
      <router-view
        v-slot="{ Component }"
        @updateContentPosition="updateContentPosition"
      >
        <transition name="router-fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>

    <transition name="fade">
      <div
        id="dim-box"
        v-if="showModal"
        @click.self="setShowModal"
      ></div>
    </transition>

    <transition name="modal">
      <Modal v-if="showModal" />
    </transition>

    <GlobalEvents
      @keyup.esc="closeModal"
    />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue'
import { GlobalEvents } from 'vue-global-events'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    Header,
    Modal,
    GlobalEvents
  },
  data() {
    return {
      centerContent: true
    }
  },
  methods: {
    ...mapMutations('theme', ['syncTheme']),
    ...mapMutations('modal', ['setShowModal']),

    closeModal() {
      if (this.showModal) {
        this.setShowModal()
      }
    },
    updateContentPosition() {
      setTimeout(() => {
        const viewHeight = window.innerHeight
        const contentHeight = this.$refs.contentBox.offsetHeight

        this.centerContent = viewHeight > contentHeight
      }, 0)
    }
  },
  computed: {
    ...mapState('theme', ['darkTheme']),
    ...mapState('modal', ['showModal'])
  },
  mounted() {
    this.syncTheme()
    this.updateContentPosition()
    window.addEventListener('resize', this.updateContentPosition)
  },
  destroyed() {
    window.removeEventListener('resize', this.updateContentPosition)
  }
}
</script>

<style lang="scss">
@import "./sass/main";
@import "./sass/classes";
@import "./sass/variables";
@import "./sass/transitions";

body {
  margin: 0;
  overflow-x: hidden;
}

#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#main-view {
  background-color: light(100);
  color: dark(100);
  min-height: 100vh;

  &.dark {
    background-color: dark(100);
    color: light(100);
  }

  transition: background-color 0.1s ease;
}

#dim-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(dark(400), 0.5);
}

.center-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid light(200);
  box-shadow: 2px 2px 32px rgba(light(300), 0.25);
  padding: 20px;
  transition: border-color 0.1s ease;

  &.dark {
    border: 1px solid dark(300);
    box-shadow: 2px 2px 32px rgba(dark(400), 0.1);
  }
}
</style>