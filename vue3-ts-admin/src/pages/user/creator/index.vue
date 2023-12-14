<template>
  <div>
    <input type="text" v-model="text">
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { debounceRef } from "@/utils/customRef"

const text = debounceRef('')
</script>

<style scoped>

</style>