import { Vector } from '@/lib/vector'

export default {
    actions: {
        async updatePlayer(ctx, ply) {
            ctx.commit('updatePlayer', ply)
        }
    },
    mutations: {
        updatePlayer(state, ply) {
            state = ply
        }
    },
    state: {
        newDirection: new Vector(1,0),
        moveDirection: new Vector(1, 0),
        score: 0,
        snakeQuery: [
            new Vector(1, 3),
        ]
    },
    getters: {
        getPlayer(state) {
            return state
        }
    },
}