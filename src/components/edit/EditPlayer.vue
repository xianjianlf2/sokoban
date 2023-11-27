<script setup lang="ts">
import keeperImg from '../../assets/keeper.png'
import { useEditPlayerStore } from '@/store/edit/editPlayer'
import { STEP_EDIT, usePosition } from '@/composables/usePosition'

const { player } = useEditPlayerStore()
const { position } = usePosition(player, STEP_EDIT)
</script>

<template>
  <div class="absolute border border-blue-400" :style="position">
    <img :src="keeperImg">
  </div>
</template>

<style scoped></style>
