<template>
  <div>
    <router-view v-if="!isLock"></router-view>
    <transition v-if="isLock && $route.name !== 'login'" name="slide-up">
      <ScreenLock></ScreenLock>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "./hooks/useTheme";
import { useScreenLockStore } from "@/store/modules/screenLock";

// 锁屏
const screenLock = useScreenLockStore();
const isLock = computed(() => screenLock.isLocked);

// 初始化配置主题
const { initTheme } = useTheme();
initTheme();
</script>

<style scoped></style>
