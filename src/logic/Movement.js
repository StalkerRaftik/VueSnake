import { Vector } from '@/lib/vector'
import store from '../store'


class MovementHandler {
    zeroVector = new Vector(0,0)
    handleEvent(event) {
        let btn = event.code
        let NewMovVec
        switch(btn) {
            case 'KeyW':
                NewMovVec = new Vector(0, -1)
                break
            case 'KeyA':
                NewMovVec = new Vector(-1, 0)
                break
            case 'KeyS':
                NewMovVec = new Vector(0, 1)
                break
            case 'KeyD':
                NewMovVec = new Vector(1, 0)
                break
        }

        let ply = store.getters.getPlayer
        if ( ply.moveDirection.add(NewMovVec).equals(this.zeroVector) ) return;

        ply.newDirection = NewMovVec
        store.commit('updatePlayer', ply)

        console.log('Direction Changed', ply.newDirection)
    }
}

let movement
movement = new MovementHandler()
export function createMovementListener() {
    document.addEventListener('keydown', movement)
}

