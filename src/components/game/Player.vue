<script setup lang="ts">
import keeperImg from '../../assets/keeper.png'
import { usePlayerStore } from '../../store/player'
import { usePosition } from '../../composables/usePosition'
import { useMove } from './player'

useMove()
const { player } = usePlayerStore()
const { position } = usePosition(player)
</script>

<template>
  <div class="absolute" :style="position">
    <img :src="keeperImg">
  </div>
</template>

<style scoped></style>
