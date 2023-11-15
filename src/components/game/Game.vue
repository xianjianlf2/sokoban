<script setup lang="ts">
import { gameData } from '../../game/gameData'
import { useCargoStore } from '../../store/cargo'
import { useGameStore } from '../../store/game'
import { useTargetStore } from '../../store/target'
import Cargo from './Cargo.vue'
import Map from './Map.vue'
import Player from './Player.vue'
import Target from './Target.vue'

const { cargos } = useCargoStore()
const { targets } = useTargetStore()
const { game, setupGame, toNextLevel } = useGameStore()

setupGame(gameData)

function handleToNextLevel() {
  toNextLevel()
}
</script>

<template>
  <div>
    <Map />

    <template v-for="target in targets" :key="target">
      <Target :x="target.x" :y="target.y" />
    </template>
    <Player />
    <template v-for="cargo in cargos" :key="cargo.id">
      <Cargo :id="cargo.id" :x="cargo.x" :y="cargo.y" :on-target="cargo.onTarget" />
    </template>
    <div v-if="game.isGameCompleted" class="bg-red-500">
      <button @click="handleToNextLevel">
        下一关
      </button>
    </div>
  </div>
</template>

<style scoped></style>
