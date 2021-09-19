import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import player from './modules/player'
import game from './modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        settings,
        player,
        game,
    }
})