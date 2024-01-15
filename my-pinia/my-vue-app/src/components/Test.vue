<template>
  <div>
    <h1>Count: {{ count }}</h1>
    <h2>DoubleCount: {{ doubleCount }}</h2>
    <h3>TripleCount: {{ tripleCount }}</h3>
    <button @click="setCount">ADD</button>
    <!-- <button @click="stop">STOP</button> -->
  </div>
</template>

<script setup>
import { ref, computed, effect, effectScope, inject } from "vue";
// 创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理
const scope = effectScope(); // scope.run  scope.stop

const count = ref(0);
let doubleCount = null;
let tripleCount = null;

const props = defineProps({
  stopDelay:Number
})

const globalStopDelay = inject('stopDelay')

scope.run(() => {
  effect(() => {
    doubleCount = computed(() => count.value * 2);
  });

  // 参数为true的话代表是独立的作用域,不受外层影响
  const subScope = effectScope(); // dependent scope

  subScope.run(() => {
    effect(() => {
      tripleCount = computed(() => count.value * 3);
    });
  });
});

const setCount = () => {
  count.value += 1;
};

// const stop = () => {
//   scope.stop();
// };

setTimeout(() => {
  scope.stop()
}, globalStopDelay || props.stopDelay);


</script>

<style scoped></style>
