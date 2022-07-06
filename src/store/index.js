import vuex from 'vuex'
import user from './user'
const getters = {
    roles: state => state.user.roles
}
export default new vuex.createStore({
    modules: {
        user
    },
    getters
})
