<template>
  <div id="cell"
       :style="cssProps"
       v-bind:class="[getMyStatement, {firstLeft: cell.isFirst, firstTop: row.isFirst}]"
  >
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  props: ['settings', 'cell', 'row', 'rowIndex', 'cellIndex'],
  computed: {
    ...mapGetters(['getMap', 'getCellEnums']),
    getMyStatement() {
      let info = this.getMap[this.cellIndex][this.rowIndex]

      let enums = this.getCellEnums
      if (info !== undefined) {
        return info
      }
      return enums.NOTHING
    },
    cssProps() {
      return {
        '--cellSize': this.settings.cellSize + "px",
      }
    }
  }
}
</script>

<style scoped>
#cell {
  box-sizing: border-box; /* Границы внутри блока */
  float: left; /*Задаем обтекание*/
  width: var(--cellSize);
  height: var(--cellSize);

  border-right: 3px solid rgb(138, 78, 0);
  border-bottom: 3px solid rgb(138, 78, 0);
}

.firstLeft {
  border-left: 3px solid rgb(138, 78, 0);
}

.firstTop{
  border-top: 3px solid rgb(138, 78, 0);
}

.cell-food {
  background-color: rgb(0,255,0,0.9);
}

.cell-tail {
  background-color: rgb(161, 93, 5);
}

.cell-head {
  background-color: rgb(255, 136, 0);
}
</style>