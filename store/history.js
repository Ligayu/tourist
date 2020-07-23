// export const state = () => ({
//     history: []
// })
// export const mutations = {
//     setHistory(state, data) {
//         state.history.unshift(data)
//     }
// }


const state = {
    history: []
}

// export { state }
//export default state 一个模块只能有一个默认输出，因此export default命令只能使用一次。
const mutations = {
    setHistory(state, data) {
        state.history.unshift(data)
    },
    clearHistory(state, data) {
        state.history = data
    }
}
export { state, mutations }


