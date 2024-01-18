<template>
  <div id="myEditor"></div>
</template>

<script setup>
import { onMounted, defineEmits } from "vue";
import E from "wangeditor";

const emit = defineEmits(['event'])

onMounted(() => {
  const editor = new E("#myEditor");
  editor.create();

  // 配置 onchange 回调函数
  editor.config.onchange = function (newHtml) {
    // 子传父
    emit("event", newHtml)
  };
});
</script>

<style scoped></style>
