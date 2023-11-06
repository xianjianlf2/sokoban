<script setup lang="ts">
import { useCargoStore } from '../../store/cargo'
import { useTargetStore } from '../../store/target'
import Cargo from './Cargo.vue'
import Map from './Map.vue'
import Player from './Player.vue'
import Target from './Target.vue'

const { cargos } = useCargoStore()
const { targets } = useTargetStore()
</script>

<template>
  <div>
    <Map />

    <template v-for="target in targets" :key="target">
      <Target :x="target.x" :y="target.y" />
    </template>
    <Player />
    <template v-for="cargo in cargos" :key="cargo">
      <Cargo :x="cargo.x" :y="cargo.y" :on-target="cargo.onTarget" />
    </template>
  </div>
</template>

<style scoped></style>
