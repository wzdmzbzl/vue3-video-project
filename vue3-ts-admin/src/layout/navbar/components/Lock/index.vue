
<template>
  <div class="btn">
    <el-tooltip content="锁屏">
      <el-button circle @click="onLock">
        <el-icon><Lock /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useScreenLockStore } from '@/store/modules/screenLock'

export default defineComponent({
  setup() {
    const screenLockStore = useScreenLockStore()
    const onLock = () => {
      screenLockStore.setLock(true)
    }
    return { onLock }
  },
})
</script>

<style scoped lang="scss">
.btn {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
