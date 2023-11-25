<script setup lang="ts">
import { type EditElement, useEditElementStore } from '@/store/edit/editElement'

interface Props {
  editElement: EditElement
}

const props = defineProps<Props>()

const { setCurrentSelectedEditElement } = useEditElementStore()

function handleClick() {
  setCurrentSelectedEditElement(props.editElement)
}
</script>

<template>
  <div @click="handleClick">
    <img :src="editElement.img" alt="">
  </div>
</template>

<style scoped>

</style>
