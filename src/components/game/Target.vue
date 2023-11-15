<script setup lang="ts">
import targetImg from '../../assets/target.png'
import { usePlayerStore } from '../../store/player'
import { usePosition } from '../../composables/usePosition'

const { player } = usePlayerStore()
const { position } = usePosition(player)
</script>

<template>
  <div class="absolute" :style="position">
    <img :src="targetImg">
  </div>
</template>

<style scoped></style>
