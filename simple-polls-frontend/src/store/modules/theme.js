const moduleTheme = {
    namespaced: true,
    state: {
        darkTheme: false
    },
    mutations: {
        setDarkTheme(state) {
            state.darkTheme = !state.darkTheme
            localStorage.setItem('theme', state.darkTheme ? 'dark' : 'light')
        },
        syncTheme(state) {
            if (!localStorage.hasOwnProperty('theme')) {
                localStorage.setItem('theme', state.DarkTheme ? 'dark' : 'light')
            } else {
                state.darkTheme = localStorage.getItem('theme') == 'dark'
            }
        }
    }
}

export default moduleTheme