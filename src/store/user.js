import { login, getInfo } from '@/api/login'
import { setToken } from '../tools/webstore'
const user = {
    namespaced: true,
    state: {
        token: '',
        name: '',
        avatar: '',
        roles: [],
        permissions: []
    },
    //提交state
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }

    },
    //提交mutation
    actions: {
        Login(context, userform) {
            return new Promise((resolve, reject) => {
                login(userform).then(res => {
                    context.commit('SET_TOKEN', res.token)
                    setToken(res.token)
                    resolve()
                }, err => {
                    reject(err)
                })

            })
        },
        GetInfo({ commit }, data) {
            return new Promise(res => {
                getInfo().then(res => {
                    const user = res.user
                    // const avatar = user.avatar == "" ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;
                    console.log(res);
                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', res.roles)
                        commit('SET_PERMISSIONS', res.permissions)
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }
                    commit('SET_NAME', user.userName)
                    commit('SET_AVATAR', avatar)
                })
            })
        }
    },
}
export default user