const moduleModal = {
    namespaced: true,
    state: {
        showModal: false,
        modalOptions: {
            component: '',
            title: '',
            message: '',
            data: {},
            width: '400px',
            height: 'auto'
        }
    },
    mutations: {
        setShowModal(state) {
            state.showModal = !state.showModal
        },
        setModalOptions(state, { component, title = '', message = '', data = {}, width = '400px', height = 'auto' }) {
            state.modalOptions = {
                component,
                title,
                message,
                data,
                width,
                height
            }
        }
    }
}

export default moduleModal