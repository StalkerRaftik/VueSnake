<template>
  <div id="cellsRow" :style="cssProps">
    <Cell v-for="(cell, index) in cells"
          v-bind:settings="settings"
          v-bind:cell="cell"
          v-bind:row="row"
          v-bind:rowIndex="rowIndex"
          v-bind:cellIndex="index"
          v-bind:key="index"
    />
  </div>
</template>

<script>
import Cell from '@/components/Cell'
export default {
  props: ['settings', 'row', 'rowIndex'],
  computed: {
    cssProps() {
      return {
        '--width': this.settings.width + "px",
        '--cellSize': this.settings.cellSize + "px",
      }
    },
    cells() {
      let cells = []
      cells.push({
        isFirst: true,
      })
      for (let i = 0; i < this.settings.xCells-1; i++) {
        cells.push({
          isFirst: false,
        })
      }
      return cells
    }
  },
  components: {
    Cell,
  },
}
</script>

<style scoped>
#cellsRow {
  width: var(--width);
  height: var(--cellSize);

  /*background-color: red;*/
}
</style>