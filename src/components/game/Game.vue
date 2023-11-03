<script setup lang="ts">
import { useCargoStore } from '../../store/cargo'
import Cargo from './Cargo.vue'
import Map from './Map.vue'
import Player from './Player.vue'

const { cargos } = useCargoStore()
</script>

<template>
  <div>
    <Map />
    <Player />
    <template v-for="cargo in cargos">
      <Cargo :x="cargo.x" :y="cargo.y" />
    </template>
  </div>
</template>

<style scoped></style>
