import PersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    window.onNuxtReady(() => {
        PersistedState({
            key: 'store'
        })(store)
    })
}