<script setup lang="ts">
import cargoImg from '../../assets/cargo.png'
import { usePosition } from '../../composables/usePosition'
import type { Cargo } from '../../store/cargo'

const props = defineProps<Cargo>()

const { position } = usePosition(props)
</script>

<template>
  <div class="absolute" :style="position">
    <img :src="cargoImg">
  </div>
</template>

<style scoped></style>
