const moduleModal = {
    namespaced: true,
    state: {
        showModal: false,
        modalOptions: {
            component: '',
            title: '',
            message: '',
            width: '400px',
            height: 'auto'
        }
    },
    mutations: {
        setShowModal(state) {
            state.showModal = !state.showModal
        },
        setModalOptions(state, { component, title = '', message = '', width = '400px', height = 'auto' }) {
            state.modalOptions = {
                component: component,
                title: title,
                message: message,
                width: width,
                height: height
            }
        }
    }
}

export default moduleModal