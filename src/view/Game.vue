<script setup lang="ts">
import Cargo from '@/components/game/Cargo.vue'
import Player from '@/components/game/Player.vue'
import Target from '@/components/game/Target.vue'
import Map from '@/components/game/Map.vue'
import { gameData } from '@/game/gameData'
import { useCargoStore } from '@/store/cargo'
import { useGameStore } from '@/store/game'
import { useTargetStore } from '@/store/target'

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
