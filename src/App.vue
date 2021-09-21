<template>
 <div id="app">
    <MainInterface
      v-bind:settings="getSettings"
    />
 </div>
</template>

<script>
import MainInterface from '@/components/MainInterface'
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'App',
  created() {
    let settings = this.getSettings
    settings.xCells = settings.width / settings.cellSize
    settings.yCells = settings.height / settings.cellSize

    let map = this.getMap
    for (let i = 0; i < settings.xCells; i++) {
      map[i] = []
    }

    this.updateSettings(settings)
  },
  methods: mapActions(['updateSettings', 'updateMap']),
  computed: mapGetters(['getSettings', 'getMap', 'getCellEnums']),
  components: {
    MainInterface
  }
}
</script>

<style>
  * { padding: 0%; margin: 0%; }
</style>
