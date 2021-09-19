export default {
    actions: {
        async updateMap(ctx, map) {
            ctx.commit('updateMap', map)
        },
        async updateFood(ctx, vec) {
            ctx.commit('updateFood', vec)
        }
    },
    mutations: {
        updateMap(state, map) {
            state.map = map
        },
        updateFood(state, vec) {
            state.foodPos = vec
        }
    },
    state: {
        map: [],
        foodPos: undefined,
        cellStateEnums: {
            NOTHING: "",
            FOOD: 'cell-food',
            HEAD: 'cell-head',
            TAIL: 'cell-tail'
        },
    },
    getters: {
        getCellEnums(state) {
          return state.cellStateEnums
        },
        getMap(state) {
            return state.map
        },
        getFood(state) {
            return state.foodPos
        }
    },
}