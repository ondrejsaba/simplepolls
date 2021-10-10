import { createStore } from 'vuex'
import moduleTheme from './modules/theme.js'

export default createStore({
  modules: {
    theme: moduleTheme
  }
})