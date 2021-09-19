export default {
    actions: {
        async updateSettings(ctx, settings) {
            ctx.commit('updateSettings', settings)
        }
    },
    mutations: {
        updateSettings(state, settings) {
            state = settings
        }
    },
    state: {
        width: 900,
        height: 600,
        cellSize: 60,
        xCells: 0,
        yCells: 0,
    },
    getters: {
        getSettings(state) {
            return state
        }
    },
}