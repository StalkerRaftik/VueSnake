<template>
  <div id="mainMenu" :style="cssProps" :key="keyToRerender">
    <CellsRow v-for="(row, index) in rows"
          v-bind:settings="settings"
          v-bind:row="row"
          v-bind:rowIndex="index"
          v-bind:key="index"
    />
  </div>
</template>

<script>
import CellsRow from '@/components/CellsRow'
import {mapActions, mapGetters, mapState} from "vuex";
export default {
  props: ['settings'],
  data() {
    return {
      keyToRerender: 0
    }
  },
  methods: {
    ...mapActions(['updateMap']),
    forceRerender() {
      this.keyToRerender += 1
    }
  },
  computed: {
    ...mapState(['snakeQueue']),
    ...mapGetters(['getMap']),
    cssProps() {
      return {
        '--width': this.settings.width + "px",
        '--height': this.settings.height + "px",
      }
    },
    rows() {
      let rows = []
      rows.push({
        isFirst: true,
      })
      for (let i = 0; i < this.settings.yCells - 1; i++) {
        rows.push({
          isFirst: false,
        })
      }
      return rows
    }
  },
  components: {
    CellsRow
  }
}
</script>
<style scoped>
  #mainMenu {
    width: var(--width);
    height: var(--height);
    background-color: rgba(40, 40, 40);

    padding: 3px;
  }
</style>