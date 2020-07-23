export const state = () => ({
    userInfo: {
        token: '',
        user: {}
    }
})

export const mutations = {
    setUserInfo(test, data) {
        test.userInfo = data
    }
}
export const actions = {
    //actions中的回调函数的第一个参数是context, 是一个与store实例具有相同属性和方法的对象
    login({ commit }, data) {
        return this.$axios({
            url: "/accounts/login",
            data: data,
            method: "POST"
        }).then(res => {
            commit('setUserInfo', res.data)

        })
    }
};