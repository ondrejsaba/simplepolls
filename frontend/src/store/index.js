import { createStore } from 'vuex'
import moduleTheme from './modules/theme.js'
import moduleModal from './modules/modal.js'

export default createStore({
  modules: {
    theme: moduleTheme,
    modal: moduleModal
  }
})