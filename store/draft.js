export const state = () => ({
    dataDraft: []
});
export const mutations = {
    addDraft(state, data) {
        state.dataDraft.unshift(data);
    },
    remove(state, data) {
        state.dataDraft.splice(data, 1);
    },
    removeDraft(state, data) {
        state.dataDraft.slice(data, 1);
    }
};
