import store from '../store'
import Vue from 'vue'
import {vm} from "../main"
import {Vector} from "../lib/vector";

export class MainCycle {
    mainCycle = undefined

    Rerender() {
        vm.$children[0].$children[0].forceRerender()
    }

    isPlayerAteFood(ply) {
        let foodPos = store.getters.getFood
        if (ply.snakeQuery[0].equals(foodPos)) {
            return true
        }
        return false
    }

    checkBorders(cell) {
        let settings = store.getters.getSettings
        let w = settings.xCells
        let h = settings.yCells

        if (cell.x >= w) {
            cell.x = 0
        }
        if (cell.x < 0) {
            cell.x = w-1
        }
        if (cell.y > h) {
            cell.y = 0
        }
        if (cell.y < 0) {
            cell.y = h-1
        }
    }

    setGameOver() {
        clearInterval(this.mainCycle)
    }

    checkGameoverCondition() {
        let ply = store.getters.getPlayer
        let firstCell = ply.snakeQuery[0]
        for (let i = 1; i < ply.snakeQuery.length-1; i++) {
            if (firstCell.equals(ply.snakeQuery[i])) {
                this.setGameOver()
            }
        }
    }

    SetRandomPos(object) {
        let settings = store.getters.getSettings
        let w = settings.xCells
        let h = settings.yCells

        object.x = Math.round(Math.random() * (w-1))
        object.y = Math.round(Math.random() * (h-1))
    }

    GenerateNewFood() {
        let food = store.getters.getFood
        this.SetRandomPos(food)
        store.commit('updateFood', food)
    }

    PlayerMove() {
        let ply = store.getters.getPlayer

        ply.moveDirection = ply.newDirection

        let lastCellClone = ply.snakeQuery[ply.snakeQuery.length-1].clone()
        let lastCell = ply.snakeQuery[ply.snakeQuery.length-1]
        let firstCell = ply.snakeQuery[0]
        if (!this.isPlayerAteFood(ply)) {
            ply.snakeQuery.length = ply.snakeQuery.length - 1
        } else {
            ply.snakeQuery[ply.snakeQuery.length-1] = lastCellClone
            this.GenerateNewFood()
        }

        lastCell.x = firstCell.x
        lastCell.y = firstCell.y
        lastCell = lastCell.add(ply.moveDirection)
        this.checkBorders(lastCell)


        ply.snakeQuery.unshift(lastCell)
    }

    ClearMap() {
        let map = store.getters.getMap
        for (let i = 0; i < map.length; i++) {
            map[i] = []
        }
    }

    SyncronizePlayerWithMap() {
        let ply = store.getters.getPlayer
        let map = store.getters.getMap
        let enums = store.getters.getCellEnums

        map[ply.snakeQuery[0].x][ply.snakeQuery[0].y] = enums.HEAD
        for (let i = 1; i < ply.snakeQuery.length; i++) {
            map[ply.snakeQuery[i].x][ply.snakeQuery[i].y] = enums.TAIL
        }
        Vue.set(store.state, 'map', map)

        this.Rerender()
    }

    SyncronizeFood() {
        let food = store.getters.getFood
        let map = store.getters.getMap
        map[food.x][food.y] = store.getters.getCellEnums.FOOD
        Vue.set(store.state, 'map', map)
    }

    SyncronizeMap() {
        this.ClearMap()
        this.SyncronizeFood()
        this.SyncronizePlayerWithMap()
    }

    InitializeGame() {
        let ply = store.getters.getPlayer

        let food = new Vector()
        this.SetRandomPos(food)
        store.commit('updateFood', food)
        console.log(store.getters.getFood)

        this.SetRandomPos(ply.snakeQuery[0])
        store.commit('updatePlayer', ply)
    }

    CreateCycle() {
        this.InitializeGame()
        this.mainCycle = setInterval(() => {
            this.PlayerMove()
            this.SyncronizeMap()
            this.checkGameoverCondition()
        }, 500)
    }

}

export let mainCycle = new MainCycle()





