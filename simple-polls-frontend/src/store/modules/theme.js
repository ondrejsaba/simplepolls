const moduleTheme = {
    namespaced: true,
    state: {
        darkTheme: false
    },
    mutations: {
        setDarkTheme(state) {
            state.darkTheme = !state.darkTheme
        }
    }
}

export default moduleTheme